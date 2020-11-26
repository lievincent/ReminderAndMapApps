import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Reminder from "./screens/Reminder";
import List from "./screens/List";
import News from "./screens/News";
import Maps from "./screens/Maps";
import CameraScreen from "./screens/Camera";
import AddScreen from "./screens/Add";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const drawerComponent = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Reminder"
        component={Reminder}
        options={{ title: "Reminder" }}
      />
      <Drawer.Screen name="List" component={List} options={{ title: "List" }} />
      <Drawer.Screen name="News" component={News} options={{ title: "News" }} />
      <Drawer.Screen name="Maps" component={Maps} options={{ title: "Maps" }} />
      <Drawer.Screen
        name="Camera"
        component={CameraScreen}
        options={{ title: "Camera" }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="drawer"
          component={drawerComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add New" component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
