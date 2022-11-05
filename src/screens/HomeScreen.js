import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const HomeScreen = () => {
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "pink" }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ height: "100%", width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
