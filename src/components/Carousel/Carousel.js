import React, { useState, useEffect } from "react";
import { Dimensions, Image, View, Pressable } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Toast from "react-native-toast-message";
import ImagePicker from "../ImagePicker/ImagePicker";

const CarouselCustom = ({ data, isSelf, setImage }) => {
  const width = Dimensions.get("window").width;

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
            {item === "uploadData" && isSelf ? (
              <ImagePicker setFieldValue={(url) => setImage(url)} fromPerfil={true}/>
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
