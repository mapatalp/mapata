import React from "react";
import { View } from "react-native"; //por que verga tengo que importarlo de aca si en el login screen lo hace desde components
import { PublicationCard } from "../../components";
import { ScrollView } from "react-native-gesture-handler";

const PublicationListScreen = ({ publicationList }) => {
  //TODO ver el tema del tamaño del scroll, el bottom navigation pisa el scroll al superar los 225 en mi cel
  return (
    <View style={{ width: "100%", padding: 10 }}>
      <ScrollView style={{ height: 250 }}>
        {publicationList.map((item, index) => {
          return <PublicationCard publication={item} />;
        })}
      </ScrollView>
    </View>
  );
};

export default PublicationListScreen;
