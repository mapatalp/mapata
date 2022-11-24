import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Text from "../Text/Text";
import Row from "../Grid/Row";
import { Card, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../constants/routes";
import {
  parseAnimalType,
  parsePublicationState,
} from "../../utils/PublicationHelper";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
  },
  subtitle: {
    flex: 1,
    fontSize: 16,
    color: "gray",
    opacity: 1,
    fontWeight: "bold",
    alignSelf: "center",
  },
  date: {
    position: "absolute",
    flex: 1,
    left: 15,
    top: 15,
    fontSize: 16,
    color: "white",
    opacity: 0.8,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
/**
 * @param {import("react-native-paper").PublicationReelProps} props
 */
const PublicationReel = ({ publication }) => {
  const { colors } = useTheme();
  let borderRadius = 8;
  let iconSize = 30;
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() =>
        navigate(ROUTES.SCREEN.VIEW_PUBLICATION, { publication: publication })
      }
    >
      <Card style={{ borderRadius: borderRadius, marginBottom: 15 }}>
        <Image
          source={{ uri: publication.imageUrl }}
          style={{
            height: 220,
            width: "100%",
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
          }}
        />
        <Text style={styles.date}>{publication.date}</Text>
        <Row>
          <View style={{ margin: 15, flex: 1 }}>
            <Text style={styles.title}>{publication.title}</Text>
            <Row>
              <Text style={styles.subtitle}>
                • {parseAnimalType(publication.animalType)}
              </Text>
              <Text style={styles.subtitle}>
                • {parsePublicationState(publication.state)}
              </Text>
            </Row>
          </View>
          <Image
            style={{
              height: iconSize,
              width: iconSize,
              marginEnd: 25,
              tintColor: colors.primary,
              alignSelf: "center",
            }}
            source={{
              uri: "https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/next-icon.png",
            }}
          ></Image>
        </Row>
      </Card>
    </TouchableOpacity>
  );
};

export default PublicationReel;
