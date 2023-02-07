import { View, Image } from "react-native";
import { Text, Row, Column } from "../../../components";
import React, { useEffect, useState } from "react";

const RegisterSuccessScreen = () => {
  const [imageUrl, setImageUrl] = useState(false);

  useEffect(() => {
    //TODO borrar
    const getImage = async () => {
      const url = await fetchRandomProfileImage();
      setImageUrl(url);
    };

    getImage();
  }, []);

  const fetchRandomProfileImage = async () => {
    var defaultIconUrl =
      "https://cdn-icons-png.flaticon.com/512/616/616408.png";
    return defaultIconUrl;
  };
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, marginTop: 50 }} justifyContent="center">
        <Text style={{ fontSize: 26 }}>Listo!</Text>
      </View>

      <View style={{ flex: 1 }} justifyContent="center">
        <View>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Sign-check-icon.png",
            }}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </View>

      <View
        style={{ flex: 2, marginBottom: 100, marginHorizontal: 20 }}
        justifyContent="center"
      >
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          ¡Nos contactaremos con vos lo antes posible vía mail! {"\n\n"} Gracias
          por la espera.
        </Text>
      </View>
    </View>
  );
};

export default RegisterSuccessScreen;
