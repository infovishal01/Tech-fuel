import TutorialSearch from './TutorialSearch';
import TutorialCategories from './TutorialCategories';
import TutorialsGrid from './TutorialsGrid';

export default function Tutorials() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">Tutorials</h1>
        <p className="text-zinc-500 mt-2">
          Learn AI tools, coding, and modern development skills
        </p>
      </div>

      <TutorialSearch />
      <TutorialCategories />
      <TutorialsGrid />
    </div>
  );
}
