import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/HomeScreen";
import AddTask from "../screens/AddTaskScreen";
import TaskInfo from "../screens/TaskInfoScreen";
const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddTask" component={AddTask} />
      <Stack.Screen name="TaskInfo" component={TaskInfo} />
    </Stack.Navigator>
  );
}
