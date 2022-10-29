import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ROUTES from "./Routes";

const Tab = createBottomTabNavigator();
const HomeStackNavigator = createStackNavigator();

function HomeStack() {
  return (
    <HomeStackNavigator.Navigator initialRouteName={ROUTES.SCREEN.HOME}>
      <HomeStackNavigator.Screen
        name={ROUTES.SCREEN.HOME}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStackNavigator.Screen
        name={ROUTES.SCREEN.SETTINGS}
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomeStackNavigator.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.TAB.HOME}
      screenOptions={{
        tabBarActiveTintColor: "green",
      }}
    >
      <Tab.Screen name={ROUTES.STACK.HOME} component={HomeStack} />
      <Tab.Screen name={ROUTES.SCREEN.SETTINGS} component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
