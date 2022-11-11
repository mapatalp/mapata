import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useFormik } from "formik";

import { Button, Loading, TextInput, Text } from "../../../components";

import ROUTES from "../../../constants/routes";
import AUTH_METHODS from "../../../constants/authMethods";

import { loginWithGoogle } from "../../../utils/authUtils";

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { navigate } = useNavigation();

  const { errors, handleSubmit, setFieldValue, isSubmitting } = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      await loginWithGoogle({ ...values })
        .then((result) => {
          console.log(
            "🚀 ~ file: LoginScreen.js ~ line 25 ~ onSubmit: ~ result",
            result
          );

          Toast.show({
            type: "sucess",
            text1: "Sesión iniciada",
          });

          navigate(ROUTES.SCREEN.HOME);
        })
        .catch((error) => {
          console.log(
            "🚀 ~ file: LoginScreen.js ~ line 51 ~ onSubmit: ~ error",
            error
          );

          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Ocurrió un error con Google",
          });
        });
    },
  });

  const submitForm = async (method) => {
    await setFieldValue("method", method);
    handleSubmit();
  };

  return (
    <>
      {loading && <Loading show />}
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text style={{ alignSelf: "center" }}>Login screen</Text>
        {/** Mapata logo image */}

        <TextInput />

        <Button onPress={() => navigate(ROUTES.SCREEN.REGISTER)} loading={true}>
          Go to Register
        </Button>
        <Button onPress={() => submitForm(AUTH_METHODS.EMAIL_AND_PASSWORD)}>
          Submit Email & Pw
        </Button>
        <Button onPress={() => submitForm(AUTH_METHODS.GOOGLE)}>
          Submit Google
        </Button>
      </View>
    </>
  );
};

export default LoginScreen;
