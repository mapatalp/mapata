import React from "react";
import { View, Text } from "react-native"; //por que verga tengo que importarlo de aca si en el login screen lo hace desde components
import { UserProfilePic, Row, SocialButton } from "../../components";
import { ProfileTabsScreen } from "./ProfileTabsScreen";

var socialMediaList = [
  "https://www.facebook.com/",
  "https://www.instagram.com/",
  "aasdas default",
];

var user = {
  name: "Mapata L.P.",
};

const ProfileScreen = () => {
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Row additionalStyles={{ marginTop: 25 }}>
        <UserProfilePic />
      </Row>
      <Text
        style={{
          alignSelf: "center",
          marginTop: 15,
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        {user.name}
      </Text>

      <Row additionalStyles={{ marginTop: 20, alignSelf: "center" }}>
        {socialMediaList.map((item, index) => {
          return <SocialButton socialUrl={item} />;
        })}
      </Row>
      <ProfileTabsScreen />
    </View>
  );
};

export default ProfileScreen;
