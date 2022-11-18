import React from "react";
import { Button, useTheme } from "react-native-paper";
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

//uso la misma lista para favoritos y publicaciones para mockear nada mas
const MyPublications = (props) => (
  <PublicationListScreen id="0" publicationList={publicationList} />
);

const MyFavourites = (props) => (
  <PublicationListScreen id="1" publicationList={publicationList} />
);

const RenderTabs = (props) => {
  var isSelf = props.isSelf; // TODO aplicar validacion
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
      onPressed={() => {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error en los permisos",
          text2: "Tienes que ir a ajustes de la app y activar la localización",
        });
      }}
    >
      <Tab.Screen name="Publicaciones" component={MyPublications} />

      {isSelf && <Tab.Screen name="Favoritos" component={MyFavourites} />}
    </Tab.Navigator>
  );
};

export const ProfileTabsScreen = (props) => {
  return <RenderTabs isSelf={props.isSelf} />;
};
