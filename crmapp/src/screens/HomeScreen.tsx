import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  Button,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Type } from "../types/Type";
import { loadTask, deleteTask, saveTask } from "../utils/Storage";
import { useFocusEffect } from "expo-router";
export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState<Type[]>([]);
  const [sortBy, setSortBy] = useState<"createdAt" | "status">("createdAt");

  const sortTasks = (tasklist: Type[], sortBy: typeof sortBy) => {
    // sorting function
    const sorted = [...tasklist];
    if (sortBy === "createAt") {
      sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (sortBy === "status") {
      const statusOrder = ["canceled", "in_progress", "completed"];
      sorted.sort(
        (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
      );
    }
    return sorted;
  };

  const fetchTasks = async () => {
    // fetch tasks from storage
    const loadedTask = await loadTask();
    setTasks(sortTasks(loadedTask, sortBy));
  };

  useFocusEffect(
    // reload task when screen update
    useCallback(() => {
      fetchTasks();
    }, [sortBy])
  );

  const handleDelete = (id: string) => {
    // delete task with confirmation
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteTask(id);
          fetchTasks();
        },
      },
    ]);
  };
  const handleStatusChange = async (task: Type) => {
    // change task status
    // const nextStatus = task.status === "in_progress" ? "completed" : "canceled";
    const nextStatus =
      task.status === "canceled"
        ? "in-progress"
        : task.status === "in-progress"
        ? "completed"
        : "canceled";
    let updatedTasks = tasks.map((t) =>
      t.id == task.id ? { ...t, status: nextStatus } : t
    );

    if (nextStatus === "completed") {
      updatedTasks = updatedTasks.filter((t) => t.id !== task.id);
      await deleteTask(task.id);
    } else {
      await saveTask(updatedTasks);
    }

    setTasks(updatedTasks);
  };
  const renderItem = (item: Type) => {
    <View style={styles.taskContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.info}>
          Deadline{new Date(item.deadline).toLocaleDateString()}// CHEEEEEEEK
        </Text>
        <Text style={styles.info}>Status: {item.status}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "blue" }]}
            onPress={() => handleStatusChange(item)}>
            <Text>Change Status</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={() => handleDelete(item.id)}>
            <Text>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "green" }]}
            onPress={() => deleteTask(item.id)}>
            <Text>Completed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>;
  };

  return (
    <View>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button title="Change" onPress={() => navigation.navigate("AddTask")} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  taskContainer: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  title: { fontSize: 16, fontWeight: "bold" },
  info: { fontSize: 14, color: "#555" },
  buttons: { flexDirection: "column", marginLeft: 10 },
  button: { padding: 6, borderRadius: 6, marginVertical: 2 },
  buttonText: { color: "#fff", fontSize: 12 },
  addButton: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  sortContainer: { marginBottom: 10, alignItems: "flex-end" },
  sortButton: { padding: 6, backgroundColor: "#007AFF", borderRadius: 6 },
  sortButtonText: { color: "#fff", fontSize: 14 },
});
