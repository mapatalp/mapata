import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    method: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("El email no es valido")
      .required("El email es obligatorio"),
  });
}
