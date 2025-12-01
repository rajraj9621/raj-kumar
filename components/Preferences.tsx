import React, { useState } from 'react';
import { UserPreferences } from '../types';

interface PreferencesProps {
  onSubmit: (prefs: UserPreferences) => void;
  isLoading: boolean;
}

const GENRES = [
  "Action", "Sci-Fi", "Drama", "Comedy", "Thriller", 
  "Horror", "Romance", "Mystery", "Documentary", "Fantasy"
];

const MOODS = [
  "Inspiring", "Dark", "Funny", "Tense", "Relaxing", "Mind-bending", "Romantic"
];

const Preferences: React.FC<PreferencesProps> = ({ onSubmit, isLoading }) => {
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>([]);
  const [mood, setMood] = useState<string>("");
  const [recentlyWatched, setRecentlyWatched] = useState("");
  const [durationPreference, setDurationPreference] = useState<UserPreferences['durationPreference']>('any');

  const toggleGenre = (g: string) => {
    setFavoriteGenres(prev => 
      prev.includes(g) ? prev.filter(item => item !== g) : [...prev, g]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      mood,
      favoriteGenres,
      recentlyWatched,
      durationPreference
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900/80 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-sm">
      <h2 className="text-xl md:text-2xl font-heading font-bold mb-6 text-white">Define Your Experience</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Genres */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-3">Favorite Genres</label>
          <div className="flex flex-wrap gap-2">
            {GENRES.map(g => (
              <button
                type="button"
                key={g}
                onClick={() => toggleGenre(g)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  favoriteGenres.includes(g)
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Mood & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">Current Mood</label>
            <div className="flex flex-wrap gap-2">
               {MOODS.map(m => (
                 <button
                   type="button"
                   key={m}
                   onClick={() => setMood(m)}
                   className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                     mood === m
                       ? 'bg-pink-600 border-pink-500 text-white'
                       : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                   }`}
                 >
                   {m}
                 </button>
               ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">Duration</label>
            <select
              value={durationPreference}
              onChange={(e) => setDurationPreference(e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            >
              <option value="any">Any Length</option>
              <option value="short">Short (&lt; 90 mins)</option>
              <option value="medium">Standard (90-120 mins)</option>
              <option value="long">Epic (&gt; 120 mins)</option>
            </select>
          </div>
        </div>

        {/* Free Text Input */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-3">
            Recently Watched / Additional Context
          </label>
          <input
            type="text"
            value={recentlyWatched}
            onChange={(e) => setRecentlyWatched(e.target.value)}
            placeholder="e.g. I loved Interstellar and want something similar..."
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all placeholder-slate-500"
          />
        </div>

        {/* Submit Action */}
        <div className="pt-4 border-t border-white/5">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold text-white text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl ${
              isLoading 
                ? 'bg-slate-700 cursor-not-allowed opacity-75' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-500/25'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Profile...
              </span>
            ) : (
              "Generate Recommendations"
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default Preferences;
