export interface Type {
  id: string;
  title: string;
  description?: string;
  deadline: string; // ISO format
  location?: string;
  status: "pending" | "in_progress" | "completed";
  createdAt: string; // ISO format
}
