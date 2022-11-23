import React from "react";

import { TextInput as PaperTextInput } from "react-native-paper";
import { useTheme } from "react-native-paper";

/**
 * @param {import("react-native-paper").TextInputProps} props
 */
const TextInput = (props) => {
  const { colors } = useTheme();

  return (
    <PaperTextInput
      mode="outlined"
      outlineColor="#fff"
      style={{ backgroundColor: props.error ? colors.background : "white" }}
      {...props}
    />
  );
};

export default TextInput;
