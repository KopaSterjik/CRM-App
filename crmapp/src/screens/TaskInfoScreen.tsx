import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { Type } from "../types/Type";

type TaskInfoScreenProps = {
  route: RouteProp<{ params: { task: Type } }, "params">;
  navigation: any;
};

export default function TaskInfoScreen({
  route,
  navigation,
}: TaskInfoScreenProps) {
  const { task } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title} </Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Description: </Text>
        <Text style={styles.text}>{task.description || "N/A"}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Location: </Text>
        <Text style={styles.text}>{task.location || "N/A"}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Status: </Text>
        <Text style={styles.text}>{task.status}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Deadline</Text>
        <Text style={styles.text}>
          {new Date(task.deadline).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Created At</Text>
        <Text style={styles.text}>
          {new Date(task.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  infoBox: { marginBottom: 15 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  text: { fontSize: 16, color: "#444" },
  backButton: {
    marginTop: 30,
    padding: 14,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
  },
  backText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
