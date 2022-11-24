import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import { FAB, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { ref, onValue } from "firebase/database";
import { setAllPublications } from "../redux/slice/publication";
import { setPublications as setLoggedUserPublications } from "../redux/slice/user";
import { Loading } from "../components";
import ROUTES from "../constants/routes";
import { store } from "../redux";
import { db } from "../firebase";
import { PawMarker } from "../components/Svg";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();
  const { user } = store.getState();
  const dispatch = useDispatch();
  const { colors } = useTheme();

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

    const unsubscribe = onValue(publicationsRef, (snapshot) => {
      const data = Object.values(snapshot.val());
      setPublications(data);
      dispatch(setAllPublications(data));

      let userLoggedPublications = [];
      data.map((item) => {
        if (item.userId === user.data.id) {
          userLoggedPublications.push(item);
        }
      });

      dispatch(setLoggedUserPublications(userLoggedPublications));
    });

    prepare();

    return () => {
      unsubscribe();
    };
  }, []);

  const handleMarkerPress = (publication) => {
    navigate(ROUTES.SCREEN.VIEW_PUBLICATION, { publication });
    console.log(
      "🚀 ~ file: HomeScreen.js ~ line 103 ~ handleMarkerPress ~ publication",
      publication
    );
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
                title={publication.title}
                description={publication.animal}
                onCalloutPress={() => handleMarkerPress(publication)}
              >
                <View>
                  <PawMarker width={35} height={35} />
                </View>
              </Marker>
            ))}
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
