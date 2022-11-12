import React from "react";

import { List } from "react-native-paper";

const SelectInput = ({
  title = "",

  items = [],
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Accordion
      title={title}
      expanded={expanded}
      onPress={handlePress}
    >
      {items.map((item, ix) => (
        <List.Item key={`key-${ix}-${item.title}`} title={item.title} />
      ))}
    </List.Accordion>
  );
};

export default SelectInput;
