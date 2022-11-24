import React from "react";
import Button from "../../components/Button/Button";
import { Dialog, Portal } from "react-native-paper";
import { View } from "react-native";

const PublicationActionsDialog = ({ visible, hideDialog, colors }) => {
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>¿Qué desea hacer?</Dialog.Title>
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
            <Button
              labelStyle={{ color: colors.primary, fontSize: 15 }}
              onPress={() => {}}
            >
              Quiero transitar
            </Button>
            <Button
              labelStyle={{ color: colors.primary, fontSize: 15 }}
              onPress={() => {}}
            >
              Quiero adoptar
            </Button>
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

export default PublicationActionsDialog;
