const filters = ["All", "Coding", "Writing", "Students", "Productivity"];

export default function ToolFilters() {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {filters.map((filter, index) => (
        <button
          key={index}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
            index === 0
              ? "bg-green-500 text-black font-medium"
              : "border border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
