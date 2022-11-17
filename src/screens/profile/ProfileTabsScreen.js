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
        //uso la misma lista para favoritos y publicaciones para mockear nada mas
        initialParams={{ publicationList: publicationList }}
        name="Publicaciones"
        component={() => (
          <PublicationListScreen publicationList={publicationList} />
        )}
      />
      <Tab.Screen
        initialParams={{ publicationList: publicationList }}
        name="Favoritos"
        component={() => (
          <PublicationListScreen publicationList={publicationList} />
        )}
      />
    </Tab.Navigator>
  );
}

export function ProfileTabsScreen() {
  return <RenderTabs />;
}
