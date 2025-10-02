import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/Type";
const STORAGE_KEY = "@tasks";

export const saveTask = async (task: Task[]): Promise<void> => {
  // safe task to async storage
  try {
    const jsonvalue = JSON.stringify(task);
    await AsyncStorage.setItem(STORAGE_KEY, jsonvalue);
  } catch (e) {
    console.error("Error saving task to AsyncStorage", e);
  }
};
export const loadTask = async (): Promise<Task[]> => {
  // load task from async storage
  try {
    const jsonvalue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonvalue != null ? JSON.parse(jsonvalue) : [];
  } catch (e) {
    console.error("Error loading task to AsyncStorage", e);
    return [];
  }
};
export const addTask = async (task: Task): Promise<void> => {
  // add new task
  const tasks = await loadTask();
  tasks.push(task);
  await saveTask(tasks);
};

export const deleteTask = async (taskId: string): Promise<void> => {
  // delete task by id
  let tasks = await loadTask();
  tasks = tasks.filter((task) => task.id !== taskId);
  await saveTask(tasks);
};
