import { LogBox } from "react-native";

const ignoreWarns = [
  "Constants.platform.ios.model has been deprecated in favor of expo-device's Device.modelName property.",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release",
];

const warn = console.warn;
console.warn = (...arg) => {
  for (const warning of ignoreWarns) {
    if (arg[0].startsWith(warning)) {
      return;
    }
  }
  warn(...arg);
};

LogBox.ignoreLogs(ignoreWarns);
