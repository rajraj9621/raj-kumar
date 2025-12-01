import React from 'react';
import { Movie } from '../types';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  if (!movie) return null;
  
  const seed = movie.title.length + movie.year;
  const imageUrl = `https://picsum.photos/seed/${seed}/800/450`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-slate-900 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-[fadeIn_0.3s_ease-out]">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-md"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image Section */}
          <div className="relative h-64 md:h-auto">
             <img 
               src={imageUrl} 
               alt={movie.title} 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent md:bg-gradient-to-r md:from-transparent md:to-slate-900" />
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8 flex flex-col justify-center">
             <div className="flex items-center gap-3 mb-2">
               <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                 {movie.matchScore}% Match
               </span>
               <span className="text-slate-400 text-sm">{movie.year}</span>
             </div>

             <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
               {movie.title}
             </h2>
             
             <div className="flex flex-wrap gap-2 mb-6">
                {movie.genre.map(g => (
                   <span key={g} className="text-sm text-indigo-300 font-medium">
                      #{g}
                   </span>
                ))}
             </div>

             <div className="space-y-6">
               <div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Why we picked this</h3>
                  <p className="text-slate-200 leading-relaxed italic border-l-4 border-indigo-500 pl-4 py-1 bg-slate-800/30 rounded-r-lg">
                    "{movie.reasoning}"
                  </p>
               </div>

               <div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Plot Summary</h3>
                  <p className="text-slate-300 leading-relaxed">
                    {movie.plotSummary}
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Director</h3>
                    <p className="text-white">{movie.director}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Starring</h3>
                    <p className="text-slate-300 text-sm">{movie.cast.join(", ")}</p>
                  </div>
               </div>
             </div>

             <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
                <button className="flex-1 bg-white text-slate-900 py-3 rounded-lg font-bold hover:bg-slate-200 transition-colors">
                  Watch Trailer
                </button>
                <button className="flex-1 bg-transparent border border-white/20 text-white py-3 rounded-lg font-bold hover:bg-white/5 transition-colors">
                  Save to List
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
