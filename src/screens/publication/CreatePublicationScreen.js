import React, { useState, useEffect } from "react";
import { View, Modal, StyleSheet, Text, Pressable } from "react-native";
import { useFormik } from "formik";
import {
  initialValues,
  validationSchema,
} from "./CreatePublicationScreen.data";

import {
  Row,
  Column,
  ScreenWithInputs,
  TextInput,
  SelectInput,
  ImagePicker,
  Button,
} from "../../components";
import * as Location from "expo-location";
import { createPublication } from "../../firebase/methods/publication";
import { useTheme } from "react-native-paper";
import MapView from "react-native-maps";
import Toast from "react-native-toast-message";

const CreatePublicationScreen = () => {
  const [showModalMap, setShowModalMap] = useState(false);
  const { colors } = useTheme();

  const { values, errors, setFieldValue, isSubmitting, handleSubmit } =
    useFormik({
      initialValues: initialValues(),
      validationSchema: validationSchema(),
      validateOnChange: true,
      onSubmit: async (values) => {
        try {
          await createPublication(values);
        } catch (error) {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Complete los campos obligatorios",
          });
        }
      },
    });

  const [location, setLocation] = useState({
    latitude: 0.001,
    longitude: 0.001,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Toast.show({
          type: "info",
          position: "bottom",
          text1: "Tienes que ir a ajustes de la app y activar la localización",
        });
        return;
      }

      const locationTemp = await Location.getCurrentPositionAsync({});

      setLocation({
        latitude: locationTemp.coords.latitude,
        longitude: locationTemp.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    })();
  }, []);

  const saveLocation = () => {
    setFieldValue("location", location);
    setShowModalMap(false);
  };

  const ModalWithMap = () => {
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
              <Button
                style={{
                  borderBottomColor: colors.black,
                  borderWidth: 1,
                  borderRadius: 0,
                  width: "100%",
                }}
                textColor={colors.black}
                onPress={saveLocation}
              >
                Guardar
              </Button>
              <Button
                style={{
                  borderWidth: 1,
                  borderRadius: 0,
                }}
                textColor={colors.black}
                onPress={() => setShowModalMap(false)}
              >
                Cerrar
              </Button>

              <MapView
                initialRegion={location}
                showsUserLocation={true}
                style={{ width: 300, height: 400 }}
              >
                <MapView.Marker draggable coordinate={location} />
              </MapView>

              <Row>
                <Column>
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text style={styles.textStyle}>Show Modal</Text>
                  </Pressable>
                </Column>
                <Column>
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text style={styles.textStyle}>Show Modal</Text>
                  </Pressable>
                </Column>
              </Row>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <ScreenWithInputs>
      <Row>
        <ImagePicker />
      </Row>
      <Row>
        <Column additionalStyles={{ width: "100%" }}>
          <TextInput
            error={errors.title}
            placeholder="Título"
            value={values.title}
            onChangeText={(title) => setFieldValue("title", title)}
          />
        </Column>
      </Row>
      <Row>
        <SelectInput
          data={["Hembra", "Macho"]}
          onSelect={(selectedItem, index) => {
            setFieldValue("gender", selectedItem);
          }}
          value={values.gender}
          defaultButtonText="Sexo"
          error={!!errors.gender}
        />
      </Row>
      <Row>
        <SelectInput
          buttonStyle={{ width: "100%" }}
          data={["Joven", "Viejo"]}
          onSelect={(selectedItem, index) => {
            setFieldValue("age", selectedItem);
          }}
          value={values.age}
          defaultButtonText="Edad"
          error={!!errors.age}
        />
      </Row>
      <Row>
        <SelectInput
          buttonStyle={{ width: "100%" }}
          data={["Lo perdí", "En tránsito", "En la calle"]}
          onSelect={(selectedItem, index) => {
            setFieldValue("state", selectedItem);
          }}
          value={values.state}
          defaultButtonText="Estado"
          error={!!errors.state}
        />
      </Row>
      <Row additionalStyles={{ width: "100%" }}>
        <SelectInput
          buttonStyle={{ width: "100%" }}
          data={["Perro", "Gato", "Otro"]}
          onSelect={(selectedItem, index) => {
            setFieldValue("animal", selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          defaultButtonText="Tipo de animal"
          value={values.animal}
          error={!!errors.animal}
        />
      </Row>
      <Row>
        <Column additionalStyles={{ width: "100%" }}>
          <TextInput
            error={errors.description}
            placeholder="Descripción"
            value={values.description}
            onChangeText={(title) => setFieldValue("description", title)}
            multiline
            numberOfLines={4}
          />
        </Column>
      </Row>
      <Button
        style={{
          backgroundColor: colors.blue,
          borderRadius: 10,
          marginTop: 10,
        }}
        onPress={() => {
          setShowModalMap(true);
        }}
        disabled={isSubmitting}
        textColor={colors.white}
      >
        Elegir ubicación
      </Button>

      <Button
        style={{
          marginBottom: 50,
          backgroundColor: colors.primary,
          borderRadius: 10,
          marginTop: 10,
        }}
        onPress={handleSubmit}
        disabled={isSubmitting}
        textColor={colors.white}
      >
        Crear publicación
      </Button>

      {/**Este es el modal del maopa para elgir la ubicación*/}

      <ModalWithMap />
    </ScreenWithInputs>
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
export default CreatePublicationScreen;
