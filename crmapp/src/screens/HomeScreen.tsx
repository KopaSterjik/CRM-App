import React, { useCallback, useState } from "react";
import { Text, View, Button, FlatList, Alert } from "react-native";
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

  return (
    <View>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button title="Change" onPress={() => navigation.navigate("AddTask")} />
    </View>
  );
}
