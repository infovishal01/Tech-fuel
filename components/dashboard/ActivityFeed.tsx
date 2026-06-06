const activities = [
  'New user registered',

  'Tutorial published',

  'AI tool added',

  'Profile updated',

  'Course completed',
];

export default function ActivityFeed() {
  return (
    <div
      className="
      border
      border-zinc-800
      bg-zinc-950
      rounded-3xl
      p-8
    "
    >
      <h2 className="text-3xl font-black mb-8">Recent Activity</h2>

      <div className="space-y-5">
        {activities.map((item, index) => (
          <div
            key={index}
            className="
                border
                border-zinc-800
                rounded-2xl
                p-5
                flex
                items-center
                gap-4
              "
          >
            <div
              className="
                w-3
                h-3
                rounded-full
                bg-green-500
              "
            />

            <p className="text-zinc-300">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
