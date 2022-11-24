import React from "react";
import { Button } from "../../components";
import { Dialog, Portal } from "react-native-paper";
import { View } from "react-native";
import { SocialButton, Row } from "../../components";
/**
 * @param {import("react-native-paper").PublicationUserInfoDialogProps} props
 */
const PublicationUserInfoDialog = ({
  visible,
  hideDialog,
  colors,
  socialMediaList,
}) => {
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Contacto del transitante</Dialog.Title>
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
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default PublicationUserInfoDialog;
