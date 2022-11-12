import React from "react";

import { TextInput as PaperTextInput } from "react-native-paper";

const TextInput = ({ title = "", setTitle, placeholder="" }) => {
  return (
    <PaperTextInput
      placeholder={placeholder}
      value={title}
      onChangeText={(title) => setTitle(title)}
      mode="outlined"
      outlineColor="#fff"
    />
  );
};

export default TextInput;
