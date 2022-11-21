import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

/**
 * @param {import("react-native").ScrollViewProps} scrollViewProps
 */
const ScreenWithInputs = ({ children, style, ...scrollViewProps }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" && "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 45 : 0}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={[{ padding: 30 }, style]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ScreenWithInputs;
