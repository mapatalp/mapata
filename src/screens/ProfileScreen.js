import React from "react";
import { View, Text } from "react-native"; //por que verga tengo que importarlo de aca si en el login screen lo hace desde components
import { UserProfilePic } from "../components";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsdScreen from "./AsdScreen";
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={AsdScreen} />
      <Tab.Screen name="Settings" component={AsdScreen} />
    </Tab.Navigator>
  );
}

const ProfileScreen = () => {
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <UserProfilePic/>
      <Text style={{ alignSelf: "center" }}>Login screen</Text>
      <MyTabs/>
    </View>
  );
};

export default ProfileScreen;
