import * as Yup from "yup";

export function initialValues() {
  return {
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    password: Yup.string().required("La contraseña es obligatoria"),
  });
}
