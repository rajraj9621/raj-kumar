import React, { useState } from 'react';
import Header from './components/Header';
import Preferences from './components/Preferences';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import { getRecommendations } from './services/geminiService';
import { UserPreferences, Movie } from './types';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handlePreferencesSubmit = async (prefs: UserPreferences) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    setMovies([]); // Clear previous results

    try {
      const response = await getRecommendations(prefs);
      setMovies(response.recommendations);
    } catch (err) {
      setError("Failed to generate recommendations. Please try again or check your API key.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (movies.length === 0) return;
    
    const dataStr = JSON.stringify(movies, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cinemind-recommendations-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-indigo-500/30 pb-20">
      <Header />

      <main className="container mx-auto px-4 md:px-8 pt-8">
        
        {/* Intro / Hero */}
        {!hasSearched && (
          <div className="text-center py-12 md:py-20 max-w-3xl mx-auto animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 tracking-tight">
              Discover movies that <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500">
                understand you.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
              Stop scrolling endlessly. Our AI analyzes your mood and taste to find the perfect film for right now.
            </p>
          </div>
        )}

        {/* Input Form */}
        <div className="mb-16 relative z-10">
          <Preferences onSubmit={handlePreferencesSubmit} isLoading={loading} />
        </div>

        {/* Error State */}
        {error && (
          <div className="max-w-4xl mx-auto bg-red-500/10 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl mb-12 text-center">
            {error}
          </div>
        )}

        {/* Results Section */}
        {hasSearched && !loading && movies.length > 0 && (
          <div className="animate-[fadeIn_0.5s_ease-in-out]">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
                <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
                Top Recommendations
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-slate-400 text-sm hidden md:inline">{movies.length} results found</span>
                <button 
                  onClick={handleExport}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-indigo-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Export List
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {movies.map((movie, index) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  onClick={setSelectedMovie} 
                  index={index}
                />
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-slate-500 italic">
                Not what you were looking for? Try adjusting your preferences above.
              </p>
            </div>
          </div>
        )}

        {/* Empty State after search */}
        {hasSearched && !loading && movies.length === 0 && !error && (
          <div className="text-center py-20 text-slate-500">
            <p className="text-xl">No movies found tailored to this specific combination.</p>
            <p className="mt-2 text-sm">Try broadening your criteria.</p>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  );
}

export default App;