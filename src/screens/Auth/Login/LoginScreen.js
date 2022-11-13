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

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((result) => {
          console.log(
            "🚀 ~ file: LoginScreen.js ~ line 64 ~ .then ~ result",
            result
          );

          Toast.show({
            type: "success",
            text1: "Sesión iniciada",
            position: "bottom",
          });

          // navigate(ROUTES.STACK.HOME);
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
    }
  }, [response]);

  const { errors, handleSubmit, setFieldValue, isSubmitting } = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
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
        <Button onPress={handleSubmit}>Submit Email & Pw</Button>
      </View>
    </>
  );
};

export default LoginScreen;
