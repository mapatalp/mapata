import React, { useState, useEffect } from "react";
import { Dimensions, Image, View, Pressable } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Toast from "react-native-toast-message";

const CarouselCustom = () => {
  const width = Dimensions.get("window").width;
  let [data, setData] = useState([
    "https://unoarrecifes.com/wp-content/uploads/2015/07/Refugio-Municipal-de-Animales-Tana.jpg",
    "https://www.importancia.org/wp-content/uploads/social-de-los/Refugio-Animales-ABANDONO-CACHORROS.jpg",
    "https://i.ytimg.com/vi/X7N_Ow8RP18/maxresdefault.jpg",
  ]);

  useEffect(() => {
    if (data.length < 5 && !data.includes("uploadData")) {
      setData([...data, "uploadData"]);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        width={width}
        height={width / 1.5}
        data={data}
        scrollAnimationDuration={2000}
        onSnapToItem={(index) => {}}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            {item === "uploadData" ? (
              <Pressable
                onPress={() =>
                  Toast.show({
                    type: "info",
                    position: "bottom",
                    text1: "Apretaste el subir imagen",
                  })
                }
              >
                <Image
                  source={{
                    uri: "https://t3.ftcdn.net/jpg/02/18/21/86/360_F_218218632_jF6XAkcrlBjv1mAg9Ow0UBMLBaJrhygH.jpg",
                  }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode={"contain"}
                />
              </Pressable>
            ) : (
              <Image
                source={{ uri: item }}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default CarouselCustom;
