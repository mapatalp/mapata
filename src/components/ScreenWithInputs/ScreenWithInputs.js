import React from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

const screenHeight = Dimensions.get("screen").height - 60;

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
        style={[{ padding: 30, minHeight: screenHeight }, style]}
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
