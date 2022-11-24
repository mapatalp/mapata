import React, { useState } from "react";
import {
  DescriptionCard,
  PublicationDatosCard,
  Button,
} from "../../components";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme, Provider } from "react-native-paper";
import { getButtonTextByPublicationState } from "../../utils/PublicationHelper";
import { View, Image } from "react-native";
import {
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
    <Provider>
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
        <ScrollView>
          <Image
            source={{ uri: publication.imageUrl }}
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
    </Provider>
  );
};

export default ViewPublicationScreen;
