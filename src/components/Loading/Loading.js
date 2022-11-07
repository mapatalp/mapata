import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";

const Loading = ({ show, text }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: colors.primary,
      textTransform: "uppercase",
      marginTop: 10,
    },
  });

  if (!show) return null;

  return (
    <View style={styles.content}>
      <ActivityIndicator animating={true} size="large" color={colors.primary} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

export default Loading;
