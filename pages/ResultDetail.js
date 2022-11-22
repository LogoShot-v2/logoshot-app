import React, { useState, useEffect, useCallback } from "react";
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
import { Background, Scroll, ContentContainer } from "../components/lgsScreen";
import { SliderBox } from "react-native-image-slider-box";
import Carousel from "react-native-snap-carousel";
import { PostAddFavoriteFile, SearchText } from "../axios/api";
import { icons, COLORS, FONTS, SIZES, classCodeList } from "../constant";
import LgsCarousel from "../components/carousel";
import Icon from "react-native-vector-icons/FontAwesome";
import { GetMyFavoriteFiles, PostAddFavorite } from "../axios/api";
import { BottomSheet, ListItem } from "@rneui/themed";
import LgsGobackButton from "../components/lgsGobackButton";
const imageArr = [
  "tmark-image-url_1",
  "tmark-image-url_2",
  "tmark-image-url_3",
  "tmark-image-url_4",
  "tmark-image-url_5",
];

const ResultDetail = ({
  navigation: { navigate, goBack },
  route: { params },
  slideTime,
}) => {
  const [images, setimages] = useState([
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?girl",
    "https://source.unsplash.com/1024x768/?tree", // Network image
  ]);
  const [showFavorite, setShowFavorite] = useState(false);
  const [myFavoriteFile, setMyFavoriteFile] = useState([]);

  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };
  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 3); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);
  // const _carousel = useCarousel(slideTime)

  useEffect(() => {
    const asyncfunction = async () => {
      const data = await GetMyFavoriteFiles();
      if (data) {
        setMyFavoriteFile([...data]);
      } else {
        setShowFavorite(false);
      }
    };
    if (showFavorite) {
      asyncfunction();
    }
  }, [showFavorite]);

  const AddFavorite = async (fileId, esId) => {
    //加到我的最愛
    await PostAddFavorite(fileId, esId);

    setShowFavorite(false);
  };

  return (
    <Background>
      <LgsGobackButton goBack={goBack} />
      <Scroll>
        <ContentContainer>
          <SliderBox
            sliderBoxHeight={200}
            parentWidth={300}
            images={imageArr
              .filter((x) => params.trademarkDetail["_source"][x])
              .map(
                (x) =>
                  "http://140.112.106.88:8082/" +
                  params.trademarkDetail["_source"][x]
              )}
          />

          <Text
            style={{
              fontSize: 20,
              marginVertical: 10,
              color: "#5173B7",
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
            onPress={toggleNumberOfLines}
            onTextLayout={onTextLayout}
            numberOfLines={textShown ? undefined : 3}
          >
            {params.trademarkDetail["_source"]["goods-name"]}
          </Text>
          {lengthMore ? (
            <Text
              onPress={toggleNumberOfLines}
              style={{
                backgroundColor: "#D0D0D0",
                width: 79,
                fontSize: 14,
                color: "black",
                padding: 2,
              }}
            >
              {textShown ? "顯示更少..." : "顯示更多..."}
            </Text>
          ) : null}

          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...FONTS.h3, color: "#464646" }}>申請日期 :</Text>
            <Text style={{ ...FONTS.h4, marginLeft: 10, color: "#7E7E7E" }}>
              {params.trademarkDetail["_source"]["appl-date"]}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 20,
              color: "#5173B7",
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
            style={{ ...FONTS.h4, color: "#7E7E7E" }}
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
              onPress={() => setShowFavorite(true)}
            />
          </View>
          <BottomSheet
            isVisible={showFavorite}
            onBackdropPress={() => setShowFavorite(false)}
          >
            {myFavoriteFile.map((l, i) => (
              <ListItem
                key={i}
                containerStyle={l.containerStyle}
                onPress={() =>
                  AddFavorite(l["fileId"], params.trademarkDetail["_id"])
                }
              >
                <ListItem.Content>
                  <ListItem.Title style={l.titleStyle}>
                    {l["fileName"]}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </BottomSheet>
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
