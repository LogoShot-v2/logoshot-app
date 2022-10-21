import React, { useState, useEffect } from "react";
import {
  Background,
  Scroll,
  ContentContainer,
  ListBlock,
} from "../components/lgsScreen";
import { FONTS } from "../constant";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { GetMyFavoriteFiles } from "../axios/api";

const File = ({ item }) => {
  return (
    <TouchableOpacity
      style={{
        ...FONTS.image,
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: 20,
      }}
    >
      <Text>{item["fileName"]}</Text>
    </TouchableOpacity>
  );
};

const MyFavorite = () => {
  const [files, setFiles] = useState(null);
  useEffect(async () => {
    const data = await GetMyFavoriteFiles();
    // console.log(data);
    setFiles(data);
  }, []);
  return (
    <Background>
      <Scroll>
        <ContentContainer>
          <Text style={FONTS.h1}>我的最愛</Text>
          {files ? (
            <FlatList
              data={files}
              renderItem={(item) => File(item)}
              keyExtractor={(x) => x["fileId"]}
              numColumns={3}
              contentContainerStyle={{ width: "100%" }}
            />
          ) : null}
        </ContentContainer>
      </Scroll>
    </Background>
  );
};

export default MyFavorite;

const styles = StyleSheet.create({});
