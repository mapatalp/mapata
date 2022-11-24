import React, { useMemo } from "react";
import { View, ScrollView } from "react-native"; //por que verga tengo que importarlo de aca si en el login screen lo hace desde components
import { UserProfilePic, Row, SocialButton, Text } from "../../components";
import { ProfileTabsScreen } from "./ProfileTabsScreen";
import { getMockedProfile } from "../../utils/ProfileHelper";
import DescriptionCard from "../../components/Cards/DescriptionCard";
import { Carousel } from "../../components";
import { store } from "../../redux";
import { useTheme } from "react-native-paper";

const ProfileScreen = () => {
  let isRefugio = false;
  let isSelf = true;
  let profile = getMockedProfile();
  const { user } = store.getState();
  const { colors } = useTheme();
  console.log(
    "🚀 ~ file: ProfileScreen.js ~ line 16 ~ ProfileScreen ~ user",
    user
  );

  const name = useMemo(() => user?.data?.usename, [user]);

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <ScrollView>
        <Row>{isRefugio ? <Carousel /> : <UserProfilePic />}</Row>
        <Text
          style={{
            alignSelf: "center",
            marginTop: 15,
            fontWeight: "bold",
            fontSize: 20,
            color: colors.black,
          }}
        >
          {name}
        </Text>
        {isRefugio && <DescriptionCard text={profile.description} />}
        <Row
          additionalStyles={{
            marginTop: 20,
            alignSelf: "center",
            marginBottom: 15,
          }}
        >
          {profile.socialMediaList.map((item, index) => {
            return (
              <SocialButton key={"key-profile-" + index} socialUrl={item} />
            );
          })}
        </Row>
        <ProfileTabsScreen isSelf={isSelf} />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
