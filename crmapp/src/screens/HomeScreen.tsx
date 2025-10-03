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
import StatusModal from "../components/Modal";
export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState<Type[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "status">("date");

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Type | null>(null);

  const sortTasks = (tasklist: Type[], sortBy: typeof sortBy) => {
    // sorting function
    const sorted = [...tasklist];
    if (sortBy === "date") {
      sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (sortBy === "status") {
      const statusOrder = ["pending", "in_progress", "completed"];
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

  const fastadd = () => {
    // fast add task for testing
    const newTask: Type = {
      id: Math.random().toString(),
      title: "Fast Task " + (tasks.length + 1),
      deadline: new Date().toISOString(),
      status: "in_progress",
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = [...tasks, newTask];
    saveTask(updatedTasks);
    setTasks(sortTasks(updatedTasks, sortBy));
  };

  const renderItem = ({ item }: { item: Type }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("TaskInfo", { task: item })}
      style={styles.taskContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.info}>
          Deadline: {new Date(item.deadline).toLocaleDateString()}
        </Text>
        <Text style={styles.info}>Status: {item.status}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#007AFF" }]}
          onPress={() => {
            setSelectedTask(item);
            setModalVisible(true);
          }}>
          <Text style={styles.buttonText}>Change Status</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={() => handleDelete(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => {
            const newSort = sortBy === "date" ? "status" : "date";
            setSortBy(newSort);
            setTasks(sortTasks(tasks, newSort));
          }}>
          <Text style={styles.sortButtonText}> Sort by {sortBy}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => {
            fastadd();
          }}>
          <Text style={styles.sortButtonText}> Fast create </Text>
        </TouchableOpacity>
      </View>
      <FlatList data={tasks} renderItem={renderItem} />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddTask")}>
        <Text style={styles.addButtonText}> + Add Task</Text>
      </TouchableOpacity>
      <StatusModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectStatus={async (status) => {
          if (!selectedTask) return;

          if (status === "completed") {
            await deleteTask(selectedTask.id);
            setTasks(tasks.filter((t) => t.id !== selectedTask.id));
          } else {
            const updatedTasks = tasks.map((t) =>
              t.id === selectedTask.id ? { ...t, status } : t
            );
            setTasks(updatedTasks);
            await saveTask(updatedTasks);
          }

          setModalVisible(false);
          setSelectedTask(null);
        }}
      />
      ;
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
