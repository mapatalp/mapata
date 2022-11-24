import * as Yup from "yup";

export function initialValues() {
  return {
    username: "",
    email: "",
    emailConfirmation: "",
    method: "",
  };
}

export function validationSchema() {
  return Yup.object({
    username: Yup.string().required("El username es obligatorio"),
    email: Yup.string()
      .email("El email no es valido")
      .required("El email es obligatorio"),
    emailConfirmation: Yup.string()
      .required("La confirmacion del email es obligatorio")
      .oneOf([Yup.ref("email"), ""], "Los emails deben coincidir"),
  });
}
