import React from "react";
import { Dialog, Portal } from "react-native-paper";
import { View } from "react-native";

import Button from "../../components/Button/Button";
import SocialButton from "../../components/Button/SocialButton";
import Row from "../../components/Grid/Row";

const PublicationUserInfoDialog = ({
  visible,
  hideDialog,
  colors,
  socialMediaList,
}) => {
  return (
    <View>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{ borderRadius: 30 }}
        >
          <Row justifyContent="center">
            <Dialog.Title>Contacto del transitante</Dialog.Title>
          </Row>
          <Dialog.Content>
            <View
              style={{
                backgroundColor: "#000",
                opacity: 0.2,
                height: 1,
                width: "70%",
                alignSelf: "center",
              }}
            />
            <Row
              additionalStyles={{
                marginTop: 20,
                alignSelf: "center",
                marginBottom: 15,
              }}
            >
              {socialMediaList.map((item, index) => {
                return <SocialButton key={"item-" + index} socialUrl={item} />;
              })}
            </Row>
            <View
              style={{
                backgroundColor: "#000",
                opacity: 0.2,
                height: 1,
                width: "70%",
                alignSelf: "center",
              }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Row additionalStyles={{ width: "100%" }} justifyContent="center">
              <Button onPress={hideDialog} labelStyle={{ color: "#666" }}>
                Cancelar
              </Button>
              <Button
                onPress={hideDialog}
                style={{
                  backgroundColor: colors.white,
                  borderColor: colors.primary,
                  borderWidth: 1,
                  opacity: 0.9,
                }}
                labelStyle={{ color: colors.primary }}
              >
                Aceptar
              </Button>
            </Row>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default PublicationUserInfoDialog;
