import TutorialCard from './TutorialCard';

const tutorials = [
  {
    title: 'Master ChatGPT Prompts',
    description:
      'Learn advanced AI prompting techniques to get better results from language models.',
    slug: 'master-chatgpt-prompts',
    category: 'AI',
  },
  {
    title: 'DeepSeek For Developers',
    description:
      'Use DeepSeek for coding workflows, debugging, and code generation.',
    slug: 'deepseek-for-developers',
    category: 'AI',
  },
  {
    title: 'AI Tools For Students',
    description:
      'Boost your productivity with AI-powered tools for learning and research.',
    slug: 'ai-tools-for-students',
    category: 'Productivity',
  },
  {
    title: 'Build with Next.js 16',
    description:
      'Create modern full-stack applications with the latest Next.js features.',
    slug: 'nextjs-16-guide',
    category: 'Web Dev',
  },
  {
    title: 'React Best Practices 2024',
    description:
      'Write clean, performant React code with modern patterns and hooks.',
    slug: 'react-best-practices',
    category: 'Programming',
  },
  {
    title: 'Land Your First Tech Job',
    description:
      'A complete guide to building your portfolio and acing technical interviews.',
    slug: 'land-first-tech-job',
    category: 'Career',
  },
];

export default function TutorialsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tutorials.map((tutorial) => (
        <TutorialCard
          key={tutorial.slug}
          title={tutorial.title}
          description={tutorial.description}
          slug={tutorial.slug}
          category={tutorial.category}
        />
      ))}
    </div>
  );
}
