import { View } from "react-native";
import Text from "../Text/Text";
import Row from "../Grid/Row";

/**
 * @param {import("react-native-paper").PublicationRowProps} props
 */
const PublicationRow = ({ title, text, additionalStyles }) => {
  return (
    <View
      style={[
        {
          marginHorizontal: 15,
          backgroundColor: "#eeeeee",
          paddingVertical: 10,
          marginBottom: 3,
        },
        additionalStyles,
      ]}
    >
      <Row>
        <Text
          style={{
            flex: 1,
            marginHorizontal: 20,
            fontWeight: "bold",
            fontSize: 15,
            color: "#444",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            flex: 1,
            marginHorizontal: 20,
            fontSize: 15,
          }}
        >
          {text}
        </Text>
      </Row>
    </View>
  );
};

export default PublicationRow;
