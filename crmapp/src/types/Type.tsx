export interface Type {
  id: string;
  title: string;
  description?: string;
  deadline: string;
  location?: string;
  status: "canceled" | "in-progress" | "completed";
  createdAt: string;
}
