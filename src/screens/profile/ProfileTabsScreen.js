import React, { useState } from "react";
import { useTheme } from "react-native-paper";
import { View, Dimensions } from "react-native";
import PublicationListScreen from "./PublicationListScreen";
import { Row, Button } from "../../components";
import Toast from "react-native-toast-message";
import { ColorSpace } from "react-native-reanimated";

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
  <PublicationListScreen publicationList={publicationList} />
);

const MyFavourites = (props) => (
  <PublicationListScreen publicationList={publicationList} />
);

const RenderTabs = (props) => {
  var isSelf = props.isSelf; // TODO aplicar validacion
  const { colors } = useTheme();
  //tabBarActiveTintColor: colors.primary,
  //tabBarInactiveTintColor: "#000",
  //fontSize: 14,
  //  tabBarIndicatorStyle: { backgroundColor: colors.primary },
  var switchToFavourites = false;
  const [selectedIndexButton, setSelectedIndexButton] = useState("0");

  return (
    <View>
      <Row
        additionalStyles={{
          width: "100%",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flex: 1,
            height: "100%",
            backgroundColor:
              selectedIndexButton === "0" ? colors.primary : "fff",
          }}
        >
          <Button
            style={{
              alignSelf: "stretch",
            }}
            onPress={() => {
              switchToFavourites = false;
              setSelectedIndexButton("0");
              Toast.show({
                type: "success",
                position: "bottom",
                text1: `Tocaste publicaciones index: ${selectedIndexButton}`,
              });
            }}
            textColor={selectedIndexButton === "0" ? "#fff" : colors.primary}
          >
            Mis publicaciones
          </Button>
        </View>
        {isSelf && (
          <View
            style={{
              flex: 1,
              height: "100%",
              backgroundColor:
                selectedIndexButton === "1" ? colors.primary : "fff",
            }}
          >
            <Button
              additionalStyles={{
                alignSelf: "stretch",
                height: "100%",
                textAllCaps: false,
              }}
              onPress={() => {
                switchToFavourites = true;
                setSelectedIndexButton("1");
                Toast.show({
                  type: "success",
                  position: "bottom",
                  text1: `Tocaste favoritos index: ${selectedIndexButton}`,
                });
              }}
              textColor={selectedIndexButton === "1" ? "#fff" : colors.primary}
            >
              Mis favoritos
            </Button>
          </View>
        )}
      </Row>
      <Row>
        {!switchToFavourites && (
          <PublicationListScreen publicationList={publicationList} />
        )}

        {switchToFavourites && (
          <PublicationListScreen publicationList={publicationList} />
        )}
      </Row>
    </View>
  );
};

export const ProfileTabsScreen = (props) => {
  return <RenderTabs isSelf={props.isSelf} />;
};
