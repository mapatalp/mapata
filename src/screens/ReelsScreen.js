import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { PublicationReel } from "../components";
import { Searchbar } from "react-native-paper";
import latinize from "latinize";

var publicationList = [];
let animalTypeList = ["Gato", "Perro"];
let publicationStateList = ["En tránsito", "Buscado"];

for (var i = 0; i < 4; i++) {
  publicationList.push({
    title: `Manucha ${i + 1}`,
    imageUrl: `https://picsum.photos/id/23${i + 2}/200/300`,
    date: "12/02/2022",
    description: `Miau miau ${i + 1}`,
    animalType: animalTypeList[i % 2],
    publicationState: publicationStateList[i % 2],
  });
}

const ReelsScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  const filterPublications = (publication, searchQuery) => {
    searchQuery = searchQuery.toLowerCase();
    return (
      publication.title.toLowerCase().includes(searchQuery) ||
      publication.animalType.toLowerCase().includes(searchQuery) ||
      latinize(publication.publicationState.toLowerCase()).includes(searchQuery)
    );
  };

  return (
    <View style={{ margin: 15, marginBottom: 60 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ marginBottom: 15 }}
      />
      <ScrollView>
        {publicationList
          .filter((publication) => filterPublications(publication, searchQuery))
          .map((item, index) => {
            return <PublicationReel publication={item} />;
          })}
      </ScrollView>
    </View>
  );
};

export default ReelsScreen;
