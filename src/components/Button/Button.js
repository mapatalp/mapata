import React from "react";
import { Button as PaperButton } from "react-native-paper";

/**
 *
 * @param {import("react-native-paper").ButtonProps} props
 */
const Button = ({ mode, style, ...props }) => {
  return (
    <PaperButton
      style={[
        mode === "outlined" && { backgroundColor: theme.colors.surface },
        style,
      ]}
      mode={mode}
      {...props}
    />
  );
};

export default Button;
