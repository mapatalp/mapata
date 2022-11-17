import React from "react";
import { View } from "react-native";

// justifyContent describes how to align children within the main axis of their container.
// For example, you can use this property to center a child horizontally within a container with flexDirection set to row.
// alignItems describes how to align children along the cross axis of their container.
// It is very similar to justifyContent but instead of applying to the main axis, alignItems applies to the cross axis.
// alignContent defines the distribution of lines along the cross-axis.
// This only has effect when items are wrapped to multiple lines using flexWrap.
/**
 * @param {Object} props
 * @param {("flex-start"|"flex-end"|"center"|"space-between"|"space-around"|"space-evenly")} props.justifyContent
 * @param {("flex-start"|"flex-end"|"center"|"stretch"|"baseline")} props.alignItems
 * @param {("flex-start"|"flex-end"|"center"|"stretch"|"baseline")} props.alignSelf
 * @param {("flex-start"|"flex-end"|"center"|"stretch"|"space-between"|"space-around")} props.alignContent
 * @param {("wrap"|"nowrap")} props.flexWrap
 * @param {object} props.additionalStyles
 */

const Row = ({
  children,
  justifyContent = "flex-start", // main axis
  alignItems = "stretch", // cross axis
  alignContent = "flex-start",
  flexWrap = "nowrap",
  additionalStyles,
}) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent,
          alignItems,
          alignContent,
          flexWrap,
        },
        additionalStyles,
      ]}
    >
      {children}
    </View>
  );
};
export default Row;
