"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { mockOrders, getOrderTotal, resolveOrderItems } from "@/lib/orders";
import { Order } from "@/lib/types";

const menuItems = [
  { key: "personal", label: "Personal Info", icon: "user" },
  { key: "address", label: "Address Book", icon: "pin" },
  { key: "orders", label: "Order History", icon: "clock" },
  { key: "settings", label: "Account Settings", icon: "gear" },
];

const icons: Record<string, JSX.Element> = {
  user: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  pin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  clock: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  gear: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

export default function ProfilePage() {
  const [active, setActive] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { user, isLoggedIn, hydrated, logout, updateUser } = useAuth();
  const { addItem } = useCart();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [reorderStatus, setReorderStatus] = useState<Record<string, string>>({});
  const [avatarError, setAvatarError] = useState("");

  useEffect(() => {
    if (hydrated && !isLoggedIn) {
      router.push("/login");
    }
  }, [hydrated, isLoggedIn, router]);

  useEffect(() => {
    const [f, ...rest] = (user?.fullName || "Guest User").split(" ");
    setFirstName(f);
    setLastName(rest.join(" "));
    setPhone(user?.phone || "");
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleSave = () => {
    updateUser({ fullName: `${firstName} ${lastName}`.trim(), phone });
    setIsEditing(false);
  };

  const handleCancel = () => {
    const [f, ...rest] = (user?.fullName || "Guest User").split(" ");
    setFirstName(f);
    setLastName(rest.join(" "));
    setPhone(user?.phone || "");
    setIsEditing(false);
  };

  const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarError("");

    if (!file.type.startsWith("image/")) {
      setAvatarError("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setAvatarError("Image must be under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = document.createElement("img");
      img.onload = () => {
        // Downscale to keep the stored base64 string small
        const maxSize = 256;
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        updateUser({ avatarUrl: dataUrl });
      };
      img.src = reader.result as string;
    };
    reader.onerror = () => setAvatarError("Couldn't read that image. Try another.");
    reader.readAsDataURL(file);
    // reset so selecting the same file again still fires onChange
    e.target.value = "";
  };

  const handleReorder = (order: Order) => {
    const resolved = resolveOrderItems(order);
    const available = resolved.filter((item) => item.product);
    const unavailable = resolved.filter((item) => !item.product);

    if (available.length === 0) {
      setReorderStatus((s) => ({
        ...s,
        [order.id]: "None of these products are available anymore.",
      }));
      setTimeout(() => setReorderStatus((s) => ({ ...s, [order.id]: "" })), 3000);
      return;
    }

    available.forEach(({ product, quantity }) => {
      if (!product) return;
      addItem(
        {
          id: product.id,
          name: product.name,
          sku: product.sku ?? product.id,
          weight: product.weightLabel,
          image: product.image,
          price: product.price,
        },
        quantity
      );
    });

    const message =
      unavailable.length > 0
        ? `Added ${available.length} item(s) to cart. ${unavailable.length} item(s) are no longer available.`
        : `Added ${available.length} item(s) to cart!`;

    setReorderStatus((s) => ({ ...s, [order.id]: message }));
    setTimeout(() => setReorderStatus((s) => ({ ...s, [order.id]: "" })), 3000);
  };

  if (!hydrated || !isLoggedIn) {
    return (
      <main>
        <DashboardHeader />
        <div className="flex min-h-[50vh] items-center justify-center text-sm text-gray-400">
          Loading your profile…
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <DashboardHeader />

      <section className="mx-auto max-w-[1200px] px-4 py-8 sm:py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-[32px]">My Profile</h1>
          {active === "personal" &&
            (isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="rounded-lg bg-brand-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-dark"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-lg bg-brand-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-dark"
              >
                Edit Profile
              </button>
            ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-xl border border-gray-200 p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-cream">
                  {user?.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={user.fullName}
                      fill
                      sizes="96px"
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#007F06" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                </div>
                <label
                  htmlFor="avatar-upload"
                  aria-label="Upload profile photo"
                  className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-brand-green text-white shadow-card hover:bg-brand-green-dark"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </div>
              <h2 className="mt-3 text-lg font-bold text-gray-900">{user?.fullName || "Guest User"}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
              {avatarError && <p className="mt-1 text-xs text-red-500">{avatarError}</p>}
            </div>

            <nav className="mt-6 space-y-1 border-t border-gray-100 pt-4">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setActive(item.key);
                    setIsEditing(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    active === item.key
                      ? "bg-cream text-brand-green"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {icons[item.icon]}
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              onClick={handleLogout}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-red-500 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </aside>

          <div className="space-y-6">
            {active === "personal" && (
              <>
                <div className="rounded-xl border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-medium text-gray-600">First Name</label>
                      <input
                        value={firstName}
                        disabled={!isEditing}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1 w-full rounded-lg bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:outline-none disabled:text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Last Name</label>
                      <input
                        value={lastName}
                        disabled={!isEditing}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1 w-full rounded-lg bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:outline-none disabled:text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Email Address</label>
                      <input
                        value={user?.email || ""}
                        disabled
                        className="mt-1 w-full rounded-lg bg-gray-50 px-3 py-2.5 text-sm text-gray-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Phone Number</label>
                      <input
                        value={phone}
                        disabled={!isEditing}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Not provided"
                        className="mt-1 w-full rounded-lg bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:outline-none disabled:text-gray-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                  <div className="mt-4 space-y-4">
                    {mockOrders.slice(0, 2).map((order) => (
                      <OrderRow
                        key={order.id}
                        order={order}
                        onReorder={handleReorder}
                        statusMessage={reorderStatus[order.id]}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setActive("orders")}
                    className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-green hover:underline"
                  >
                    View All Orders
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </>
            )}

            {active === "address" && (
              <div className="rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Address Book</h2>
                  <button className="text-sm font-medium text-brand-green hover:underline">
                    + Add New Address
                  </button>
                </div>
                <div className="mt-4 rounded-lg border border-gray-100 p-4">
                  <div className="flex items-start justify-between">
                    <p className="font-semibold text-gray-900">{user?.fullName || "Guest User"}</p>
                    <span className="rounded bg-brand-green px-2 py-0.5 text-[10px] font-bold text-white">
                      DEFAULT
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    42 Green Valley Apartments,
                    <br />
                    MG Road, Phase 1,
                    <br />
                    Bangalore, Karnataka 560001
                    <br />
                    India
                  </p>
                  <p className="mt-2 text-sm font-medium text-gray-800">
                    Mobile: {user?.phone || "Not provided"}
                  </p>
                  <div className="mt-3 flex gap-3 text-sm">
                    <button className="font-medium text-brand-green hover:underline">Edit</button>
                    <button className="font-medium text-red-500 hover:underline">Remove</button>
                  </div>
                </div>
              </div>
            )}

            {active === "orders" && (
              <div className="rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900">Order History</h2>
                {mockOrders.length === 0 ? (
                  <p className="mt-4 text-sm text-gray-600">You haven&apos;t placed any orders yet.</p>
                ) : (
                  <div className="mt-4 space-y-4">
                    {mockOrders.map((order) => (
                      <OrderRow
                        key={order.id}
                        order={order}
                        onReorder={handleReorder}
                        statusMessage={reorderStatus[order.id]}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {active === "settings" && (
              <div className="rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900">Account Settings</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-600">Current Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="mt-1 w-full rounded-lg bg-gray-50 px-3 py-2.5 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600">New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="mt-1 w-full rounded-lg bg-gray-50 px-3 py-2.5 text-sm focus:outline-none"
                    />
                  </div>
                  <button className="rounded-lg bg-brand-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-dark">
                    Update Password
                  </button>

                  <div className="border-t border-gray-100 pt-4">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-brand-green" />
                      Email me about order updates and offers
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function OrderRow({
  order,
  onReorder,
  statusMessage,
}: {
  order: Order;
  onReorder: (order: Order) => void;
  statusMessage?: string;
}) {
  const total = getOrderTotal(order);
  const thumbnail = order.items[0]?.image ?? "/images/biriyani-leaf.png";
  const itemSummary =
    order.items.length === 1
      ? order.items[0].name
      : `${order.items[0].name} + ${order.items.length - 1} more`;

  return (
    <div className="rounded-lg border border-gray-100 p-3">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-cream">
          <Image src={thumbnail} alt={`Order ${order.id}`} fill sizes="56px" className="object-contain p-1.5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-gray-900">Order #{order.id}</p>
          <p className="truncate text-xs text-gray-600">{itemSummary}</p>
          <p className="text-xs text-gray-500">{order.date}</p>
          <span className="mt-1 inline-block rounded bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-700">
            {order.status}
          </span>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="text-sm font-bold text-gray-900">₹{total.toFixed(2)}</p>
          <button
            onClick={() => onReorder(order)}
            className="mt-1 rounded border border-brand-green px-2.5 py-1 text-xs font-medium text-brand-green hover:bg-cream"
          >
            Reorder
          </button>
        </div>
      </div>
      {statusMessage && (
        <p className="mt-2 rounded-md bg-cream px-3 py-1.5 text-xs font-medium text-brand-green">
          {statusMessage}
        </p>
      )}
    </div>
  );
}
