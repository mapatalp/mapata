import React from "react";
import { View, Text, Image } from "react-native"; //por que verga tengo que importarlo de aca si en el login screen lo hace desde components
import { UserProfilePic, Row } from "../components";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsdScreen from "./AsdScreen";
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator style={{marginTop: 115}}>
      <Tab.Screen name="Home" component={AsdScreen} />
      <Tab.Screen name="Settings" component={AsdScreen} />
    </Tab.Navigator>
  );
}

const ProfileScreen = () => {
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Row additionalStyles={{ marginTop: 25 }}>
        <UserProfilePic/>
      </Row>
      <Text style={{ alignSelf: "center", marginTop: 15, fontWeight: "bold", fontSize: 20}}>Mr. Buny</Text>
      <MyTabs/>
    </View>
  );
};

export default ProfileScreen;
