import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { useFormik } from "formik";
import { useTheme } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import {
  Button,
  Loading,
  TextInput,
  Text,
  Row,
  Divider,
  ScreenWithInputs,
} from "../../../components";
import { LogoMapata } from "../../../components/Svg";

import ROUTES from "../../../constants/routes";
import { initialValues, validationSchema } from "./RegisterScreen.data";
import useAuth from "../../../customHooks/useAuth";
import { createUser, getUserByUID } from "../../../firebase/methods/user";
import { store } from "../../../redux";
import { setUser } from "../../../redux/slice/user";

WebBrowser.maybeCompleteAuthSession();
const RegisterScreen = () => {
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();
  const { colors } = useTheme();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "638375278193-4k2ga7feiga0gks9c64m8rjqj9jpe7mu.apps.googleusercontent.com",
  });
  const { googleAuthentication } = useAuth();

  useEffect(() => {
    async function prepare() {
      setLoading(true);
      if (response?.type === "success") {
        setLoading(false);
        await googleAuthentication({
          id_token: response.params.id_token,
        }).then(async (googleData) => {
          const {
            user: { uid },
            _tokenResponse: { isNewUser, email },
          } = googleData;

          if (isNewUser) {
            await createUser({
              email,
              username: email,
              uid,
            });
          } else {
            const user = await getUserByUID(uid);
            // lo guardo en el store
            store.dispatch(setUser(user));
          }
        });
      }
      setLoading(false);
    }
    prepare();
  }, [response]);

  const {
    handleSubmit,
    isSubmitting,
    setSubmitting,
    values,
    setFieldValue,
    errors,
  } = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: true,
    onSubmit: (values) => {
      navigate(ROUTES.SCREEN.REGISTER_PASSWORD, {
        username: values.username.trim().toLocaleLowerCase(),
        email: values.email.trim().toLocaleLowerCase(),
      });
      setSubmitting(false);
    },
  });

  return (
    <>
      {loading && <Loading show />}
      <ScreenWithInputs>
        <View style={{ marginVertical: "10%" }}>
          <Row justifyContent="center" alignItems="center">
            <LogoMapata />
          </Row>
        </View>

        <View style={{ minHeight: 180 }}>
          <Row justifyContent="center" additionalStyles={{ marginBottom: 22 }}>
            <Text variant="displaySmall">Registrate</Text>
          </Row>
          <Row justifyContent="center">
            <Text
              onPress={() => {}}
              numberOfLines={1}
              style={{ color: "#005390" }}
              lineBreakMode={"tail"}
              variant={"titleSmall"}
            >
              Si sos un refugio hace click acá
            </Text>
          </Row>

          <Button
            style={{
              backgroundColor: colors.google,
              borderRadius: 10,
              marginTop: 10,
            }}
            textColor={colors.white}
            disabled={!request || isSubmitting}
            onPress={() => {
              promptAsync();
            }}
            icon="google"
          >
            Registrate con Google
          </Button>

          <Divider />
        </View>

        <TextInput
          label={"Username"}
          value={values.username}
          error={errors.username}
          returnKeyType={"next"}
          onChangeText={(username) => setFieldValue("username", username)}
        />

        <TextInput
          style={{
            marginTop: 8,
          }}
          label={"Email"}
          value={values.email}
          error={errors.email}
          textContentType={"emailAddress"}
          returnKeyType={"next"}
          onChangeText={(email) => setFieldValue("email", email)}
        />

        <TextInput
          style={{
            marginTop: 8,
          }}
          label={"Repetí tu email"}
          value={values.emailConfirmation}
          error={errors.emailConfirmation}
          textContentType={"emailAddress"}
          returnKeyType={"next"}
          onChangeText={(email) => setFieldValue("emailConfirmation", email)}
        />

        <Button
          style={{
            backgroundColor: colors.primary,
            borderRadius: 10,
            marginTop: 10,
          }}
          textColor={colors.white}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          Continuar
        </Button>
        <Row justifyContent="flex-start" additionalStyles={{ marginTop: 8 }}>
          <Text>¿Ya tenés cuenta?</Text>
          <Text
            style={{ fontWeight: "bold" }}
            onPress={() => navigate(ROUTES.SCREEN.LOGIN)}
          >
            {" "}
            Inicia Sesión
          </Text>
        </Row>
      </ScreenWithInputs>
    </>
  );
};

export default RegisterScreen;
