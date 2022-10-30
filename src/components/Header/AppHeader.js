import React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const AppHeader = ({ title }) => {
  return (
    <Appbar.Header style={styles.header} mode={"center-aligned"}>
      <Appbar.Action icon="menu" color={COLORS.WHITE} onPress={() => {}} />
      <Appbar.Content title={title} color={COLORS.WHITE} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.PRIMARY,
  },
});

export default AppHeader;
