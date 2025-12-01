export interface Movie {
  id: string; // Generated via UUID or hash for list keys
  title: string;
  year: number;
  director: string;
  genre: string[];
  rating: string; // e.g., "8.5/10"
  matchScore: number; // 0-100
  reasoning: string;
  plotSummary: string;
  cast: string[];
}

export interface UserPreferences {
  mood: string;
  favoriteGenres: string[];
  recentlyWatched: string;
  durationPreference: 'any' | 'short' | 'medium' | 'long';
}

export interface RecommendationResponse {
  recommendations: Movie[];
}
