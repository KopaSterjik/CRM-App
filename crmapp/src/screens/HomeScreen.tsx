import React from "react";
import { Text, View, Button } from "react-native";
export default function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button
        title="Change"
        onPress={() => navigation.navigate("AddTask")}></Button>
    </View>
  );
}
