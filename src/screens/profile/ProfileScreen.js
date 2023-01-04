import React, { useState, useEffect, useMemo } from "react";
import { ScrollView } from "react-native";
import {
  UserProfilePic,
  Row,
  SocialButton,
  Text,
  Carousel,
} from "../../components";
import ProfileTabsScreen from "./ProfileTabsScreen";
import { getMockedProfile } from "../../utils/ProfileHelper";
import DescriptionCard from "../../components/Cards/DescriptionCard";
import { store } from "../../redux";
import { useTheme } from "react-native-paper";
import { editUser } from "../../firebase/methods/user";

const ProfileScreen = () => {
  let isSelf = true;
  let profile = getMockedProfile();
  const { user } = store.getState();
  const { colors } = useTheme();
  const [image, setImage] = useState("");
  const [isRefugio, setIsRefugio] = useState(false);

  const [dataCarousel, setDataCarousel] = useState([]);

  useEffect(() => {
    if (dataCarousel.length < 5 && !dataCarousel.includes("uploadData")) {
      setDataCarousel([...dataCarousel, "uploadData"]);
    } else {
      setDataCarousel(dataCarousel.filter((item) => item !== "uploadData"));
    }
  }, []);

  useEffect(() => {
    console.log(user.data);
    if (user.data) {
      setIsRefugio(!!user.data.refugio);
      setDataCarousel(
        user.data.images && user.data.images.length < 5
          ? [...user.data.images, "uploadData"]
          : user.data.images && user.data.images > 0
          ? user.data.images
          : ["uploadData"]
      );
    }
  }, [user]);

  useEffect(() => {
    console.log("pase por aca", image);
    console.log(dataCarousel);
    if (image !== "") {
      console.log("entre al if");
      let dataCarouselTemp;
      if (dataCarousel.length === 5) {
        let newDataCarousel = dataCarousel.filter(
          (item) => item !== "uploadData"
        );
        dataCarouselTemp = [...newDataCarousel, image];
      } else {
        dataCarouselTemp = [...dataCarousel, image];
      }

      setDataCarousel(dataCarouselTemp);

      let userData = {
        ...user.data,
        images: dataCarouselTemp.filter(
          (item) => item && item !== "uploadData"
        ),
      };
      editUser(userData);
      setImage("");
    }
  }, [image]);

  const username = useMemo(() => user?.data?.username, [user]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Row>
        {isRefugio ? (
          <Carousel data={dataCarousel} isSelf={isSelf} setImage={setImage} />
        ) : (
          <UserProfilePic />
        )}
      </Row>

      <Row justifyContent="center">
        <Text
          style={{
            marginTop: 15,
            fontSize: 20,
            color: colors.black,
          }}
        >
          {username}
        </Text>
      </Row>

      {isRefugio && <DescriptionCard text={profile.description} />}
      <Row
        additionalStyles={{
          marginTop: 20,
          alignSelf: "center",
          marginBottom: 15,
        }}
      >
        {profile.socialMediaList.map((item, index) => {
          return <SocialButton key={"key-profile-" + index} socialUrl={item} />;
        })}
      </Row>
      <ProfileTabsScreen isSelf={isSelf} user={user} />
    </ScrollView>
  );
};

export default ProfileScreen;
