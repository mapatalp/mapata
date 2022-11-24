import { Text, Column } from "..";
import { Card } from "react-native-paper";

/**
 * @param {import("react-native-paper").RefugioDescriptionProps} props
 */
const RefugioDescription = ({ text }) => {
  return (
    <Column>
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
      <Card
        style={{
          marginTop: 10,
          marginHorizontal: 15,
          backgroundColor: "#eeeeee",
          paddingVertical: 10,
        }}
      >
        <Text style={{ marginHorizontal: 20 }}>{text}</Text>
      </Card>
    </Column>
  );
};

export default RefugioDescription;
