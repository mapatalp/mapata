import React from "react";
import { useTheme } from "react-native-paper";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Column, Row, Text } from "../../components";

import { logOut } from "../../firebase/methods/user";

const DrawerContent = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FAFAFA",
        paddingHorizontal: 40,
      }}
    >
      <Column
        additionalStyles={{
          height: "100%",
        }}
        justifyContent="flex-end"
      >
        <Pressable onPress={async () => await logOut()}>
          <Row
            additionalStyles={{
              height: 50,
            }}
          >
            <Text
              variant="bodyLarge"
              style={{ fontWeight: "bold", color: colors.black }}
            >
              Cerrar Sesión
            </Text>
          </Row>
        </Pressable>
      </Column>
    </SafeAreaView>
  );
};

export default DrawerContent;
