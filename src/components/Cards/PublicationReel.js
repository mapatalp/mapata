import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Text, Row } from "../../components";
import { Card, useTheme } from "react-native-paper";

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
});
/**
 * @param {import("react-native-paper").PublicationReelProps} props
 */
const PublicationReel = ({ publication }) => {
  const { colors } = useTheme();
  let borderRadius = 8;
  let iconSize = 30;
  console.log(publication);
  return (
    <TouchableOpacity activeOpacity={0.85}>
      <Card style={{ borderRadius: borderRadius, marginBottom: 15 }}>
        <Image
          source={{ uri: publication.imageUrl }}
          style={{
            height: 200,
            width: "100%",
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
          }}
        />
        <Row>
          <View style={{ margin: 15, flex: 1 }}>
            <Text style={styles.title}>{publication.title}</Text>
            <Row>
              <Text style={styles.subtitle}>• {publication.animalType}</Text>
              <Text style={styles.subtitle}>
                • {publication.publicationState}
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
