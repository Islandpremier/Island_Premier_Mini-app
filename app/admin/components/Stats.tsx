type Props = {
  orders: any[];
};

export default function Stats({ orders }: Props) {
  const pending = orders.filter(
    (o) => o.status === "pending"
  ).length;

  const approved = orders.filter(
    (o) => o.status === "approved"
  ).length;

  const rejected = orders.filter(
    (o) => o.status === "rejected"
  ).length;

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      <div className="bg-zinc-900 border border-yellow-500 rounded-xl p-6">
        <p className="text-zinc-400">In attesa</p>
        <h2 className="text-4xl font-bold text-yellow-500">
          {pending}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-green-600 rounded-xl p-6">
        <p className="text-zinc-400">Approvati</p>
        <h2 className="text-4xl font-bold text-green-500">
          {approved}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-red-600 rounded-xl p-6">
        <p className="text-zinc-400">Rifiutati</p>
        <h2 className="text-4xl font-bold text-red-500">
          {rejected}
        </h2>
      </div>
    </div>
  );
}