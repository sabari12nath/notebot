// lib/chatbot/chat.ts

import { roastOpeners, cannedAnswers } from './data.js';

export function getRoastResponse(question: string, name: string = ''): string {
  const roast = roastOpeners[Math.floor(Math.random() * roastOpeners.length)];
  const answer = cannedAnswers[question.toLowerCase()] || "I don't know, and you clearly don’t either.";

  const prefix = name ? `${name}, ` : '';
  return `${prefix}${roast} ${answer}`;
}
