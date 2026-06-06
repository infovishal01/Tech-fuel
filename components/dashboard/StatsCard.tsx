interface Props {
  title: string;

  value: string;

  description: string;
}

export default function StatsCard({
  title,

  value,

  description,
}: Props) {
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
      <p className="text-zinc-400">{title}</p>

      <h2 className="text-5xl font-black text-green-500 mt-4">{value}</h2>

      <p className="text-zinc-500 mt-4">{description}</p>
    </div>
  );
}
