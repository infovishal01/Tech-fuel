import ToolFilters from './ToolFilters';
import ToolsGrid from './ToolsGrid';

export default function Tools() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">AI Tools</h1>
        <p className="text-zinc-500 mt-2 max-w-lg mx-auto">
          Discover the best AI tools to supercharge your workflow
        </p>
      </div>

      <ToolFilters />
      <ToolsGrid />
    </div>
  );
}
