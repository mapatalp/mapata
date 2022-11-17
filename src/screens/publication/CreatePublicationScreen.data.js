import * as Yup from "yup";

export function initialValues() {
  return {
    title: "",
    gender: "",
    state: "",
    animal: "",
    age: "",
  };
}

export function validationSchema() {
  return Yup.object({
    title: Yup.string().required("El título es obligatorio"),
    gender: Yup.string().required("El sexo es obligatorio"),
    state: Yup.string().required("El estado es obligatorio"),
    animal: Yup.string().required("El tipo de animal es obligatorio"),
    age: Yup.string().required("La edad es obligatoria"),
  });
}
