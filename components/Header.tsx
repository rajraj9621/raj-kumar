import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between border-b border-white/10 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            CineMind AI
          </h1>
          <p className="text-xs text-slate-400 tracking-wider uppercase font-semibold">Powered by Gemini 2.5</p>
        </div>
      </div>
      <div className="mt-4 md:mt-0 flex gap-4 text-sm font-medium text-slate-400">
        <span className="hover:text-white cursor-pointer transition-colors">Discover</span>
        <span className="hover:text-white cursor-pointer transition-colors">Trending</span>
        <span className="hover:text-white cursor-pointer transition-colors">My List</span>
      </div>
    </header>
  );
};

export default Header;
