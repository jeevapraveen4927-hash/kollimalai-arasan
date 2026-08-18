import { Testimonial, NavLink } from "./types";
import { getProductsByTag, getProductsByCategory, getAllProducts } from "./products";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop All",
    href: "/shop",
    children: [
      { label: "All Products", href: "/shop" },
      { label: "Spices", href: "/spices" },
      { label: "Millets", href: "/millets" },
    ],
  },
  {
    label: "Spices",
    href: "/spices",
    children: [
      { label: "Cardamom", href: "/spices#cardamom" },
      { label: "Turmeric Powder", href: "/spices#turmeric" },
      { label: "Pepper Powder", href: "/spices#pepper" },
    ],
  },
  {
    label: "Millets",
    href: "/millets",
    children: [
      { label: "Ragi", href: "/millets#ragi" },
      { label: "Bajra", href: "/millets#bajra" },
      { label: "Foxtail Millet", href: "/millets#foxtail" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * Backward-compatible product accessors, now derived dynamically from the
 * single product catalog in lib/products.ts (filtered by tag/category)
 * instead of being separately hardcoded arrays. Adding/removing a product
 * in lib/products.ts automatically flows through here.
 */
export const flavourProducts = getProductsByTag("freshly-launched");
export const lowestPriceProducts = getProductsByTag("lowest-price");
export const spiceProducts = getProductsByCategory("Spices");
export const milletProducts = getProductsByCategory("Millets");

export { getAllProducts as allProductsFn } from "./products";
export const allProducts = getAllProducts();

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Mrs. Priya R.,",
    location: "Namakkal, Tamilnadu",
    avatar: "/images/avatar1.png",
    quote:
      "I'm absolutely delighted with the service! I ordered turmeric powder — the packaging was neat, delivery was quick, and when I called customer care with a small query, they responded kindly within minutes. Great experience overall!",
  },
  {
    id: "t2",
    name: "Mr. Arjun S.,",
    location: "Salem, Tamilnadu",
    avatar: "/images/avatar2.png",
    quote:
      "Fantastic spices and even better service. The pepper powder I got was fresh and fragrant. I had a tiny mix-up with the invoice, but customer support fixed it immediately, and even followed up to ensure I received everything correctly. Highly recommend!",
  },
  {
    id: "t3",
    name: "Mrs. Meena K.,",
    location: "Trichy, Tamilnadu",
    avatar: "/images/avatar3.png",
    quote:
      "Best online spice buying experience I've had. The staff was polite, and surprisingly helpful when I asked for recipe tips over chat. My kitchen has never smelled so good — and I'll definitely order again.",
  },
];

// Home page hero banner slider — same photographic treatment as the
// original single hero-banner.jpg, just multiple slides.
export const heroSlides = [
  {
    id: "slide-1",
    image: "/images/hero-banner.jpg",
    alt: "Assortment of pure spices and millets arranged like a world map",
  },
  {
    id: "slide-2",
    image: "/images/hero-banner-2.jpg",
    alt: "Cumin, coriander, fennel and pepper spice piles",
  },
  {
    id: "slide-3",
    image: "/images/hero-banner-3.jpg",
    alt: "Turmeric, chilli and pepper spice piles",
  },
];

// "Why Choose Us" — sustainability/quality claims (5 items, icons rendered in WhyChooseUs.tsx)
export const whyChooseUs = [
  { label: "Sustainable Farming Techniques", icon: "leaf-hand" },
  { label: "Chemical-Free Practices", icon: "spray-off" },
  { label: "Non-GMO Produce", icon: "flask-off" },
  { label: "Locally Ethically Sourced", icon: "sprout" },
  { label: "Health Certified", icon: "globe" },
] as const;

// Top-of-page "Explore the world..." 3-column feature strip
export const features = [
  {
    icon: "/images/icon-farmfresh.png",
    title: "Farm Fresh",
    description:
      "From the start, it's been about pure spices and Millets our promise to never compromise.",
  },
  {
    icon: "/images/icon-authentic.png",
    title: "Authentic Taste",
    description:
      "Our process keeps the taste, smell, and color just right—so they stay fresh for longer.",
  },
  {
    icon: "/images/icon-freshpacked.png",
    title: "Freshly Packed",
    description:
      "We use a fully automated system to keep every step clean, safe, and pure.",
  },
];

// Trust badges strip — Free Delivery, Safe Payment, Shop With Confidence, Dedicated Help Center
export const trustBadges = [
  {
    title: "Free Delivery",
    description: "For all orders over ₹3500",
    icon: "truck",
  },
  {
    title: "Safe Payment",
    description: "100% secure payment",
    icon: "card",
  },
  {
    title: "Shop With Confidence",
    description: "Safe and Secure Environment",
    icon: "hands",
  },
  {
    title: "Dedicated Help Center",
    description: "IST 8:30 AM to 8.30 PM",
    icon: "whatsapp",
  },
];

export const footerData = {
  address: "3/120 4-Road Aandavar Nagar, N.Kosavampatti, Namakkal.",
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Shop All", href: "/shop" },
    { label: "Spices", href: "/spices" },
    { label: "Millets", href: "/millets" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  hereToHelp: [
    { label: "Track My Order", href: "/track-order" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Return & Refund Policy", href: "/refund-policy" },
    { label: "FAQ's", href: "/faq" },
  ],
  contact: {
    phone: "+91 74181 88950",
    whatsapp: "+91 74181 88950",
    mail: "rajeshcse1990@gmail.com",
  },
};
