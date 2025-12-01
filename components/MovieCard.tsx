import React from 'react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  index: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, index }) => {
  // Deterministic seed for image based on title length and year
  const seed = movie.title.length + movie.year;
  const imageUrl = `https://picsum.photos/seed/${seed}/400/600`;

  return (
    <div 
      className="group relative bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-white/5"
      onClick={() => onClick(movie)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Overlay */}
      <div className="aspect-[2/3] relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />
        
        {/* Match Score Badge */}
        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full border border-green-500/30 flex items-center gap-1 shadow-lg">
          <span className="text-green-400">{movie.matchScore}%</span> Match
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        <h3 className="text-xl font-heading font-bold text-white mb-1 leading-tight group-hover:text-indigo-300 transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center gap-3 text-sm text-slate-300 mb-3">
          <span>{movie.year}</span>
          <span className="w-1 h-1 bg-slate-500 rounded-full" />
          <span className="text-yellow-400 flex items-center gap-1">
            ★ {movie.rating}
          </span>
        </div>
        
        <p className="text-sm text-slate-400 line-clamp-2 mb-3">
          {movie.reasoning}
        </p>

        <div className="flex flex-wrap gap-2">
          {movie.genre.slice(0, 2).map(g => (
            <span key={g} className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 bg-slate-800/80 px-2 py-1 rounded border border-white/10">
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
