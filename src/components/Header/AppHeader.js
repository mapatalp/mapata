import React from "react";
import { Appbar, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const AppHeader = ({ title }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    header: {
      backgroundColor: colors.primary,
    },
  });

  return (
    <Appbar.Header style={styles.header} mode={"center-aligned"}>
      <Appbar.Action
        icon="menu"
        color={colors.white}
        onPress={() => {
          navigation.dispatch(DrawerActions.toggleDrawer());
        }}
      />
      <Appbar.Content title={title} color={colors.white} />
    </Appbar.Header>
  );
};

export default AppHeader;
