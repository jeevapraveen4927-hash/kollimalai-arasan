const icons: Record<string, JSX.Element> = {
  "leaf-hand": (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M3 15c0 3 2 5 5 5" />
      <path d="M3 15c3-1 4-3 4-6 3 0 5 2 5 5 0 3-2 5-5 5" />
      <path d="M12 8c0-3 2-5 6-5-.5 4-2 6-6 6" />
    </svg>
  ),
  "spray-off": (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M9 3h3v3H9z" />
      <path d="M8 6h5l1 2v13H7V8z" />
      <line x1="2" y1="2" x2="22" y2="22" />
      <circle cx="12" cy="13" r="9" />
    </svg>
  ),
  "flask-off": (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M9 2h6" />
      <path d="M10 2v6l-5 10a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-3.5-7" />
      <circle cx="12" cy="13" r="10" />
    </svg>
  ),
  sprout: (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M7 20h10" />
      <path d="M12 20V10" />
      <path d="M12 10C12 5 8 4 4 4c0 4 1 8 8 8" />
      <path d="M12 10c0-3 3-5 8-5 0 5-2 8-8 8" />
    </svg>
  ),
  globe: (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
    </svg>
  ),
};

const items = [
  { label: "Sustainable Farming Techniques", icon: "leaf-hand" },
  { label: "Chemical-Free Practices", icon: "spray-off" },
  { label: "Non-GMO Produce", icon: "flask-off" },
  { label: "Locally Ethically Sourced", icon: "sprout" },
  { label: "Health Certified", icon: "globe" },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-12 text-center">
      <h2 className="text-2xl font-bold uppercase tracking-tight text-gray-900 sm:text-[32px]">
        Why Choose Us?
      </h2>

      <div className="mx-auto mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-3 md:grid-cols-5">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-3 px-2">
            <div className="text-gray-800">{icons[item.icon]}</div>
            <p className="max-w-[150px] text-xs font-semibold text-gray-800 sm:text-sm">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
