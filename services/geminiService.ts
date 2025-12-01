import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserPreferences, RecommendationResponse } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const movieSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    year: { type: Type.INTEGER },
    director: { type: Type.STRING },
    genre: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    rating: { type: Type.STRING, description: "IMDb style rating, e.g. 8.5/10" },
    matchScore: { type: Type.INTEGER, description: "A confidence score from 0 to 100 based on user preferences" },
    reasoning: { type: Type.STRING, description: "Why this movie fits the user's specific request" },
    plotSummary: { type: Type.STRING, description: "A concise 2-sentence plot summary" },
    cast: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Top 3 main actors"
    }
  },
  required: ["title", "year", "genre", "rating", "matchScore", "reasoning", "plotSummary", "cast"]
};

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    recommendations: {
      type: Type.ARRAY,
      items: movieSchema
    }
  }
};

export const getRecommendations = async (prefs: UserPreferences): Promise<RecommendationResponse> => {
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const model = "gemini-2.5-flash";
  
  const prompt = `
    Act as a sophisticated film critic and recommendation engine. 
    Analyze the user's profile deep down to the nuance of their mood and taste.
    
    User Profile:
    - Current Mood: ${prefs.mood || "Any"}
    - Favorite Genres: ${prefs.favoriteGenres.length > 0 ? prefs.favoriteGenres.join(", ") : "Varied"}
    - Recently Watched/Liked: ${prefs.recentlyWatched || "None specified"}
    - Duration Preference: ${prefs.durationPreference}

    Task:
    Generate a curated list of 6 movie recommendations. 
    - Ensure diversity in era and style if the preferences allow.
    - The 'reasoning' must strictly connect the movie's themes to the user's mood and specific 'Recently Watched' input.
    - 'matchScore' should be high (>90) for perfect fits and lower for 'wildcard' suggestions.
  `;

  try {
    const result = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "You are CineMind, an advanced AI film expert. You prefer hidden gems and critically acclaimed masterpieces over generic blockbusters unless specifically requested.",
        temperature: 0.6,
      }
    });

    const text = result.text;
    if (!text) return { recommendations: [] };

    const parsed = JSON.parse(text) as RecommendationResponse;
    // Add IDs for React keys
    parsed.recommendations = parsed.recommendations.map((movie, idx) => ({
      ...movie,
      id: `movie-${Date.now()}-${idx}`
    }));

    return parsed;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};