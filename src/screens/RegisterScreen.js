import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Button } from "../components";
import ROUTES from "../constants/routes";

const RegisterScreen = () => {
  const { navigate } = useNavigation();
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Text style={{ alignSelf: "center" }}>Register screen</Text>
      <Button onPress={() => navigate(ROUTES.SCREEN.LOGIN)}>Go to Login</Button>
    </View>
  );
};

export default RegisterScreen;
