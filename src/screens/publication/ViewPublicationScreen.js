import React, { useState, useEffect } from "react";
import { View, Image, ScrollView, Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";

import { getButtonTextByPublicationState } from "../../utils/PublicationHelper";

import {
  DescriptionCard,
  PublicationDatosCard,
  Button,
  PublicationActionsDialog,
  PublicationOwnerActionsDialog,
  PublicationUserInfoDialog,
  Row,
} from "../../components";

import { getMockedProfile } from "../../utils/ProfileHelper";
import CONSTANTS from "../../constants/constants";
import { store } from "../../redux";
import ROUTES from "../../constants/routes";
import { getUserByID } from "../../firebase/methods/user";

const ViewPublicationScreen = ({ route, navigation }) => {
  const { publication } = route.params;
  const { user } = store.getState();
  const { colors } = useTheme();
  let isAdopted = publication.adopterId != null;
  let profile = getMockedProfile();
  let isOwner = user.data.id === publication.userId;
  let isPerdido = publication.state === "Lo perdí";
  let buttonText = getButtonTextByPublicationState(publication.state, isOwner);

  const [actionsVisible, setActionsVisible] = useState(false);
  const [ownerActionsVisible, setTransitanteActionsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [publicanteInfo, setPublicanteInfo] = useState();

  useEffect(() => {
    const getPublicanteInfo = async () => {
      let publicanteInfo = await getUserByID(publication.userId);
      setPublicanteInfo(publicanteInfo);
    };

    if (publication.userId) {
      getPublicanteInfo();
    }
  }, [publication]);
  return (
    <View style={{ margin: 10 }}>
      <PublicationActionsDialog
        visible={actionsVisible}
        hideDialog={() => setActionsVisible(false)}
        publication={publication}
        colors={colors}
      />
      <PublicationOwnerActionsDialog
        visible={ownerActionsVisible}
        hideDialog={() => setTransitanteActionsVisible(false)}
        publication={publication}
        colors={colors}
      />
      <PublicationUserInfoDialog
        visible={contactVisible}
        hideDialog={() => setContactVisible(false)}
        colors={colors}
        socialMediaList={
          publicanteInfo
            ? [
                publicanteInfo.facebook,
                publicanteInfo.instagram,
                publicanteInfo.whatsapp,
              ]
            : []
        }
        isPerdido={isPerdido}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: publication.image }}
          style={{ height: 220, borderRadius: 10 }}
        ></Image>
        <TouchableOpacity
          onPress={() => {
            setContactVisible(true);
          }}
        >
          <Row alignItems="center" additionalStyles={{ marginTop: 10 }}>
            <Image
              source={{ uri: CONSTANTS.ICON_INFO }}
              style={{ width: 40, height: 40, margin: 10 }}
            />
            <Text>Información de contacto</Text>
          </Row>
        </TouchableOpacity>
        <DescriptionCard text={publication.description} />
        <PublicationDatosCard publication={publication} />
        {!isAdopted && (
          <Button
            style={{
              marginTop: 10,
              backgroundColor: colors.white,
              borderColor: colors.primary,
              borderRadius: 10,
              marginTop: 20,
              borderWidth: 1,
              opacity: 0.9,
            }}
            labelStyle={{ color: colors.primary }}
            onPress={() =>
              publication.state === "En tránsito"
                ? isOwner
                  ? setTransitanteActionsVisible(true)
                  : setContactVisible(true)
                : isPerdido
                ? setContactVisible(true)
                : setActionsVisible(true)
            }
          >
            {buttonText}
          </Button>
        )}
        {isOwner && (
          <Button
            style={{
              marginBottom: 150,
              backgroundColor: colors.primary,
              borderRadius: 10,
              marginTop: 10,
            }}
            onPress={() => {
              navigation.navigate(ROUTES.SCREEN.CREATE_PUBLICATION, {
                publication,
              });
            }}
            textColor={colors.white}
          >
            Editar publicación
          </Button>
        )}
      </ScrollView>
    </View>
  );
};

export default ViewPublicationScreen;
