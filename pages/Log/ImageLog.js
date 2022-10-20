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

const Record = ({ item }, userId) => {
  //   console.log("single", item["photoWidth"]);
  return (
    <>
      <ListBlock style={{ flexDirection: "row" }}>
        <Image
          source={{
            uri:
              "http://140.112.106.82:8081/imagelog/" +
              userId +
              "/" +
              item["formatSearchTime"] +
              ".png",
          }}
          style={styles.image}
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
              console.log(ind);
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

const DateRecord = ({ item }, userId) => {
  return (
    <>
      <ListBlock>
        <Text style={FONTS.h3}>
          {DateTime.fromRFC2822(item[0]).toFormat("MMM dd, yyyy")}
        </Text>
      </ListBlock>
      <FlatList
        data={item[1]}
        renderItem={(e) => Record(e, userId)}
        keyExtractor={(e) => e.searchTime}
      />
    </>
  );
};

const ImageLog = () => {
  const [datesBactches, setDatesBactches] = useState();
  const [userId, setUserId] = useState("");

  useEffect(async () => {
    const data = await GetSearchingHistory(true);
    setDatesBactches(data);
    const userInfoStr = await AsyncStorage.getItem("@userInfo");
    const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
    setUserId(userInfo.userId);
  }, []);

  return (
    <Background>
      <Scroll>
        <ContentContainer>
          {datesBactches ? (
            <FlatList
              data={datesBactches}
              renderItem={(item) => DateRecord(item, userId)}
              keyExtractor={(item) => item[0]}
            />
          ) : null}
        </ContentContainer>
      </Scroll>
    </Background>
  );
};

export default ImageLog;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  listTextContainer: {
    flex: 2,
    marginLeft: 20,
    paddingTop: 20,
  },
});
