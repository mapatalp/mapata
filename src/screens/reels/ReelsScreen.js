import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Searchbar } from "react-native-paper";
import { useSelector } from "react-redux";
import { cloneDeep } from "lodash";

import { PublicationReel } from "../../components";

import { filterPublicationsNoParser } from "../../utils/PublicationHelper";

const ReelsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const { data } = useSelector((state) => state.publication);

  let publications = cloneDeep(data);

  return (
    <View style={{ margin: 15, marginBottom: 60 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ marginBottom: 15 }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {publications &&
          publications
            .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
            .filter((p) => filterPublicationsNoParser(p, searchQuery))
            .map((item, index) => {
              return (
                <PublicationReel key={"key-reel-" + index} publication={item} />
              );
            })}
      </ScrollView>
    </View>
  );
};

export default ReelsScreen;
