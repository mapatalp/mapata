import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import { FAB, useTheme } from "react-native-paper";
import { ref, onValue } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import ROUTES from "../constants/routes";

import { Loading } from "../components";
import { CustomMarkerWindow } from "../components";
import { AnimalShelterMarker, PawMarker } from "../components/Svg";

import { setAllPublications } from "../redux/slice/publication";
import { setPublications as setLoggedUserPublications } from "../redux/slice/user";

import { db } from "../firebase";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const { colors } = useTheme();

  const [publications, setPublications] = useState([]);
  const [refugios, setRefugios] = useState([]);
  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation();

  const data = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    fab: {
      position: "absolute",
      marginBottom: 10,
      width: 180,
      right: (width - 180) / 2,
      bottom: 0,
      backgroundColor: colors.primary,
    },
  });

  const [location, setLocation] = useState({
    latitude: 0.001,
    longitude: 0.001,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error en los permisos",
        text2: "Tienes que ir a ajustes de la app y activar la localización",
      });
      return;
    }
    setLoading(true);
    const locationTemp = await Location.getCurrentPositionAsync({
      accuracy: 4,
    });

    setLocation({
      latitude: locationTemp.coords.latitude,
      longitude: locationTemp.coords.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
    setLoading(false);
  };

  useEffect(() => {
    const prepare = async () => {
      await getLocation();
    };

    const publicationsRef = ref(db, "/publications");

    onValue(publicationsRef, (snapshot) => {
      const publications = Object.values(snapshot.val());
      setPublications(publications);
      dispatch(setAllPublications(publications));

      let userLoggedPublications = [];
      publications.map((publication) => {
        if (publication.userId === data.id) {
          userLoggedPublications.push(publication);
        }
      });
      dispatch(setLoggedUserPublications(userLoggedPublications));
    });

    const usersRef = ref(db, "/users");

    onValue(usersRef, (snapshot) => {
      const users = Object.values(snapshot.val());
      console.log("🚀 ~ file: HomeScreen.js:105 ~ onValue ~ users", users);

      setRefugios(users.filter((user) => user?.refugio === true));
    });

    prepare();
  }, []);

  const handleMarkerPress = (publication) => {
    navigate(ROUTES.SCREEN.VIEW_PUBLICATION, { publication });
  };

  return (
    <View style={{ height: "100%", width: "100%" }}>
      {loading ? (
        <Loading show text={"Cargando el mapa..."} />
      ) : (
        <MapView
          style={{ height: "100%", width: "100%" }}
          provider={PROVIDER_GOOGLE}
          region={location}
          showsPointsOfInterest={false}
          showsUserLocation={true}
          showsBuildings={false}
          showsMyLocationButton
          moveOnMarkerPress={true}
        >
          {publications &&
            publications.length > 0 &&
            publications.map((publication, ix) => (
              <Marker
                key={`key-marker-${publication.title}-${ix}`}
                coordinate={publication.location}
                borderRadius={10}
              >
                <View>
                  <PawMarker width={35} height={35} />
                </View>
                <CustomMarkerWindow
                  publication={publication}
                  item={{ label: publication.title, image: publication.image }}
                  onPress={() => handleMarkerPress(publication)}
                  colors={colors}
                />
              </Marker>
            ))}
          {refugios &&
            refugios.length > 0 &&
            refugios.map(
              (refugio, ix) =>
                !!refugio?.location && (
                  <Marker
                    key={`key-marker-${refugio.uid}-${ix}`}
                    coordinate={refugio.location}
                    borderRadius={10}
                  >
                    <View>
                      <AnimalShelterMarker width={35} height={35} />
                    </View>
                    <CustomMarkerWindow
                      item={{
                        label: refugio.name,
                        image: !!refugio?.image && refugio?.image[0],
                      }}
                      onPress={() => {
                        let refugioParam = refugio;
                        navigate(ROUTES.SCREEN.PROFILE, { refugioParam });
                      }}
                      colors={colors}
                    />
                  </Marker>
                )
            )}
        </MapView>
      )}

      <FAB
        label={"Crear publicación"}
        icon="plus"
        color={colors.white}
        style={styles.fab}
        onPress={() => navigate(ROUTES.SCREEN.CREATE_PUBLICATION)}
      />
    </View>
  );
};

export default HomeScreen;
