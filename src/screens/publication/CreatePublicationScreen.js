import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import {
  initialValues,
  validationSchema,
} from "./CreatePublicationScreen.data";

import {
  Row,
  Column,
  ScreenWithInputs,
  TextInput,
  SelectInput,
} from "../../components";
import { Button } from "react-native-paper";

const CreatePublicationScreen = () => {
  const [selectedList, setSelectedList] = useState([]);
  const { values, errors, setFieldValue, isSubmitting, handleSubmit } =
    useFormik({
      initialValues: initialValues(),
      validationSchema: validationSchema(),
      validateOnChange: false,
      onSubmit: async (values) => {
        console.log(values);
        try {
        } catch (error) {
          // Toast.show({
          //   type: "error",
          //   position: "bottom",
          //   text1: "Complete los campos obligatorios",
          // });
        }
      },
    });

  const [gender, setGender] = useState({
    value: "",
    list: [
      { _id: "1", value: "MALE" },
      { _id: "2", value: "FEMALE" },
      { _id: "3", value: "OTHERS" },
    ],
    selectedList: [],
    error: "",
  });

  return (
    <ScreenWithInputs>
      <Row additionalStyles={{ marginTop: 10 }}>
        <Column additionalStyles={{ width: "100%" }}>
          <TextInput
            error={errors.title}
            placeholder="Título"
            value={values.title}
            onChangeText={(title) => setFieldValue("title", title)}
          />
        </Column>
      </Row>

      <Row additionalStyles={{ marginTop: 10 }}>
        <Column additionalStyles={{ width: "100%" }}>
          <SelectInput
            label="Sexo"
            arrayList={[
              { _id: "1", value: "Hembra" },
              { _id: "2", value: "Macho" },
            ]}
            selectedArrayList={values.gender}
            onSelection={(value) => {
              setFieldValue("gender", value.selectedList);
            }}
            value={values.gender[0]}
            errorText={errors.gender}
            multiEnable={false}
          />
        </Column>
      </Row>

      <Row>
        <Column additionalStyles={{ width: "100%" }}>
          <SelectInput
            label="Edad"
            arrayList={[
              { _id: "1", value: "Joven" },
              { _id: "2", value: "Viejo" },
            ]}
            selectedArrayList={values.age}
            onSelection={(value) => {
              setFieldValue("age", value.selectedList);
            }}
            value={values.age[0]}
            errorText={errors.age}
            multiEnable={false}
          />
        </Column>
      </Row>

      <Row>
        <Column additionalStyles={{ width: "100%" }}>
          <SelectInput
            label="Edad"
            arrayList={[
              { _id: "1", value: "Joven" },
              { _id: "2", value: "Viejo" },
            ]}
            selectedArrayList={values.age}
            onSelection={(value) => {
              setFieldValue("age", value.selectedList);
            }}
            value={values.age[0]}
            errorText={errors.age}
            multiEnable={false}
          />
        </Column>
      </Row>

      <Row>
        <Column additionalStyles={{ width: "100%" }}>
          <SelectInput
            label="Tipo de animal"
            arrayList={[
              { _id: "1", value: "Perro" },
              { _id: "2", value: "Gato" },
              { _id: "3", value: "Otro" },
            ]}
            selectedArrayList={values.animal}
            onSelection={(value) => {
              setFieldValue("animal", value.selectedList);
            }}
            value={values.animal[0]}
            errorText={errors.animal}
            multiEnable={false}
          />
        </Column>
      </Row>

      <Button onPress={handleSubmit} loading={isSubmitting}>
        Enviar
      </Button>
    </ScreenWithInputs>
  );
};

export default CreatePublicationScreen;
