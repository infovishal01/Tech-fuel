const categories = [
  "All",
  "AI",
  "Web Dev",
  "Programming",
  "Productivity",
  "Career",
];

export default function TutorialCategories() {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
            index === 0
              ? "bg-green-500 text-black font-medium"
              : "border border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
