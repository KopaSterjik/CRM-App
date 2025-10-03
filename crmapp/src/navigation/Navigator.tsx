import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/HomeScreen";
import AddTask from "../screens/AddTaskScreen";
import TaskInfo from "../screens/TaskInfoScreen";
const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#159ce5ff",
          },
          headerTitleStyle: {
            fontWeight: "bold", // жирный текст
            fontSize: 18,
          },
        }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 18,
            color: "#000",
          },
        }}
        name="AddTask"
        component={AddTask}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 18,
            color: "#000",
          },
        }}
        name="TaskInfo"
        component={TaskInfo}
      />
    </Stack.Navigator>
  );
}
