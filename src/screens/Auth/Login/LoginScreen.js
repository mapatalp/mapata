import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { useFormik } from "formik";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import {
  Button,
  Loading,
  TextInput,
  Text,
  Row,
  ScreenWithInputs,
} from "../../../components";
import { LogoMapata } from "../../../components/Svg";

import ROUTES from "../../../constants/routes";
import { initialValues, validationSchema } from "./LoginScreen.data";
import useAuth from "../../../customHooks/useAuth";

WebBrowser.maybeCompleteAuthSession();
const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "638375278193-4k2ga7feiga0gks9c64m8rjqj9jpe7mu.apps.googleusercontent.com",
  });
  const { handleResponse, loginWithEmailAndPassword } = useAuth();

  useEffect(() => {
    handleResponse({ response, method: "google" });
  }, [request]);

  const {
    handleSubmit,
    isSubmitting,
    values,
    setFieldValue,
    errors,
    handleChange,
  } = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: true,
    onSubmit: async (values) => {
      await loginWithEmailAndPassword({
        email: values.email,
        password: values.password,
      }).then(() => navigate(ROUTES.STACK.HOME));
    },
  });

  return (
    <>
      {loading && <Loading show />}
      <ScreenWithInputs>
        <View>
          <Row justifyContent="center">
            <LogoMapata />
          </Row>
          <Button
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          >
            Login con Google
          </Button>
          <TextInput
            label={"Email"}
            value={values.email}
            error={errors.email}
            returnKeyType={"next"}
            onChangeText={(email) => setFieldValue("email", email)}
          />
          <TextInput
            label={"Contraseña"}
            value={values.password}
            error={errors.password}
            onChangeText={(password) => setFieldValue("password", password)}
          />
          <Button onPress={handleSubmit} disabled={isSubmitting}>
            Continuar
          </Button>
          <Button onPress={() => navigate(ROUTES.SCREEN.REGISTER)}>
            Go to Register
          </Button>
        </View>
      </ScreenWithInputs>
    </>
  );
};

export default LoginScreen;
