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

var profile = {
  name: "Mapata L.P.",
  socialMediaList: [
    "https://www.facebook.com/rescataditos.laplata.9/",
    "https://www.instagram.com/rescataditoslaplata/?hl=en",
    "https://goo.gl/maps/fSMVi1CPpA9cMjg16",
    "+5401136133363",
  ],
  description:
    "🐾❤️Adoptá con el corazón\n\n🐶😺Más de 400 animales dependen de tu colaboración\n\n👇🏿¿Nos Ayudás?👇",
};

const ProfileScreen = (props) => {
  let isRefugio = false;
  let isSelf = true;
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
