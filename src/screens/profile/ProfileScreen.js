import React from "react";
import { View } from "react-native"; //por que verga tengo que importarlo de aca si en el login screen lo hace desde components
import {
  UserProfilePic,
  Row,
  SocialButton,
  Text,
  Column,
} from "../../components";
import { Card } from "react-native-paper";
import { ProfileTabsScreen } from "./ProfileTabsScreen";
import { getMockedProfile } from "./ProfileScreenData";

const ProfileScreen = () => {
  let isRefugio = false;
  let isSelf = true;
  let profile = getMockedProfile();
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Row additionalStyles={{ marginTop: 25 }}>
        {isRefugio ? (
          <View>
            <Text>TODO Refugio Carousel</Text>
          </View>
        ) : (
          <UserProfilePic />
        )}
      </Row>
      <Text
        style={{
          alignSelf: "center",
          marginTop: 15,
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        {profile.name}
      </Text>
      {isRefugio && (
        <Column>
          <Text
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              fontWeight: "bold",
              fontSize: 15,
              color: "#777777",
            }}
          >
            Descripción
          </Text>
          <Card
            style={{
              marginTop: 10,
              marginHorizontal: 15,
              backgroundColor: "#eeeeee",
              paddingVertical: 10,
            }}
          >
            <Text style={{ marginHorizontal: 20 }}>{profile.description}</Text>
          </Card>
        </Column>
      )}

      <Row
        additionalStyles={{
          marginTop: 20,
          alignSelf: "center",
          marginBottom: 15,
        }}
      >
        {profile.socialMediaList.map((item, index) => {
          return <SocialButton socialUrl={item} />;
        })}
      </Row>
      <ProfileTabsScreen isSelf={isSelf} />
    </View>
  );
};

export default ProfileScreen;
