
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

const SYSTEM_INSTRUCTION = `You are the Fire Safety Expert for FireDetectors.de. 
Your goal is to help customers choose the right smoke or heat detectors for their homes.
Be professional, safety-oriented, and informative.
Refer to our products in the inventory when appropriate. 
Our inventory includes:
${PRODUCTS.map(p => `- ${p.name.en} (${p.price})`).join('\n')}

Guidelines:
- Recommend smoke detectors for bedrooms and hallways.
- Recommend heat detectors for kitchens and bathrooms to avoid false alarms.
- Mention that wireless sets are great for multi-story homes to ensure if one alarm triggers, they all do.
- Keep responses concise but helpful.`;

/**
 * Gets a response from the Gemini API using the specified model and conversation history.
 */
export async function getAiResponse(message: string, history: { role: 'user' | 'assistant', content: string }[]) {
  try {
    // ALWAYS initialize GoogleGenAI inside the function to ensure it uses the latest process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Use ai.models.generateContent to query the model with both parameters and configuration.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        // Map history to the required format: { role: 'user' | 'model', parts: [{ text: string }] }
        ...history.map(h => ({ 
          role: h.role === 'user' ? 'user' : 'model', 
          parts: [{ text: h.content }] 
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    // Access the .text property directly (do not call as a method).
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am having some trouble connecting to my expert knowledge base right now. Please try again in a moment!";
  }
}
