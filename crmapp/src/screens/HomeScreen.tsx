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
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState<Type[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "status">("date");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "in-progress" | "completed"
  >("all");

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
      const statusOrder = ["pending", "in-progress", "completed"];
      sorted.sort(
        (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
      );
    }
    return sorted;
  };
  const filteredTasks =
    filterStatus === "all"
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);

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
      status: "in-progress",
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
          <Feather name="edit-2" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={() => handleDelete(item.id)}>
          <AntDesign name="delete" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {["all", "pending", "in-progress"].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              filterStatus === status && styles.filterButtonActive,
            ]}
            onPress={() => setFilterStatus(status as typeof filterStatus)}>
            <Text
              style={[
                styles.filterText,
                filterStatus === status && styles.filterTextActive,
              ]}>
              {status.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[
            styles.filterButton,
            sortBy === "date" && styles.filterButtonActive, // исправлено условие
          ]}
          onPress={() => {
            const newSort = sortBy === "date" ? "status" : "date";
            setSortBy(newSort);
          }}>
          <Text
            style={[
              styles.filterText,
              sortBy === "date" && styles.filterTextActive, // исправлено
            ]}>
            SORT BY {sortBy.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddTask")}>
        <Ionicons name="add-circle" size={84} color="#28a745" />
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  filterButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#eee",
  },
  filterButtonActive: {},
  filterText: { color: "#333", fontWeight: "bold" },
  filterTextActive: {},
  taskContainer: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    marginRight: 10,
    flex: 1,
    margin: 5,
    minWidth: "45%",
    maxWidth: "48%",
  },
  title: { fontSize: 16, fontWeight: "bold" },
  info: { fontSize: 14, color: "#555" },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  button: {
    padding: 6,
    borderRadius: 6,
    marginVertical: 2,
  },
  buttonText: { color: "#fff", fontSize: 12 },
  addButton: {
    padding: 14,
    borderRadius: 8,
    alignItems: "flex-end",
    marginTop: 10,
  },

  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  sortContainer: { marginBottom: 10, alignItems: "flex-end" },
  sortButton: { padding: 6, backgroundColor: "#007AFF", borderRadius: 6 },
  sortButtonText: { color: "#fff", fontSize: 14 },
});
