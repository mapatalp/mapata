import React from "react";
import { View, ScrollView } from "react-native"; //por que verga tengo que importarlo de aca si en el login screen lo hace desde components
import { PublicationCard } from "../components";

var publicationList = [];

for (var i = 0; i < 3; i++) {
  publicationList.push({
    title: `Manucha ${i + 1}`,
    imageUrl: "https://picsum.photos/700",
    date: "12/02/2022",
    description: `Miau miau ${i + 1}`,
  });
}

const PublicaionTabScreen = () => {
  return (
    <View style={{ height: "100%", width: "100%", padding: 10 }}>
      <ScrollView>
        {publicationList.map((item, index) => {
          return <PublicationCard publication={item} />;
        })}
      </ScrollView>
    </View>
  );
};

export default PublicaionTabScreen;
