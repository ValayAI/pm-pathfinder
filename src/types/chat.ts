
export type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
};

export type CachedResponse = {
  query: string;
  response: string;
  timestamp: number;
};
