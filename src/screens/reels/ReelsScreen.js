import React, { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { PublicationReel } from "../../components";
import { Searchbar } from "react-native-paper";
import {
  getMockedPublicationList,
  filterPublications,
} from "../../utils/PublicationHelper";

const ReelsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  var publicationList = getMockedPublicationList();
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
          .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
          .filter((publication) => filterPublications(publication, searchQuery))
          .map((item, index) => {
            return <PublicationReel publication={item} />;
          })}
      </ScrollView>
    </View>
  );
};

export default ReelsScreen;
