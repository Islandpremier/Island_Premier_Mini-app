type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <div className="mb-8">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="🔍 Cerca cliente..."
        className="w-full bg-zinc-900 border border-yellow-500 rounded-xl p-4 text-white outline-none"
      />
    </div>
  );
}