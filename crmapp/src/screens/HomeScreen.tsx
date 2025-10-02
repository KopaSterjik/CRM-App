import React, { useState } from "react";
import { Text, View, Button, FlatList } from "react-native";
import { Type } from "../types/Type";
export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState<Type[]>([]);
  const [sortBy, setSortBy] = useState<"createdAt" | "status">("createdAt");

  const sortTasks = (tasklist: Type[] sortBy: typeof sortBy) => {
    const sorted = [...tasklist]
    if(sortBy === "createAt"){
      sorted.sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }
    else if (sortBy === "status"){
      const statusOrder = ["canceled", "in_progress", "completed"];
      sorted.sort((a,b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status))
    }
    return sorted;
  }
  return (
    <View>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button title="Change" onPress={() => navigation.navigate("AddTask")} />
    </View>
  );
}
