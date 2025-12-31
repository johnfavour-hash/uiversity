
import { GoogleGenAI, Type } from "@google/genai";
import { Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getStudyBuddyResponse = async (history: Message[], userInput: string) => {
  try {
    const chat = ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        { role: 'user', parts: [{ text: userInput }] }
      ],
      config: {
        systemInstruction: "You are 'UniEdu Buddy', a helpful AI academic assistant. You help students with their studies, explain complex topics simply, and offer productivity tips. Keep your tone encouraging, professional, and educational. Use Markdown for formatting.",
        temperature: 0.7,
      },
    });

    const response = await chat;
    return response.text || "I'm sorry, I couldn't process that. Can you try again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong with my processing. Please check your connection and try again.";
  }
};
