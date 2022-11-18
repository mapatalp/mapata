import React from "react";
import { View, ScrollView, Button } from "react-native"; //por que verga tengo que importarlo de aca si en el login screen lo hace desde components
import { PublicationCard } from "../../components";

const PublicationListScreen = (props) => {
  var publicationList = props.publicationList;
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

export default PublicationListScreen;
