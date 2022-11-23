import { LogBox } from "react-native";

const ignoreWarns = [
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
