const tutorials = [
  'Master ChatGPT Prompts',
  'DeepSeek For Developers',
  'AI Tools For Students',
];

export default function SavedTutorials() {
  return (
    <div className="border border-zinc-800 bg-zinc-950 rounded-3xl p-8">
      <h2 className="text-2xl font-bold text-white mb-8">Saved Tutorials</h2>

      <div className="space-y-4">
        {tutorials.map((tutorial, index) => (
          <div
            key={index}
            className="border border-zinc-800 rounded-2xl p-5 hover:border-green-500 transition"
          >
            <h3 className="text-white font-medium">{tutorial}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
