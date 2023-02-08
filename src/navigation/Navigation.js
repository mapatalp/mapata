import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

//screens
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import CreatePublicationScreen from "../screens/publication/CreatePublicationScreen";
import ReelsScreen from "../screens/reels/ReelsScreen";
import ViewPublicationScreen from "../screens/publication/ViewPublicationScreen";
import {
  LoginScreen,
  RegisterScreen,
  LoginPasswordScreen,
  RegisterPasswordScreen,
  RegisterSuccessScreen,
} from "../screens/auth";

import { AppHeader } from "../components";
import DrawerContent from "./Drawer/DrawerContent";

import ROUTES from "../constants/routes";

const Tab = createBottomTabNavigator();
const MainStackNavigator = createStackNavigator();
const HomeStackNavigator = createStackNavigator();
const AuthenticationStackNavigator = createStackNavigator();
const ReelsStackNavigator = createStackNavigator();
const ProfileStackNavigator = createStackNavigator();

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
      <HomeStackNavigator.Screen
        name={ROUTES.SCREEN.VIEW_PUBLICATION}
        component={ViewPublicationScreen}
        options={{
          header: () => <AppHeader title={"Mapata"} />,
        }}
      />
    </HomeStackNavigator.Navigator>
  );
}

function ReelsStack() {
  return (
    <ReelsStackNavigator.Navigator initialRouteName={ROUTES.SCREEN.REELS}>
      <ReelsStackNavigator.Screen
        name={ROUTES.SCREEN.REELS}
        component={ReelsScreen}
        options={{
          header: () => <AppHeader title={"Mapata"} />,
        }}
      />
      <ReelsStackNavigator.Screen
        name={ROUTES.SCREEN.VIEW_PUBLICATION}
        component={ViewPublicationScreen}
        options={{
          header: () => <AppHeader title={"Mapata"} />,
        }}
      />
    </ReelsStackNavigator.Navigator>
  );
}

function ProfileStack() {
  return (
    <ProfileStackNavigator.Navigator initialRouteName={ROUTES.SCREEN.PROFILE}>
      <ProfileStackNavigator.Screen
        name={ROUTES.SCREEN.PROFILE}
        component={ProfileScreen}
        options={{
          header: () => <AppHeader title={"Mapata"} />,
        }}
      />
      <ReelsStackNavigator.Screen
        name={ROUTES.SCREEN.VIEW_PUBLICATION}
        component={ViewPublicationScreen}
        options={{
          header: () => <AppHeader title={"Mapata"} />,
        }}
      />
    </ProfileStackNavigator.Navigator>
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
      <AuthenticationStackNavigator.Screen
        name={ROUTES.SCREEN.REGISTER_SUCCESS}
        component={RegisterSuccessScreen}
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
        name={ROUTES.STACK.REELS}
        component={ReelsStack}
        options={{
          tabBarLabel: "Publicaciones",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-list" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.STACK.PROFILE}
        component={ProfileStack}
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
      <MainStackNavigator.Screen
        name={ROUTES.SCREEN.PROFILE}
        component={ProfileScreen}
        options={{
          header: () => <AppHeader title={"Mapata"} />,
        }}
      />
    </MainStackNavigator.Navigator>
  );
}

export default function Navigation({ onReady }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) =>
      setUserLoggedIn(!!user ? true : false)
    );

    return subscriber;
  }, []);

  return (
    <NavigationContainer onReady={onReady}>
      {userLoggedIn ? <MainStack /> : <AuthenticationStack />}
    </NavigationContainer>
  );
}
