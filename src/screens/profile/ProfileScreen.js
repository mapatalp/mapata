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
import { store } from "../../redux";
import { useTheme } from "react-native-paper";
import { editUser } from "../../firebase/methods/user";

const ProfileScreen = () => {
  let isSelf = true;
  const { user } = store.getState();
  const { colors } = useTheme();
  const [image, setImage] = useState("");
  const [isRefugio, setIsRefugio] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [redes, setRedes] = useState({
    facebook: user.data.facebook || "",
    instagram: user.data.instagram || "",
    whatsapp: user.data.whatsapp || "",
  });

  const [dataCarousel, setDataCarousel] = useState([]);

  useEffect(() => {
    if (dataCarousel.length < 5 && !dataCarousel.includes("uploadData")) {
      setDataCarousel([...dataCarousel, "uploadData"]);
    } else {
      setDataCarousel(dataCarousel.filter((item) => item !== "uploadData"));
    }
  }, []);

  useEffect(() => {
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

  const saveData = (texto) => {
    let userData = {
      ...user.data,
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
        onPress={() => {saveMedia(); setIsEditing(false)}}
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
          text={user.data.description}
          saveData={(texto) => saveData(texto)}
        />
      )}

      {isSelf &&  (
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
        {Object.values(redes).map((item, index) => {
          return <SocialButton key={"key-profile-" + index} socialUrl={item} />;
        })}
      </Row>
      <ProfileTabsScreen isSelf={isSelf} user={user} />

      {ModalRedes()}
    </ScrollView>
  );
};

export default ProfileScreen;
