import React from "react";
import { View, Text, Image } from "react-native"; //por que verga tengo que importarlo de aca si en el login screen lo hace desde components
import { UserProfilePic, Row } from "../components";
import { useTheme } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PublicaionTabScreen from "./PublicaionTabScreen";
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#000",
        tabBarLabelStyle: { fontSize: 14, textTransform: "none" },
        tabBarIndicatorStyle: { backgroundColor: colors.primary },
      }}
      style={{ marginTop: 20 }}
    >
      <Tab.Screen name="Publicaciones" component={PublicaionTabScreen} />
      <Tab.Screen name="Favoritos" component={PublicaionTabScreen} />
    </Tab.Navigator>
  );
}

const ProfileScreen = () => {
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Row additionalStyles={{ marginTop: 25 }}>
        <UserProfilePic />
      </Row>
      <Text
        style={{
          alignSelf: "center",
          marginTop: 15,
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        Mr. Buny
      </Text>

      <Row additionalStyles={{ marginTop: 20, alignSelf: "center" }}>
        <Image
          source={{
            uri: "https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png",
          }}
          style={{ width: 40, height: 40, margin: 5 }}
        />

        <Image
          source={{
            uri: "https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png",
          }}
          style={{ width: 40, height: 40, margin: 5 }}
        />

        <Image
          source={{
            uri: "https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png",
          }}
          style={{ width: 40, height: 40, margin: 5 }}
        />

        <Image
          source={{
            uri: "https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png",
          }}
          style={{ width: 40, height: 40, margin: 5 }}
        />
      </Row>
      <MyTabs />
    </View>
  );
};

export default ProfileScreen;
