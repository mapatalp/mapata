import React from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import { Callout } from "react-native-maps";

/**
 * @param {import("react-native-paper").CustomMarkerWindowProps} props
 */
const CustomMarkerWindow = ({ publication, onPress, colors }) => {
  return (
    <Callout
      tooltip
      style={{
        backgroundColor: "rgba(0,0,0,0)",
        borderRadius: 10,
      }}
      onPress={onPress}
    >
      <View
        style={{
          borderRadius: 10,
          padding: 10,
          width: 200,
          backgroundColor: "rgba(255,83,83,.7)",
        }}
      >
        <Text
          style={{
            fontWeigth: "bold",
            fontSize: 17,
            alignSelf: "center",
            marginBottom: 5,
            color: colors.white,
          }}
        >
          {publication.title}
        </Text>
        <View style={{ borderRadius: 10 }}>
          <WebView
            style={{ height: 100, width: 200, borderRadius: 10 }}
            source={{ uri: publication.image }}
          />
        </View>
      </View>
    </Callout>
  );
};

export default CustomMarkerWindow;
