import * as Yup from "yup";

export function initialValues() {
  return {
    title: "",
    gender: [],
    state: [],
    animal: [],
    age: [],
    selectedList:[],
  };
}

export function validationSchema() {
  return Yup.object({
    title: Yup.string().required("El título es obligatorio"),
    gender: Yup.array().required("El sexo es obligatorio"),
    state: Yup.array().required("El estado es obligatorio"),
    animal: Yup.array().required("El tipo de animal es obligatorio"),
    age: Yup.array().required("La edad es obligatoria"),
  });
}
