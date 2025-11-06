import { useState } from "react";

export default function AuthModal({ onLogin }: { onLogin: (user: string) => void }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return alert("Please enter your name or NIN");
    onLogin(username.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl w-11/12 max-w-md text-center shadow-xl">
        <h2 className="text-2xl font-bold text-primary mb-3">Government e-Services Login</h2>
        <p className="text-gray-500 dark:text-gray-300 text-sm mb-4">
          Please enter your name or NIN to access services.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Full Name or NIN"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-center"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition w-full"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
