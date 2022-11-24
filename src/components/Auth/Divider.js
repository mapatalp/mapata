import React from "react";
import { Divider as PaperDivider } from "react-native-paper";

import Row from "../Grid/Row";
import Text from "../Text/Text";

const Divider = () => (
  <Row
    justifyContent="center"
    alignItems="center"
    additionalStyles={{ paddingVertical: 20 }}
  >
    <PaperDivider bold style={{ backgroundColor: "black", width: "20%" }} />
    <Text style={{ paddingHorizontal: 6 }}>o utilizá tu email</Text>
    <PaperDivider bold style={{ backgroundColor: "black", width: "20%" }} />
  </Row>
);

export default Divider;
