import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//screens
import { AppHeader } from "../components";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import CreatePublicationScreen from "../screens/publication/CreatePublicationScreen";
import ROUTES from "../constants/routes";
import { LoginScreen, RegisterScreen } from "../screens/Auth";
import ReelsScreen from "../screens/reels/ReelsScreen";

const Tab = createBottomTabNavigator();
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
        name={ROUTES.SCREEN.REGISTER}
        component={RegisterScreen}
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
          tabBarLabel: "Reels",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="filmstrip-box"
              size={30}
              color={color}
            />
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

export default function Navigation({ onReady }) {
  const userLoggedIn = true;
  return (
    <NavigationContainer onReady={onReady}>
      {userLoggedIn ? <AuthenticatedTabs /> : <AuthenticationStack />}
    </NavigationContainer>
  );
}
