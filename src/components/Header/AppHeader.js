import React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";

const AppHeader = ({ title }) => {
  return (
    <Appbar.Header style={styles.header} mode={"center-aligned"}>
      <Appbar.Action icon="menu" onPress={() => {}} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#D34E6E",
  },
});

export default AppHeader;
