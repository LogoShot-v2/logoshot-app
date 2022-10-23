import React, { useState, useEffect } from "react";
import {
  Background,
  Scroll,
  ContentContainer,
  ListBlock,
} from "../../components/lgsScreen";
import { FONTS } from "../../constant";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { GetMyFavoriteFileDetail } from "../../axios/api";
import { TouchableOpacity } from "react-native-gesture-handler";
import LgsGobackButton from "../../components/lgsGobackButton";

const TradeMarkImage = ({ item }) => {
  return (
    <>
      <Image
        style={{
          ...FONTS.image,
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: 20,
        }}
        source={{
          uri:
            "http://140.112.106.88:8082/" +
            item["_source"]["tmark-image-url_1"],
        }}
      />
    </>
  );
};

const MyFavoriteFileDetail = ({
  route: {
    params: { esIds, fileId, fileName },
  },
  navigation: { goBack, navigate },
}) => {
  const [tradeMarks, setTradeMarks] = useState([]);

  useEffect(() => {
    const asyncfunction = async () => {
      const data = await GetMyFavoriteFileDetail(esIds);
      setTradeMarks(data);
    };
    asyncfunction();
  }, [navigate]);

  return (
    <Background>
      <Scroll>
        <ContentContainer>
          <LgsGobackButton goBack={goBack}></LgsGobackButton>
          {tradeMarks.length !== 0 ? (
            <FlatList
              data={tradeMarks}
              renderItem={(item) => TradeMarkImage(item)}
              numColumns={3}
              contentContainerStyle={{ width: "100%" }}
            />
          ) : (
            <View style={styles.center}>
              <Text>這個資料夾是空的</Text>
            </View>
          )}
        </ContentContainer>
      </Scroll>
    </Background>
  );
};

export default MyFavoriteFileDetail;

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
