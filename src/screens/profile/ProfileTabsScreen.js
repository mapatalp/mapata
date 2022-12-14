import React, { useState, useEffect } from "react";
import { useTheme } from "react-native-paper";
import { View } from "react-native";
import PublicationListScreen from "./PublicationListScreen";
import { Row, Button } from "../../components";

const ProfileTabsScreen = ({ isSelf }) => {
  const { colors } = useTheme();
  const [switchToFavouritesTab, setSwitchToFavouritesTab] = useState(false);
  const [selected, setSelected] = useState(0);
  isSelf = false; //Lo deshabilitaremos para la presentación del proyecto, no entraba en el alcance
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
      <PublicationListScreen favorites={switchToFavouritesTab} />
    </View>
  );
};

export default ProfileTabsScreen;
