const icons: Record<string, JSX.Element> = {
  truck: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  card: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  hands: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M11 14v-3.5a1.5 1.5 0 0 1 3 0V13" />
      <path d="M14 13.5V9a1.5 1.5 0 0 1 3 0v5" />
      <path d="M6 12V6a1.5 1.5 0 0 1 3 0v6" />
      <path d="M3 13a5 5 0 0 0 5 5h4a5 5 0 0 0 5-5" />
      <circle cx="18" cy="6" r="2" />
    </svg>
  ),
  whatsapp: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="#25D366">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.29-1.39a9.87 9.87 0 0 0 4.7 1.2h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2z" />
    </svg>
  ),
};

export default function TrustBadges() {
  const items = [
    { title: "Free Delivery", description: "For all orders over ₹3500", icon: "truck" },
    { title: "Safe Payment", description: "100% secure payment", icon: "card" },
    { title: "Shop With Confidence", description: "Safe and Secure Environment", icon: "hands" },
    { title: "Dedicated Help Center", description: "IST 8:30 AM to 8.30 PM", icon: "whatsapp" },
  ];

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center text-gray-700">
              {icons[item.icon]}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
