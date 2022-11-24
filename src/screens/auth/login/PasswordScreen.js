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

const PasswordScreen = ({ route }) => {
  const { loginWithEmailAndPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();
  const { colors } = useTheme();

  const { email } = route.params;

  const { handleSubmit, isSubmitting, values, setFieldValue, errors } =
    useFormik({
      initialValues: initialValues(),
      validationSchema: validationSchema(),
      validateOnChange: true,
      onSubmit: async (values) => {
        setLoading(true);
        await loginWithEmailAndPassword({
          email,
          password: values.password,
        })
          .then(async (data) => {
            const {
              user: { uid },
            } = data;

            await getUserByUID(uid);
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
        error.code === "auth/wrong-password"
          ? "Contraseña incorrecta"
          : error.code === "auth/user-not-found"
          ? "Ese email no está registrado"
          : "Ocurrió un error al iniciar sesión",
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
            <Text variant="displaySmall">Bienvenido</Text>
          </Row>
          <Row justifyContent="center">
            <Text
              onPress={() => navigate(ROUTES.SCREEN.LOGIN)}
              numberOfLines={1}
              lineBreakMode={"tail"}
              variant={"titleMedium"}
              style={{
                textDecorationStyle: "solid",
                textDecorationLine: "underline",
                paddingTop: 34,
              }}
            >
              {email}
            </Text>
          </Row>
        </View>

        <TextInput
          secureTextEntry
          label={"Contraseña"}
          value={values.password}
          error={errors.password}
          textContentType={"password"}
          onChangeText={(password) => setFieldValue("password", password)}
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
          <Text>¿No tenés cuenta?</Text>
          <Text
            style={{ fontWeight: "bold" }}
            onPress={() => navigate(ROUTES.SCREEN.REGISTER)}
          >
            {" "}
            Registrate
          </Text>
        </Row>
      </ScreenWithInputs>
    </>
  );
};

export default PasswordScreen;
