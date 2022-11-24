import React from "react";
import { useTheme } from "react-native-paper";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Column, Row, Text } from "../../components";

import { logOut } from "../../firebase/methods/user";

import { LogoMapata } from "../../components/Svg";

const DrawerContent = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.primary,
        paddingEnd: 40,
        paddingStart: 20,
      }}
    >
      <Column
        additionalStyles={{
          height: "100%",
        }}
        justifyContent="flex-end"
      >
        <Pressable
          onPress={async () => await logOut()}
          style={{
            paddingStart: 20,
          }}
        >
          <View
            style={{
              backgroundColor: colors.white,
              width: "50%",
              height: 1,
              marginBottom: 20,
            }}
          ></View>
          <Row
            additionalStyles={{
              height: 50,
            }}
          >
            <Text
              variant="bodyLarge"
              style={{
                fontWeight: "bold",
                color: colors.white,
              }}
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
