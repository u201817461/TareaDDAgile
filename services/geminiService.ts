import { GoogleGenAI } from "@google/genai";

export const getVelocityAnalogy = async (velocity: number, distance: number, time: number): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API Key is missing. Returning mock response.");
    return "Configura tu API Key para obtener analogías inteligentes de Gemini.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Actúa como un profesor de física experto.
      El usuario ha calculado una velocidad de ${velocity.toFixed(2)} metros por segundo (basado en ${distance}m en ${time}s).
      
      Por favor, proporciona:
      1. Una comparación con el mundo real para esta velocidad (ej. ¿es tan rápido como una persona caminando, un coche, un avión, la luz?).
      2. Una breve explicación intuitiva de lo que significa recorrer ${distance} metros en ${time} segundos.
      
      Mantén la respuesta breve (máximo 3 frases), educativa y en español.
      No uses formato Markdown complejo, solo texto plano o viñetas simples.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No se pudo generar una analogía en este momento.";
  } catch (error) {
    console.error("Error fetching Gemini analogy:", error);
    return "Hubo un error al conectar con el asistente inteligente.";
  }
};