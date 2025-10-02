import React, { useState } from "react";
import { Text, View, Button, FlatList } from "react-native";
export default function HomeScreen({ navigation }) {
  const [item, setItem] = useState("");

  return (
    <View>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button title="Change" onPress={() => navigation.navigate("AddTask")} />
    </View>
  );
}
