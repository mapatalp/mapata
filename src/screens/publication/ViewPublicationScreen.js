import React, { useState } from "react";
import { View, Image, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";

import { getButtonTextByPublicationState } from "../../utils/PublicationHelper";

import {
  DescriptionCard,
  PublicationDatosCard,
  Button,
  PublicationActionsDialog,
  PublicationUserInfoDialog,
} from "../../components";

import { getMockedProfile } from "../../utils/ProfileHelper";
import CONSTANTS from "../../constants/constants";

const ViewPublicationScreen = ({ route }) => {
  const { publication } = route.params;
  const { colors } = useTheme();
  let profile = getMockedProfile();
  let buttonText = getButtonTextByPublicationState(publication.state);

  const [actionsVisible, setActionsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  return (
    <View style={{ margin: 10 }}>
      <PublicationActionsDialog
        visible={actionsVisible}
        hideDialog={() => setActionsVisible(false)}
        colors={colors}
      />
      <PublicationUserInfoDialog
        visible={contactVisible}
        hideDialog={() => setContactVisible(false)}
        colors={colors}
        socialMediaList={profile.socialMediaList}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: publication.image }}
          style={{ height: 220, borderRadius: 10 }}
        ></Image>
        <DescriptionCard text={publication.description} />
        <PublicationDatosCard publication={publication} />
        <Button
          style={{
            backgroundColor: colors.white,
            borderColor: colors.primary,
            borderWidth: 1,
            opacity: 0.9,
          }}
          labelStyle={{ color: colors.primary }}
          onPress={() =>
            publication.state === CONSTANTS.PUBLICATION_STATES.TRANSITO
              ? setContactVisible(true)
              : setActionsVisible(true)
          }
        >
          {buttonText}
        </Button>
      </ScrollView>
    </View>
  );
};

export default ViewPublicationScreen;
