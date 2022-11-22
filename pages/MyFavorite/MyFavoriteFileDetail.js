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

const MyFavoriteFileDetail = ({
  route: {
    params: { esIds, fileId, fileName },
  },
  navigation: { goBack, navigate },
}) => {
  const [tradeMarks, setTradeMarks] = useState([]);

  const TradeMarkImage = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          style={{
            ...FONTS.image,
            marginTop: 20,
          }}
          onPress={() =>
            navigate("ResultDetail", {
              trademarkDetail: item,
            })
          }
        >
          <Image
            style={{
              ...FONTS.image,
            }}
            source={{
              uri:
                "http://140.112.106.88:8082/" +
                item["_source"]["tmark-image-url_1"],
            }}
          />
        </TouchableOpacity>
      </>
    );
  };

  useEffect(() => {
    const asyncfunction = async () => {
      const data = await GetMyFavoriteFileDetail(esIds);
      setTradeMarks(data);
    };
    asyncfunction();
  }, [navigate]);

  return (
    <Background>
      <LgsGobackButton goBack={goBack}></LgsGobackButton>
      {tradeMarks.length !== 0 ? (
        <Scroll>
          <ContentContainer>
            <FlatList
              data={tradeMarks}
              renderItem={(item) => TradeMarkImage(item)}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "space-around",
              }}
            />
          </ContentContainer>
        </Scroll>
      ) : (
        <View style={styles.center}>
          <Text>這個資料夾是空的</Text>
        </View>
      )}
    </Background>
  );
};

export default MyFavoriteFileDetail;

const styles = StyleSheet.create({
  center: {
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
