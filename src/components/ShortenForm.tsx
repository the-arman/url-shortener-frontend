import React, { useState } from 'react';

type Props = { onCreate: (link: any) => void };
const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export default function ShortenForm({ onCreate }: Props) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!url) return setError('Please enter a valid URL');
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl: url })
      });

      if (!res.ok) throw new Error('Failed to shorten URL');
      const data = await res.json();
      onCreate(data);
      setUrl('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow-lg">
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste your long URL here..."
        className="flex-1 px-4 py-3 rounded-lg text-gray-900 border-none focus:ring-2 focus:ring-teal-400 outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-lg text-white font-semibold shadow-lg hover:scale-105 transition"
      >
        {loading ? 'Shortening...' : 'Shorten URL'}
      </button>

      {error && <div className="text-red-300 text-sm mt-2">{error}</div>}
    </form>
  );
}
