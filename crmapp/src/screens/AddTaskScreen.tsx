import React, { useState } from "react";
import { Text, View, Button, TextInput, Alert } from "react-native";

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSave = async () => {
    // implement save logic
    if (!title.trim()) {
      Alert.alert("Validation Error", "Title is required");
      return;
    }
    if (!location.trim()) {
      Alert.alert("Validation Error", "Location is required");
      return;
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <TextInput placeholder="Write task" value="" onChangeText={}></TextInput>
      <TextInput
        placeholder="Write decription"
        value=""
        onChangeText={}></TextInput>
      <TextInput
        placeholder="Write location"
        value=""
        onChangeText={}></TextInput>
      <Button title="Save" style={}></Button>
    </View>
  );
}
