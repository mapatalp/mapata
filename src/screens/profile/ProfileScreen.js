import React, { useState, useEffect, useMemo } from "react";
import { ScrollView, View } from "react-native";
import {
  UserProfilePic,
  Row,
  SocialButton,
  Text,
  Carousel,
  Modal,
  Column,
  TextInput,
} from "../../components";
import ProfileTabsScreen from "./ProfileTabsScreen";
import DescriptionCard from "../../components/Cards/DescriptionCard";
import { useTheme } from "react-native-paper";
import { editUser } from "../../firebase/methods/user";
import { useSelector } from "react-redux";

const ProfileScreen = ({ route }) => {
  const { refugioParam } = route?.params || {};
  let isSelf = true;
  const data =
    refugioParam != null
      ? refugioParam
      : useSelector((state) => state.user.data);

  const { colors } = useTheme();

  const [dataCarousel, setDataCarousel] = useState([]);
  const [isRefugio, setIsRefugio] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState("");
  const [redes, setRedes] = useState({
    facebook: data.facebook || "",
    instagram: data.instagram || "",
    whatsapp: data.whatsapp || "",
  });

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
      facebook: redes.facebook,
      instagram: redes.instagram,
      whatsapp: redes.whatsapp,
    };
    editUser(userData);
  };

  const saveMedia = () => {
    let userData = {
      ...user.data,
      facebook: redes.facebook,
      instagram: redes.instagram,
      whatsapp: redes.whatsapp,
    };
    editUser(userData);
  };

  const ModalRedes = () => {
    return (
      <Modal
        onPress={() => {
          saveMedia();
          setIsEditing(false);
        }}
        showModalMap={isEditing}
        setShowModalMap={setIsEditing}
        backgroundColor={"#BDBDBD"}
      >
        <View>
          <Row>
            <Column additionalStyles={{ width: "100%" }}>
              <TextInput
                placeholder="Facebook url"
                value={redes.facebook}
                onChangeText={(title) =>
                  setRedes({ ...redes, facebook: title })
                }
              />
            </Column>
          </Row>
          <Row>
            <Column additionalStyles={{ width: "100%" }}>
              <TextInput
                placeholder="Instagram url"
                value={redes.instagram}
                onChangeText={(title) =>
                  setRedes({ ...redes, instagram: title })
                }
              />
            </Column>
          </Row>
          <Row>
            <Column additionalStyles={{ width: "100%" }}>
              <TextInput
                placeholder="whatsapp"
                value={redes.whatsapp}
                onChangeText={(title) =>
                  setRedes({ ...redes, whatsapp: title })
                }
              />
            </Column>
          </Row>
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
          isSelf={isSelf}
          text={data.description}
          saveData={(text) => saveData(text)}
        />
      )}

      {isSelf && (
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
              setIsEditing(true);
            }}
          >
            Editar redes
          </Text>
        </Row>
      )}

      <Row
        additionalStyles={{
          marginTop: 20,
          alignSelf: "center",
          marginBottom: 15,
        }}
      >
        {Object.values(redes).map((item, index) => (
          <SocialButton key={"key-profile-" + index} socialUrl={item} />
        ))}
      </Row>
      <ProfileTabsScreen isSelf={isSelf} />

      {ModalRedes()}
    </ScrollView>
  );
};

export default ProfileScreen;
