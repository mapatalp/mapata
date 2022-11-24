import React, { useState, useEffect } from "react";
import { View } from "react-native"; //por que verga tengo que importarlo de aca si en el login screen lo hace desde components
import { UserProfilePic, Row, SocialButton, Text } from "../../components";
import { ProfileTabsScreen } from "./ProfileTabsScreen";
import { getMockedProfile } from "../../utils/ProfileHelper";
import DescriptionCard from "../../components/Cards/DescriptionCard";
import { Carousel } from "../../components";
import { ScrollView } from "react-native-gesture-handler";

const ProfileScreen = () => {
  let isRefugio = true;
  let isSelf = true;
  let profile = getMockedProfile();

  const [image, setImage] = useState();
  const [dataCarousel, setDataCarousel] = useState([
    "https://unoarrecifes.com/wp-content/uploads/2015/07/Refugio-Municipal-de-Animales-Tana.jpg",
    "https://www.importancia.org/wp-content/uploads/social-de-los/Refugio-Animales-ABANDONO-CACHORROS.jpg",
    "https://i.ytimg.com/vi/X7N_Ow8RP18/maxresdefault.jpg",
    "https://i.ytimg.com/vi/X7N_Ow8RP18/maxresdefault.jpg",
  ]);

  useEffect(() => {
    if (dataCarousel.length < 5 && !dataCarousel.includes("uploadData")) {
      setDataCarousel([...dataCarousel, "uploadData"]);
    } else {
      setDataCarousel(dataCarousel.filter((item) => item !== "uploadData"));
    }
  }, []);

  useEffect(() => {
    if (image) {
      if (dataCarousel.length === 5) {
        let newDataCarousel = dataCarousel.filter(
          (item) => item !== "uploadData"
        );
        setDataCarousel([...newDataCarousel, image]);
      } else {
        setDataCarousel([...dataCarousel, image]);
      }
    }
  }, [image]);

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <ScrollView>
        <Row>
          {isRefugio ? (
            <Carousel data={dataCarousel} isSelf={isSelf} setImage={setImage} />
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
