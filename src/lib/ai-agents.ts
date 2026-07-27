import { Product } from "../data/products";

export interface AgentResponse {
  message: string;
  confidenceScore: number;
}

export async function ConciergeAgent(query: string, userHistory: any): Promise<AgentResponse> {
  return {
    message: "Based on your cat's sensitive stomach, I highly recommend our Organic Chicken Pate.",
    confidenceScore: 0.95,
  };
}
