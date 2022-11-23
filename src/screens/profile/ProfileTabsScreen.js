import React, { useState } from "react";
import { useTheme } from "react-native-paper";
import { View } from "react-native";
import PublicationListScreen from "./PublicationListScreen";
import { Row, Button } from "../../components";

var publicationList = [];
var favoritesList = [];

for (var i = 0; i < 4; i++) {
  publicationList.push({
    title: `Manucha ${i + 1}`,
    imageUrl: "https://picsum.photos/700",
    date: "12/02/2022",
    description: `Miau miau ${i + 1}`,
  });
  favoritesList.push({
    title: `Favsss ${i + 1}`,
    imageUrl: `https://picsum.photos/id/23${i + 1}/200/300`,
    date: "12/02/2022",
    description: `Miau miau ${i + 1}`,
  });
}

const RenderTabs = (props) => {
  var isSelf = props.isSelf; // TODO aplicar validacion
  const { colors } = useTheme();
  const [switchToFavouritesTab, setSwitchToFavouritesTab] = useState(false);
  const [selected, setSelected] = useState(0);
  let tabs = isSelf
    ? ["Mis publicaciones", "Mis favoritos"]
    : ["Mis publicaciones"];

  return (
    <View>
      <Row
        additionalStyles={{
          width: "100%",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        {[...Array(tabs.length).keys()].map((item) => {
          return (
            <View
              key={item}
              style={{
                flex: 1,
                backgroundColor:
                  selected === item ? colors.primary : colors.white,
              }}
            >
              <Button
                onPress={() => {
                  setSelected(item);
                  setSwitchToFavouritesTab(tabs[item].includes("favoritos"));
                }}
                textColor={selected === item ? colors.white : colors.primary}
              >
                {tabs[item]}
              </Button>
            </View>
          );
        })}
      </Row>
      {!switchToFavouritesTab && (
        <PublicationListScreen publicationList={publicationList} />
      )}

      {switchToFavouritesTab && (
        <PublicationListScreen publicationList={favoritesList} />
      )}
    </View>
  );
};

export const ProfileTabsScreen = (props) => {
  return <RenderTabs isSelf={props.isSelf} />;
};
