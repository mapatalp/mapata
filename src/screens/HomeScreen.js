import React from "react";
import { View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ height: "100%", width: "100%" }}
      ></MapView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
