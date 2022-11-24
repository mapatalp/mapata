import * as Yup from "yup";

export function initialValues() {
  return {
    password: "",
    passwordConfirmation: "",
  };
}

export function validationSchema() {
  return Yup.object({
    password: Yup.string().required("La contraseña es obligatoria"),
    passwordConfirmation: Yup.string()
      .required("La confirmacion de la contraseña es obligatoria")
      .oneOf([Yup.ref("password"), ""], "Las contraseñas deben coincidir"),
  });
}
