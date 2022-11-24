import React, { useState, useEffect } from "react";
import { View, Modal, StyleSheet } from "react-native";
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
import {
  createPublication,
  editPublication,
} from "../../firebase/methods/publication";
import { useTheme } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import Toast from "react-native-toast-message";
import ROUTES from "../../constants/routes";
import { store } from "../../redux";

const CreatePublicationScreen = ({ route, navigation }) => {
  const [showModalMap, setShowModalMap] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { colors } = useTheme();
  const { user } = store.getState();

  const {
    values,
    errors,
    setFieldValue,
    isSubmitting,
    handleSubmit,
    validateForm,
  } = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        (await isEditing)
          ? editPublication(values, user.data.id)
          : createPublication(values, user.data.id);
        Toast.show({
          type: "success",
          position: "bottom",
          text1: isEditing
            ? "Publicación actualizada con éxito"
            : "Publicación creada con éxito",
        });
        setTimeout(() => {
          navigation.navigate(ROUTES.SCREEN.HOME);
        }, 1000);
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Hubo un error al crear la publicación",
        });
      }
    },
  });

  const [location, setLocation] = useState({
    latitude: 0.001,
    longitude: 0.001,
  });

  const setActualLocation = async () => {
    let locationTemp = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: locationTemp.coords.latitude,
      longitude: locationTemp.coords.longitude,
    });
    return location;
  };

  useEffect(() => {
    if (route.params?.publication && Object.keys(route.params?.publication).length > 0) {
      let publi = route.params?.publication;
      setIsEditing(true);

      //Seteo la info de la publicación
      setLocation({
        latitude: publi.location.latitude,
        longitude: publi.location.longitude,
      });
      setFieldValue("location", {
        latitude: publi.location.latitude,
        longitude: publi.location.longitude,
      });
      setFieldValue("image", publi.image);
      setFieldValue("id", publi.id);
      setFieldValue("title", publi.title);
      setFieldValue("gender", publi.gender);
      setFieldValue("age", publi.age);
      setFieldValue("state", publi.state);
      setFieldValue("animal", publi.animal);
      setFieldValue("description", publi.description);
    } else {
      setActualLocation();
    }
  }, [route.params]);

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
    })();
  }, []);

  const submitForm = async () => {
    let validate = await validateForm();

    if (Object.keys(validate).length === 0) {
      handleSubmit();
    } else if (validate.image) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Debe subir una imagen",
      });
    } else if (validate.location) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Debe elegir una ubicación",
      });
    } else
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Debe completar los campos obligatorios",
      });
  };

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
              <MapView
                initialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                }}
                style={{ width: 300, height: 400 }}
              >
                <Marker
                  draggable
                  coordinate={location}
                  onDragEnd={(direction) => {
                    setLocation(direction.nativeEvent.coordinate);
                  }}
                />
              </MapView>

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
                    onPress={saveLocation}
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

  return (
    <ScreenWithInputs>
      <Row>
        <ImagePicker
          setFieldValue={(url) => setFieldValue("image", url)}
          defaultImage={
            route.params?.publication && route.params?.publication.image
          }
        />
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
          defaultValue={values.gender}
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
          defaultValue={values.age}
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
          defaultValue={values.state}
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
        textColor={colors.white}
      >
        Elegir ubicación
      </Button>

      <Button
        style={{
          marginBottom: 150,
          backgroundColor: colors.primary,
          borderRadius: 10,
          marginTop: 10,
        }}
        onPress={submitForm}
        textColor={colors.white}
      >
        {isEditing ? "Guardar publicación" : "Crear publicación"}
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
