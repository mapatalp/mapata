import React from "react";
import Button from "../Button/Button";
import Row from "../Grid/Row";
import { Dialog, Portal } from "react-native-paper";
import { View } from "react-native";
import { editPublication } from "../../firebase/methods/publication";

const PublicationOwnerActionsDialog = ({
  visible,
  hideDialog,
  colors,
  publication,
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
            <Dialog.Title>¿Qué desea hacer?</Dialog.Title>
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
            <Button
              style={{
                borderRadius: 5,
                marginBottom: 2,
                backgroundColor: "rgba(255,255,255,.1)",
              }}
              labelStyle={{ color: "#666666", fontSize: 15 }}
              onPress={() => {
                adoptPublicationState(publication, publication.userId);
              }}
            >
              Lo quiero adoptar
            </Button>
            <Button
              style={{
                borderRadius: 5,
                backgroundColor: "rgba(255,255,255,.1)",
              }}
              labelStyle={{ color: "#666666", fontSize: 15 }}
              onPress={() => {
                adoptPublicationState(publication, "UnkownAdopterId"); //TODO buscar usuario? escribirlo a mano?
              }}
            >
              Me contactaron y lo han adoptado
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

function adoptPublicationState(publication, adopterId) {
  let newPublication = {
    ...publication,
  };
  newPublication.state = "Adoptado";
  newPublication.adopterId = adopterId;
  editPublication(newPublication, newPublication.userId);
}

export default PublicationOwnerActionsDialog;
