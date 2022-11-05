import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Stacks

//screens
import { AppHeader } from "../components";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

import ROUTES from "../constants/routes";

const Tab = createBottomTabNavigator();
const HomeStackNavigator = createStackNavigator();

function HomeStack() {
  return (
    <HomeStackNavigator.Navigator initialRouteName={ROUTES.SCREEN.HOME}>
      <HomeStackNavigator.Screen
        name={ROUTES.SCREEN.HOME}
        component={HomeScreen}
        options={{
          header: () => <AppHeader title={"Mapata"} />,
        }}
      />
      <HomeStackNavigator.Screen
        name={ROUTES.SCREEN.PROFILE}
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomeStackNavigator.Navigator>
  );
}

function MyTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName={ROUTES.TAB.HOME}
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={ROUTES.STACK.HOME}
        component={HomeStack}
        options={{
          tabBarLabel: "Mapa",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.SCREEN.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation({ onReady }) {
  return (
    <NavigationContainer onReady={onReady}>
      <MyTabs />
    </NavigationContainer>
  );
}
