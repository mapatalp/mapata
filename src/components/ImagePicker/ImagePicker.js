import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, Pressable, Modal } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Portal, Provider } from "react-native-paper";

export default function ImagePickerExample() {
  const [image, setImage] = useState({
    uri: "",
    default: require("./ImageDefault.png"),
  });
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const pickImageGallery = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage({ ...image, uri: result.uri });
    }
  };

  const pickImageCamera = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage({ ...image, uri: result.uri });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Pressable onPress={showModal} style={{ width: "100%", height: 300 }}>
        <Image
          source={!!image.uri ? { uri: image.uri } : image.default}
          style={{ width: "100%", height: 300 }}
        />
      </Pressable>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Button
              title="Elegi una imagen de la galeria"
              onPress={pickImageGallery}
            />
            <Button
              title="Elegi una imagen de la camara"
              onPress={pickImageCamera}
            />
          </Modal>
        </Portal>
      </Provider>
    </View>
  );
}
