import React from "react";
import { TextInput as PapeTextInput } from "react-native-paper";

/**
 * @param {import("react-native-paper").TextInputProps} props
 */
const TextInput = ({ ...props }) => {
  return <PapeTextInput style={[style]} {...props} />;
};

export default TextInput;
