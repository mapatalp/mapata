import React from "react";

import { PaperSelect } from "react-native-paper-select";

/**
 *
 * @param {import("react-native-paper-select/lib/typescript/interface/paperSelect.interface").paperSelect} props
 * @returns
 */
const SelectInput = (props) => {
  return <PaperSelect {...props} />;
};

export default SelectInput;
