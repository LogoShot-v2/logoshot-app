import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { GetSearchingHistory } from "../../axios/api";
import {
  Background,
  Scroll,
  ContentContainer,
  ListBlock,
} from "../../components/lgsScreen";
import { FONTS, classCodeList } from "../../constant";
import { DateTime } from "luxon";

const Record = ({ item }, userId, toSearch) => {
  return (
    <>
      <ListBlock
        style={{ flexDirection: "row" }}
        onPress={() => toSearch(item)}
      >
        <Image
          source={{
            uri:
              "http://140.112.106.82:8081/imagelog/" +
              userId +
              "/" +
              item["formatSearchTime"] +
              ".png",
          }}
          style={FONTS.image}
        />
        <View style={styles.listTextContainer}>
          <Text
            style={{ ...FONTS.h4 }}
            ellipsizeMode={"tail"}
            numberOfLines={1}
          >
            應用商品類別:
            {item["targetClasscodes"].map((x) => {
              const ind = classCodeList.findIndex(
                (y) => y.value === x.toString()
              );
              if (classCodeList[ind]) {
                return " " + classCodeList[ind].label;
              }
              return x;
            })}
          </Text>
          <Text style={FONTS.h4}>商標色彩:{item["targetColor"]}</Text>
          <Text style={FONTS.h4}>申請人：{item["targetApplicant"]}</Text>
        </View>
      </ListBlock>
    </>
  );
};

const DateRecord = ({ item }, userId, toSearch) => {
  return (
    <>
      <View style={styles.dateContainer}>
        <Text style={FONTS.h3}>
          {DateTime.fromRFC2822(item[0]).toFormat("MMM dd, yyyy")}
        </Text>
      </View>
      <FlatList
        data={item[1]}
        renderItem={(e) => Record(e, userId, toSearch)}
        keyExtractor={(e) => e.searchTime}
      />
    </>
  );
};

const ImageLog = ({ navigation: { navigate } }) => {
  const [datesBactches, setDatesBactches] = useState();
  const [userId, setUserId] = useState("");

  const toSearch = (item) => {
    navigate("ImageSearch", item);
  };

  useEffect(() => {
    const asyncfunction = async () => {
      const data = await GetSearchingHistory(true);
      setDatesBactches(data);
      const userInfoStr = await AsyncStorage.getItem("@userInfo");
      const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
      setUserId(userInfo.userId);
    };
    asyncfunction();
  }, []);

  return (
    <Scroll>
      <ContentContainer>
        {datesBactches ? (
          <FlatList
            data={datesBactches}
            renderItem={(item) => DateRecord(item, userId, toSearch)}
            keyExtractor={(item) => item[0]}
          />
        ) : null}
      </ContentContainer>
    </Scroll>
  );
};

export default ImageLog;

const styles = StyleSheet.create({
  listTextContainer: {
    flex: 2,
    marginLeft: 20,
    paddingTop: 20,
  },
  dateContainer: {
    marginTop: 20,
  },
});
