export interface Task {
  id: string;
  title: string;
  description?: string;
  datetime: string; // ISO строка
  location?: string;
  status: "pending" | "in_progress" | "done" | "cancelled";
  createdAt: string; // ISO строка
}
