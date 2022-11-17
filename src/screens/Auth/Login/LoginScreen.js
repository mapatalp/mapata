import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useFormik } from "formik";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";

import { Button, Loading, TextInput, Text } from "../../../components";

import ROUTES from "../../../constants/routes";
import { initialValues, validationSchema } from "./LoginScreen.data";
import { auth } from "../../../firebase/config";
import useAuth from "../../../customHooks/useAuth";

WebBrowser.maybeCompleteAuthSession();
const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { navigate } = useNavigation();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "638375278193-4k2ga7feiga0gks9c64m8rjqj9jpe7mu.apps.googleusercontent.com",
  });
  const { handleResponse } = useAuth();

  useEffect(() => {
    handleResponse({ response, method: "google" });
  }, [request]);

  const { errors, handleSubmit, setFieldValue, isSubmitting } = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: true,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

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

        <Button
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        >
          Login con Google
        </Button>

        <Button onPress={() => navigate(ROUTES.SCREEN.REGISTER)}>
          Go to Register
        </Button>
        <Button onPress={handleSubmit} disabled={isSubmitting}>
          Submit Email & Pw
        </Button>
      </View>
    </>
  );
};

export default LoginScreen;
