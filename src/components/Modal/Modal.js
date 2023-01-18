import React from "react";
import { View, Modal, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import Row from "../../components/Grid/Row";
import Column from "../../components/Grid/Column";
import Button from "../../components/Button/Button";

/**
 * @param {{
 * showModalMap: boolean,
 * setShowModalMap: Function,
 * onPress: onPress
 * }} props
 */
const ModalMapata = ({ children, showModalMap, setShowModalMap, onPress }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          showModalMap(false);
        }}
        visible={showModalMap}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {children}
            <Row>
              <Column>
                <Button
                  style={{
                    borderWidth: 1,
                    width: 100,
                    borderColor: colors.primary,
                    marginRight: 10,
                    marginTop: 20,
                  }}
                  textColor={colors.white}
                  buttonColor={colors.primary}
                  onPress={onPress}
                >
                  Guardar
                </Button>
              </Column>
              <Column>
                <Button
                  style={{
                    borderWidth: 1,
                    width: 100,
                    borderColor: colors.grey,
                    marginTop: 20,
                  }}
                  textColor={colors.white}
                  buttonColor={colors.grey}
                  onPress={() => setShowModalMap(false)}
                >
                  Cerrar
                </Button>
              </Column>
            </Row>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});
export default ModalMapata;
