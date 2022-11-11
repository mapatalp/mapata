import React from "react";
import { Text as PaperText } from "react-native-paper";

/**
 * @param {import("react-native-paper").TextProps} props
 */
const Text = ({ ...props }) => {
  return <PaperText {...props} />;
};

export default Text;
