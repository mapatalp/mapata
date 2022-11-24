import React, { useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { PublicationCard, Row, Text } from "../../components";

import ROUTES from "../../constants/routes";
import { store } from "../../redux";

const PublicationListScreen = ({ favorites = false }) => {
  const { navigate } = useNavigation();

  const onPress = (publication) =>
    navigate(ROUTES.SCREEN.VIEW_PUBLICATION, {
      publication,
    });

  const { user } = store.getState();

  const publicationList = favorites ? user.favorites : user.ownPublications;

  return (
    <View style={{ width: "100%", padding: 10 }}>
      {publicationList && publicationList.length > 0 ? (
        publicationList.map((item, index) => (
          <PublicationCard
            publication={item}
            key={"key-publication-" + index}
            onPress={() => onPress(item)}
          />
        ))
      ) : (
        <Row
          justifyContent="center"
          additionalStyles={{
            marginTop: 20,
          }}
        >
          <Text>
            {favorites
              ? "¡Todavía no tenés favoritos!"
              : "¡Todavía no tenés publicaciones!"}
          </Text>
        </Row>
      )}
    </View>
  );
};

export default PublicationListScreen;
