export function Payments() {
  return (
    <section className="space-y-6 animate-fade-in">
      <h2 className="text-3xl font-bold text-primary text-center">
        Government Payments Portal
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300">
        Use your NIDA ID to view and pay all government fees, taxes, and permits securely.
      </p>
      <div className="bg-glass-panel p-6 rounded-2xl shadow-glass max-w-lg mx-auto text-center">
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition">
          Open Payment Dashboard
        </button>
      </div>
    </section>
  );
}
