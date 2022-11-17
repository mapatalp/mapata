import React from "react";

import { TextInput as PaperTextInput } from "react-native-paper";

/**
 * @param {import("react-native-paper").TextInputProps} props
 */
const TextInput = (props) => {
  return <PaperTextInput mode="outlined" outlineColor="#fff" {...props}/>;
};

export default TextInput;
