import React, { useState, useEffect, useMemo } from "react";
import { ScrollView, View } from "react-native";
import {
  UserProfilePic,
  Row,
  SocialButton,
  Text,
  Carousel,
  Modal,
} from "../../components";
import ProfileTabsScreen from "./ProfileTabsScreen";
import { getMockedProfile } from "../../utils/ProfileHelper";
import DescriptionCard from "../../components/Cards/DescriptionCard";
import { useTheme } from "react-native-paper";
import { editUser } from "../../firebase/methods/user";
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  let isSelf = true;
  let profile = getMockedProfile();
  const data = useSelector((state) => state.user.data);
  console.log("🚀 ~ file: ProfileScreen.js:23 ~ ProfileScreen ~ data", data)
  const { colors } = useTheme();
  const [image, setImage] = useState("");
  const [isRefugio, setIsRefugio] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [dataCarousel, setDataCarousel] = useState([]);

  useEffect(() => {
    if (dataCarousel.length < 5 && !dataCarousel.includes("uploadData")) {
      setDataCarousel([...dataCarousel, "uploadData"]);
    } else {
      setDataCarousel(dataCarousel.filter((item) => item !== "uploadData"));
    }
  }, []);

  useEffect(() => {
    if (data) {
      setIsRefugio(!!data.refugio);
      setDataCarousel(
        data.images && data.images.length < 5
          ? [...data.images, "uploadData"]
          : data.images && data.images > 0
          ? data.images
          : ["uploadData"]
      );
    }
  }, [data]);

  useEffect(() => {
    if (image !== "") {
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
        ...data,
        images: dataCarouselTemp.filter(
          (item) => item && item !== "uploadData"
        ),
      };
      editUser(userData);
      setImage("");
    }
  }, [image]);

  const username = useMemo(() => data?.username, [data]);

  const saveData = (texto) => {
    let userData = {
      ...data,
      description: texto,
    };
    editUser(userData);
  };

  const ModalRedes = () => {
    return (
      <Modal
        onPress={() => console.log("on press")}
        showModalMap={isEditing}
        setShowModalMap={setIsEditing}
      >
        <View>
          <Text>ACA VAN LAS REDES</Text>
        </View>
      </Modal>
    );
  };

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

      {isRefugio && (
        <DescriptionCard
          text={data.description}
          saveData={(texto) => saveData(texto)}
        />
      )}

      <Row justifyContent="flex-end">
        <Text
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            fontWeight: "bold",
            fontSize: 15,
            color: "black",
          }}
          onPress={() => {
            setIsEditing(!isEditing);
          }}
        >
          Editar redes
        </Text>
      </Row>

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
      <ProfileTabsScreen isSelf={isSelf} />

      <ModalRedes />
    </ScrollView>
  );
};

export default ProfileScreen;
