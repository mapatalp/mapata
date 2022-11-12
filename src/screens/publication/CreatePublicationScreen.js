import React, { useState } from "react";
import {
  Row,
  Column,
  ScreenWithInputs,
  TextInput,
  SelectInput,
} from "../../components";

const CreatePublicationScreen = () => {
  const [title, setTitle] = useState("");

  return (
    <ScreenWithInputs>
      <Row additionalStyles={{ marginTop: 30 }}>
        <Column additionalStyles={{ width: "100%" }}>
          <TextInput
            placeholder="Título"
            title={title}
            setTitle={(title) => setTitle(title)}
          />
        </Column>
      </Row>

      <Row
        additionalStyles={{ width: "100%", marginTop: 30 }}
        justifyContent="space-between"
      >
        <Column additionalStyles={{ width: "48%" }}>
          <SelectInput
            title="Sexo"
            items={[{ title: "Hembra" }, { title: "Macho" }]}
          />
        </Column>

        <Column additionalStyles={{ width: "48%" }}>
          <SelectInput
            title="Edad"
            items={[{ title: "Joven" }, { title: "Viejo" }]}
          />
        </Column>
      </Row>

      <Row additionalStyles={{ marginTop: 30 }}>
        <Column additionalStyles={{ width: "100%" }}>
          <SelectInput
            title="Estado"
            items={[
              { title: "Lo perdí" },
              { title: "En transito" },
              { title: "En la calle" },
            ]}
          />
        </Column>
      </Row>
    </ScreenWithInputs>
  );
};

export default CreatePublicationScreen;
