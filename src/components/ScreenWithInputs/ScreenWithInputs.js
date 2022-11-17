import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const ScreenWithInputs = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" && "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 45 : 0}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ padding: 30 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ScreenWithInputs;
