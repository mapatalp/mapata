import React, { useState } from "react";
import { useTheme } from "react-native-paper";
import { View } from "react-native";
import PublicationListScreen from "./PublicationListScreen";
import { Row, Button } from "../../components";
import {
  getMockedPublicationList,
  getMockedFavoritesList,
} from "../../utils/PublicationHelper";

// TODO aplicar validacion al isSelf
const RenderTabs = ({ isSelf }) => {
  const { colors } = useTheme();
  const [switchToFavouritesTab, setSwitchToFavouritesTab] = useState(false);
  const [selected, setSelected] = useState(0);
  let tabs = isSelf ? ["Publicaciones", "Mis favoritos"] : ["Publicaciones"];

  return (
    <View>
      <Row
        additionalStyles={{
          width: "100%",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        {[...Array(tabs.length).keys()].map((item, index) => {
          return (
            <View
              key={"key-tab-" + index}
              style={{
                flex: 1,
                backgroundColor:
                  selected === item ? colors.primary : colors.white,
              }}
            >
              <Button
                onPress={() => {
                  setSelected(item);
                  setSwitchToFavouritesTab(isSelf && item === 1);
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
        <PublicationListScreen publicationList={getMockedPublicationList()} />
      )}

      {switchToFavouritesTab && (
        <PublicationListScreen publicationList={getMockedFavoritesList()} />
      )}
    </View>
  );
};

export const ProfileTabsScreen = ({ isSelf }) => {
  return <RenderTabs isSelf={isSelf} />;
};
