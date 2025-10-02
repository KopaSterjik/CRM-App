export interface Type {
  id: string;
  title: string;
  description?: string;
  deadline: string; // ISO format
  location?: string;
  status: "pending" | "in_progress" | "done" | "cancelled";
  createdAt: string; // ISO format
}
