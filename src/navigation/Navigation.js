import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { onAuthStateChanged } from "firebase/auth";

//screens
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CreatePublicationScreen from "../screens/publication/CreatePublicationScreen";
import {
  LoginScreen,
  RegisterScreen,
  LoginPasswordScreen,
  RegisterPasswordScreen,
} from "../screens/auth";

import { auth } from "../firebase/config";
import { AppHeader } from "../components";
import ROUTES from "../constants/routes";
import DrawerContent from "./Drawer/DrawerContent";

const Tab = createBottomTabNavigator();
const MainStackNavigator = createStackNavigator();
const HomeStackNavigator = createStackNavigator();
const AuthenticationStackNavigator = createStackNavigator();

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
        name={ROUTES.SCREEN.CREATE_PUBLICATION}
        component={CreatePublicationScreen}
        options={{
          header: () => <AppHeader title={"Mapata"} />,
        }}
        canGoBack
      />
    </HomeStackNavigator.Navigator>
  );
}

function AuthenticationStack() {
  return (
    <AuthenticationStackNavigator.Navigator
      initialRouteName={ROUTES.SCREEN.LOGIN}
    >
      <AuthenticationStackNavigator.Screen
        name={ROUTES.SCREEN.LOGIN}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthenticationStackNavigator.Screen
        name={ROUTES.SCREEN.LOGIN_PASSWORD}
        component={LoginPasswordScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthenticationStackNavigator.Screen
        name={ROUTES.SCREEN.REGISTER}
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthenticationStackNavigator.Screen
        name={ROUTES.SCREEN.REGISTER_PASSWORD}
        component={RegisterPasswordScreen}
        options={{
          headerShown: false,
        }}
      />
    </AuthenticationStackNavigator.Navigator>
  );
}

function AuthenticatedTabs() {
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
        name={ROUTES.STACK.PROFILE}
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

function AuthenticatedWithDrawer() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator drawerContent={() => <DrawerContent />}>
      <Drawer.Screen
        name="AuthenticatedTabs"
        component={AuthenticatedTabs}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="AuthenticationStack"
        component={AuthenticationStack}
      />
    </Drawer.Navigator>
  );
}

function MainStack() {
  return (
    <MainStackNavigator.Navigator initialRouteName={ROUTES.SCREEN.HOME}>
      <MainStackNavigator.Screen
        name={"Authenticated"}
        component={AuthenticatedWithDrawer}
        options={{ headerShown: false }}
      />
      <MainStackNavigator.Screen
        name={"Auth"}
        component={AuthenticationStack}
        canGoBack
        options={{ headerShown: false }}
      />
    </MainStackNavigator.Navigator>
  );
}

export default function Navigation({ onReady }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserLoggedIn(user ? true : false);
    });
  }, []);

  return (
    <NavigationContainer onReady={onReady}>
      {userLoggedIn ? <MainStack /> : <AuthenticationStack />}
    </NavigationContainer>
  );
}
