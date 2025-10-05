import React, { useState } from 'react';
import ShortenForm from './components/ShortenForm';
import LinkCard from './components/LinkCard';

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export default function App() {
  const [links, setLinks] = useState<any[]>([]);

  function addLink(link: any) {
    const normalized = { clicks: 0, shortUrl: link.shortUrl || `${API}/${link.shortCode}`, ...link };
    setLinks(prev => [normalized, ...prev]);
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1531177071257-7c4df16a9f5d?auto=format&fit=crop&w=1600&q=80)' }}>
      
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          Shortly
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
          A clean, reliable URL shortener — built for your resume. Fast, simple and ready for production.
        </p>

        <div className="w-full max-w-2xl">
          <ShortenForm onCreate={addLink} />
        </div>

        {links.length > 0 && (
          <div className="mt-10 w-full max-w-2xl space-y-3">
            {links.map(link => <LinkCard key={link.shortCode} link={link} />)}
          </div>
        )}
      </div>
    </div>
  );
}
