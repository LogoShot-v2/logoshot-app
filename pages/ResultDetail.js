import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";
import {
  Table,
  Row,
  Rows,
  Col,
  Cols,
  TableWrapper,
} from "react-native-table-component";
import { Background, Scroll, ContentContainer } from "../components/lgsScreen";
import Carousel from "react-native-snap-carousel";
import { PostAddFavoriteFile, SearchText } from "../axios/api";
import { icons, COLORS, FONTS, SIZES, classCodeList } from "../constant";
import LgsCarousel from "../components/carousel";
import Icon from "react-native-vector-icons/FontAwesome";

const imageArr = [
  "tmark-image-url_1",
  "tmark-image-url_2",
  "tmark-image-url_3",
  "tmark-image-url_4",
  "tmark-image-url_5",
];
const CarouselCardItem = ({ item, index }) => {
  return (
    <View key={index}>
      <Image
        source={{
          uri:
            "http://140.112.106.88:8082/" +
            params.trademarkDetail["_source"][imageArr[index]],
        }}
      />
    </View>
  );
};

const ResultDetail = ({ navigation: { navigate }, route: { params } }) => {
  useEffect(() => {
    // console.log("upup");

    console.log(params.trademarkDetail["_source"][imageArr[0]]);
    //   console.log(params.trademarkDetail)

    // console.log("d");
  }, [params]);
  const AddFavorite = async () => {
    //加到我的最愛
  };

  return (
    <Background>
      <Scroll>
        <ContentContainer>
          <Image
            source={{
              uri:
                "http://140.112.106.88:8082/" +
                params.trademarkDetail["_source"]["tmark-image-url_1"],
            }}
            style={{
              width: 300,
              height: 200,
              // resizeMode: "contain",
              // width: 300,
              borderWidth: 1,
              borderColor: "#464646",
            }}
          />

          <Text
            style={{
              fontSize: 20,
              marginVertical: 10,
              textDecorationLine: "underline",
            }}
          >
            商標{" "}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...FONTS.h3, color: "#464646" }}>申請案號 :</Text>
            <Text style={{ ...FONTS.h4, marginLeft: 10, color: "#7E7E7E" }}>
              {params.trademarkDetail["_source"]["appl-no"]}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...FONTS.h3, color: "#464646" }}>商標名稱 :</Text>
            <Text style={{ ...FONTS.h4, marginLeft: 10, color: "#7E7E7E" }}>
              {params.trademarkDetail["_source"]["tmark-name"]}
            </Text>
          </View>

          <Text style={{ ...FONTS.h3, color: "#464646" }}>商品類別 :</Text>
          <Text
            style={{ ...FONTS.h4, color: "#7E7E7E" }}
            ellipsizeMode={"tail"}
            numberOfLines={3}
          >
            {params.trademarkDetail["_source"]["goods-name"]}
          </Text>

          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...FONTS.h3, color: "#464646" }}>申請日期 :</Text>
            <Text style={{ ...FONTS.h4, marginLeft: 10, color: "#7E7E7E" }}>
              {params.trademarkDetail["_source"]["appl-date"]}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 20,
              marginVertical: 10,
              textDecorationLine: "underline",
            }}
          >
            申請人{" "}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...FONTS.h3, color: "#464646" }}>中文名稱 :</Text>
            <Text style={{ ...FONTS.h4, marginLeft: 10, color: "#7E7E7E" }}>
              {params.trademarkDetail["_source"]["applicant-chinese-name"]}
            </Text>
          </View>
          {/* <View style={{ flexDirection: "row" }}> */}
          <Text style={{ ...FONTS.h3, color: "#464646" }}>地址 ：</Text>
          <Text
            style={{ ...FONTS.h4, marginLeft: 10, color: "#7E7E7E" }}
            ellipsizeMode={"tail"}
            numberOfLines={3}
          >
            {params.trademarkDetail["_source"]["applicant-address"]}
          </Text>
          {/* </View> */}
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...FONTS.h3, color: "#464646" }}>國籍 ：</Text>
            <Text style={{ ...FONTS.h4, marginLeft: 10, color: "#7E7E7E" }}>
              {
                params.trademarkDetail["_source"][
                  "applicant-chinese-country-name"
                ]
              }
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Button
              type="clear"
              icon={<Icon name="home" size={22} color="#606d87" />}
              onPress={() => navigate("Home")}
            />

            <Button
              type="clear"
              icon={<Icon name="heart-o" size={20} color="red" />}
              onPress={() => AddFavorite()}
            />
          </View>
        </ContentContainer>
      </Scroll>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e5e5e5",
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  GridViewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    margin: 5,
    backgroundColor: "#7B1FA2",
  },
  GridViewTextLayout: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    color: "#fff",
    padding: 10,
  },
});
export default ResultDetail;
