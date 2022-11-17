import React from "react";
import { View, Text } from "react-native"; //por que verga tengo que importarlo de aca si en el login screen lo hace desde components
import { UserProfilePic } from "../components";

const AsdScreen = () => {
    return (
      <View style={{ height: "100%", width: "100%" }}>
        <Text style={{ alignSelf: "center" }}>Login screen</Text>
      </View>
    );
  };

  
export default AsdScreen;