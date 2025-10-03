import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { v4 as uuidv4 } from "uuid";
import { addTask } from "../utils/Storage";
import { Type } from "../types/Type";

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [deadline, setDeadline] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const descriptionRef = useRef<TextInput>(null);
  const locationRef = useRef<TextInput>(null);

  const handleSave = async () => {
    // validate inputs
    if (!title.trim()) {
      Alert.alert("Validate Error", "Task title is required!");
      return;
    }
    if (!description.trim()) {
      Alert.alert("Validate Error", "Description is required!");
      return;
    }
    if (deadline < new Date()) {
      Alert.alert("Validate Error", "Deadline must be in the future!");
      return;
    }

    const newTask: Type = {
      id: uuidv4(), // generate unique id
      title,
      description,
      location,
      status: "in-progress",
      deadline: deadline.toISOString(),
      createdAt: new Date().toISOString(),
    };

    await addTask(newTask);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Write task title"
          value={title}
          onChangeText={setTitle}
          returnKeyType="next"
          onSubmitEditing={() => descriptionRef.current?.focus()}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Write description"
          value={description}
          onChangeText={setDescription}
          returnKeyType="next"
          onSubmitEditing={() => locationRef.current?.focus()}
        />
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Write location"
          value={location}
          onChangeText={setLocation}
          returnKeyType="next"
        />
        <Text style={styles.label}>Deadline</Text>
        {showPicker && (
          <DateTimePicker // Date picker component
            value={deadline}
            mode="date"
            display={"default"}
            onChange={(event, selectedDate) => {
              if (event.type === "set" && selectedDate) {
                setDeadline(selectedDate);
              }
              setShowPicker(false);
            }}
          />
        )}
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowPicker(true)}>
          <Text style={styles.dateButtonText}>
            {deadline.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Add</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  label: { marginTop: 12, marginBottom: 4, fontWeight: "bold", fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  dateButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  dateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
