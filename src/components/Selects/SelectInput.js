import React from "react";
import { useTheme } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";

/**
 *
 * @param {import("react-native-select-dropdown").SelectDropdownProps} props
 * @returns
 */
const SelectInput = (props) => {
  const { colors } = useTheme();

  return (
    <SelectDropdown
      {...props}
      buttonStyle={{
        width: "100%",
        backgroundColor: props.error ? colors.background : "white",
        marginTop: 10,
        borderRadius: 10,
        borderWidth: props.error ? 2 : 0,
        borderColor: props.error ? colors.error : null,
      }}
      buttonTextStyle={{
        textAlign: "left",
      }}
    />
  );
};

export default SelectInput;
