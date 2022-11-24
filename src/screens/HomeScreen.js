import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import { Button, FAB, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Loading } from "../components";
import ROUTES from "../constants/routes";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

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
        ></MapView>
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
