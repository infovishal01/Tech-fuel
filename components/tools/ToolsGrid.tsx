import ToolCard from './ToolCard';

const tools = [
  {
    name: 'ChatGPT',
    company: 'OpenAI',
    emoji: '🤖',
    desc: 'AI assistant for coding, writing, and reasoning',
  },
  {
    name: 'Claude',
    company: 'Anthropic',
    emoji: '🧠',
    desc: 'Best for long documents and analysis',
  },
  {
    name: 'Gemini',
    company: 'Google',
    emoji: '✨',
    desc: 'Multimodal AI with Google integration',
  },
  {
    name: 'Perplexity',
    company: 'Perplexity AI',
    emoji: '🔍',
    desc: 'AI search engine with real-time web results',
  },
  {
    name: 'DeepSeek',
    company: 'DeepSeek AI',
    emoji: '🚀',
    desc: 'Powerful AI model for coding and reasoning',
  },
  {
    name: 'Midjourney',
    company: 'Midjourney',
    emoji: '🎨',
    desc: 'AI image generation for creative projects',
  },
];

export default function ToolsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool) => (
        <ToolCard
          key={tool.name}
          name={tool.name}
          company={tool.company}
          emoji={tool.emoji}
          desc={tool.desc}
        />
      ))}
    </div>
  );
}
