import { StyleSheet, View, Image } from "react-native";
import React, { useEffect, useState } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
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

const UserProfilePic = () => {
  const [imageUrl, setImageUrl] = useState(false);

  useEffect(() => {
    //TODO borrar
    const getImage = async () => {
      const url = await fetchRandomProfileImage();
      setImageUrl(url);
    };

    getImage();
  }, []);

  const fetchRandomProfileImage = async () => {
    var defaultIconUrl =
      "https://cdn-icons-png.flaticon.com/512/616/616408.png";
    return defaultIconUrl;
  };

  if (!imageUrl) return null;

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

export default UserProfilePic;
