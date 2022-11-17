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
import { createPublication } from "../../firebase/methods/publication";

const CreatePublicationScreen = () => {
  const [selectedList, setSelectedList] = useState([]);
  const { values, errors, setFieldValue, isSubmitting, handleSubmit } =
    useFormik({
      initialValues: initialValues(),
      validationSchema: validationSchema(),
      validateOnChange: true,
      onSubmit: async (values) => {
        try {
      
          createPublication(values);
        } catch (error) {
          // Toast.show({
          //   type: "error",
          //   position: "bottom",
          //   text1: "Complete los campos obligatorios",
          // });
        }
      },
    });

  return (
    <ScreenWithInputs>
      <Row>
        <Column additionalStyles={{ width: "100%" }}>
          <TextInput
            error={errors.title}
            placeholder="Título"
            value={values.title}
            onChangeText={(title) => setFieldValue("title", title)}
          />
        </Column>
      </Row>
      <Row>
        <SelectInput
          data={["Hembra", "Macho"]}
          onSelect={(selectedItem, index) => {
            setFieldValue("gender", selectedItem);
          }}
          value={values.gender}
          defaultButtonText="Sexo"
          error={!!errors.gender}
        />
      </Row>
      <Row>
        <SelectInput
          buttonStyle={{ width: "100%" }}
          data={["Joven", "Viejo"]}
          onSelect={(selectedItem, index) => {
            setFieldValue("age", selectedItem);
          }}
          value={values.age}
          defaultButtonText="Edad"
          error={!!errors.age}
        />
      </Row>
      <Row>
        <SelectInput
          buttonStyle={{ width: "100%" }}
          data={["Lo perdí", "En tránsito", "En la calle"]}
          onSelect={(selectedItem, index) => {
            setFieldValue("state", selectedItem);
          }}
          value={values.state}
          defaultButtonText="Estado"
          error={!!errors.state}
        />
      </Row>
      <Row additionalStyles={{ width: "100%" }}>
        <SelectInput
          buttonStyle={{ width: "100%" }}
          data={["Perro", "Gato", "Otro"]}
          onSelect={(selectedItem, index) => {
            setFieldValue("animal", selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          defaultButtonText="Tipo de animal"
          value={values.animal}
          error={!!errors.animal}
        />
      </Row>

      <Button onPress={handleSubmit} loading={isSubmitting}>
        Enviar
      </Button>
    </ScreenWithInputs>
  );
};

export default CreatePublicationScreen;
