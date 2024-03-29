import React, { useState, useEffect } from "react";
import { Image, View, Pressable } from "react-native";
import * as ImagePickerExpo from "expo-image-picker";
import { Portal, Provider, Modal, useTheme } from "react-native-paper";
import Button from "../../components/Button/Button";

import useStorage from "../../customHooks/useStorage";
import Loading from "../Loading/Loading";

const ImagePicker = ({ setFieldValue, fromPerfil, defaultImage }) => {
  const [image, setImage] = useState({
    uri: "",
    default: require("./ImageDefault.png"),
  });
  const [visible, setVisible] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const { handleImagePicked } = useStorage();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const { colors } = useTheme();

  useEffect(() => {
    if (defaultImage) {
      setImage({ ...image, uri: defaultImage });
    }
  }, [defaultImage]);
  useEffect(() => {
    if (image.uri) {
      setFieldValue(image.uri);
      hideModal();
    }
  }, [image]);

  const pickImageGallery = async () => {
    // No permissions request is necessary for launching the image library
    let pickerResult = await ImagePickerExpo.launchImageLibraryAsync({
      mediaTypes: ImagePickerExpo.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    handleImagePicked(pickerResult, image, setImage, setUploading);
  };

  const pickImageCamera = async () => {
    // No permissions request is necessary for launching the image library
    let pickerResult = await ImagePickerExpo.launchCameraAsync({
      mediaTypes: ImagePickerExpo.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    handleImagePicked(pickerResult, image, setImage, setUploading);
  };

  return (
    <>
      {!uploading && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Pressable onPress={showModal} style={{ width: "100%", height: 300 }}>
            <Image
              source={
                !!image.uri && !fromPerfil ? { uri: image.uri } : image.default
              }
              style={{ width: "100%", height: 300 }}
            />
          </Pressable>
          <Provider>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={containerStyle}
                style={{
                  marginTop: -5,
                }}
              >
                <Button
                  style={{
                    borderBottomColor: colors.black,
                    borderWidth: 1,
                    borderRadius: 0,
                    marginBottom: 5,
                  }}
                  textColor={"black"}
                  onPress={pickImageGallery}
                >
                  Galería
                </Button>
                <Button
                  style={{
                    borderBottomColor: colors.black,
                    borderWidth: 1,
                    borderRadius: 0,
                    marginBottom: 5,
                  }}
                  textColor={colors.black}
                  onPress={pickImageCamera}
                >
                  Camara
                </Button>
                <Button onPress={hideModal} textColor={colors.black}>
                  Cerrar
                </Button>
              </Modal>
            </Portal>
          </Provider>
        </View>
      )}
      <Loading show={uploading} text={"Espere mientras se sube la imagen"} />
    </>
  );
};

export default ImagePicker;
