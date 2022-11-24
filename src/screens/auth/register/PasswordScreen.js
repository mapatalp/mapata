import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { useTheme } from "react-native-paper";
import Toast from "react-native-toast-message";
import { View } from "react-native";

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
import { initialValues, validationSchema } from "./PasswordScreen.data";
import useAuth from "../../../customHooks/useAuth";
import { createUser } from "../../../firebase/methods/user";

const PasswordScreen = ({ route }) => {
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const { email, username } = route.params;

  const { registerWithEmailAndPassword } = useAuth();

  const { handleSubmit, isSubmitting, values, setFieldValue, errors } =
    useFormik({
      initialValues: initialValues(),
      validationSchema: validationSchema(),
      validateOnChange: true,
      onSubmit: async (values) => {
        setLoading(true);
        await registerWithEmailAndPassword({
          email,
          password: values.password,
        })
          .then(async () => {
            await createUser({
              username,
              email,
              password: values.password,
            });
          })
          .catch(showError)
          .finally(() => {
            setLoading(false);
          });
      },
    });

  const showError = (error) => {
    Toast.show({
      type: "error",
      position: "bottom",
      text1: "Error",
      text2:
        error.code === "auth/email-already-in-use"
          ? "El email ya está en uso"
          : "Ocurrió un error al registrarte",
    });
  };

  return (
    <>
      {loading && <Loading show />}
      <ScreenWithInputs>
        <View style={{ marginVertical: "10%" }}>
          <Row justifyContent="center" alignItems="center">
            <LogoMapata />
          </Row>
        </View>

        <View style={{ height: 180 }}>
          <Row justifyContent="center" additionalStyles={{ marginBottom: 22 }}>
            <Text variant="displaySmall">Contraseña</Text>
          </Row>
          <Row justifyContent="center">
            <Text
              numberOfLines={1}
              lineBreakMode={"tail"}
              variant={"titleSmall"}
            >
              ¡Estás a un paso de crear tu cuenta!
            </Text>
          </Row>
          <Row justifyContent="center">
            <Text
              onPress={() => navigate(ROUTES.SCREEN.REGISTER)}
              numberOfLines={1}
              lineBreakMode={"tail"}
              variant={"titleMedium"}
              style={{
                textDecorationStyle: "solid",
                textDecorationLine: "underline",
                paddingTop: 14,
              }}
            >
              {email}
            </Text>
          </Row>
        </View>

        <TextInput
          style={{
            marginTop: 11,
          }}
          secureTextEntry
          label={"Contraseña"}
          value={values.password}
          error={errors.password}
          textContentType={"password"}
          onChangeText={(password) => setFieldValue("password", password)}
        />

        <TextInput
          style={{
            marginTop: 8,
          }}
          secureTextEntry
          label={"Repetí tu contraseña"}
          value={values.passwordConfirmation}
          error={errors.passwordConfirmation}
          textContentType={"password"}
          onChangeText={(password) =>
            setFieldValue("passwordConfirmation", password)
          }
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

export default PasswordScreen;
