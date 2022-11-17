import React from "react";
import { useTheme } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PublicationListScreen from "./PublicationListScreen";

var publicationList = [];

for (var i = 0; i < 3; i++) {
  publicationList.push({
    title: `Manucha ${i + 1}`,
    imageUrl: "https://picsum.photos/700",
    date: "12/02/2022",
    description: `Miau miau ${i + 1}`,
  });
}

const MyPublications = (props) => (
  <PublicationListScreen id="0" publicationList={publicationList} />
);

const MyFavourites = (props) => (
  <PublicationListScreen id="1" publicationList={publicationList} />
);

function RenderTabs() {
  const { colors } = useTheme();
  const Tab = createMaterialTopTabNavigator();
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
      <Tab.Screen
        name="Publicaciones"
        //uso la misma lista para favoritos y publicaciones para mockear nada mas
        component={MyPublications}
      />
      <Tab.Screen name="Favoritos" component={MyFavourites} />
    </Tab.Navigator>
  );
}

export function ProfileTabsScreen() {
  return <RenderTabs />;
}
