import React from 'react';

export default function LinkCard({ link }: { link: any }) {
  const shortUrl = link.shortUrl;

  return (
    <div className="bg-white/80 text-gray-900 rounded-xl p-4 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className="truncate text-sm text-gray-600">{link.longUrl}</div>
        <a href={shortUrl} target="_blank" rel="noreferrer" className="text-teal-600 font-semibold hover:underline">
          {shortUrl}
        </a>
      </div>
      <button
        onClick={() => navigator.clipboard.writeText(shortUrl)}
        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
      >
        Copy
      </button>
    </div>
  );
}
