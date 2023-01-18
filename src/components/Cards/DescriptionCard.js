import Text from "../Text/Text";
import Column from "../Grid/Column";
import { Card } from "react-native-paper";
import { useState } from "react";
import TextInput from "../Inputs/TextInput";
import Row from "../Grid/Row";

/**
 * @param {import("react-native-paper").RefugioDescriptionProps} props
 */
const RefugioDescription = ({ text }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [texto, setTexto] = useState(text);
  return (
    <Column>
      <Row justifyContent="space-between">
        <Text
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            fontWeight: "bold",
            fontSize: 15,
            color: "#777777",
          }}
        >
          Descripción
        </Text>
        <Text
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            fontWeight: "bold",
            fontSize: 15,
            color: "black",
          }}
          onPress={() => {
            setIsEditing(!isEditing);
          }}
        >
          {isEditing ? "Guardar" : "Editar"}
        </Text>
      </Row>

      {isEditing ? (
        <>
          <TextInput
            style={{ marginHorizontal: 20 }}
            value={texto}
            numberOfLines={10}
            multiline
            onChangeText={(texto) => setTexto(texto)}
          />
        </>
      ) : (
        <Card
          style={{
            marginTop: 10,
            marginHorizontal: 15,
            backgroundColor: "#eeeeee",
            paddingVertical: 10,
          }}
        >
          <Text style={{ marginHorizontal: 20 }}>{texto}</Text>
        </Card>
      )}
    </Column>
  );
};

export default RefugioDescription;
