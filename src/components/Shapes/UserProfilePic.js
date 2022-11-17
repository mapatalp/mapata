import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  CircleShape: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: "#B2B2B2",
    borderColor: "#D9D9D9",
    borderWidth: 10,
    alignContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

/**
 * @param {import("react-native-paper").UserProfilePicProps} props
 */
const UserProfilePic = () => {
  var imageUrl = fetchRandomProfileImage();
  return (
    <View style={styles.container}>
      <View style={styles.CircleShape}>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "70%", height: "70%" }}
        />
      </View>
    </View>
  );
};

function fetchRandomProfileImage() {
  return "https://cdn-icons-png.flaticon.com/512/616/616408.png";
}

export default UserProfilePic;
