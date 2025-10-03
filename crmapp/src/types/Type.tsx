export interface Type {
  id: string;
  title: string;
  description?: string;
  deadline: string; // ISO format
  location?: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: string; // ISO format
}
