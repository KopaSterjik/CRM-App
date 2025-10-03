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
            backgroundColor: "#1d68b8ff",
          },
          headerTitleStyle: {
            fontWeight: "bold", // жирный текст
            fontSize: 18,
          },
        }}
        name="Home"
        component={Home}
      />
      <Stack.Screen name="AddTask" component={AddTask} />
      <Stack.Screen name="TaskInfo" component={TaskInfo} />
    </Stack.Navigator>
  );
}
