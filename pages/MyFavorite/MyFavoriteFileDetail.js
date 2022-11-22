import React, { useState, useEffect } from "react";
import {
  Background,
  Scroll,
  ContentContainer,
  ListBlock,
} from "../../components/lgsScreen";
import { FONTS } from "../../constant";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { GetMyFavoriteFileDetail, PostDeleteFavorite } from "../../axios/api";
import { TouchableOpacity } from "react-native-gesture-handler";
import LgsGobackButton from "../../components/lgsGobackButton";
import LgsLogo from "../../components/lgsLogo";
import { BottomSheet, ListItem } from "@rneui/base";
import { Provider, Portal } from "react-native-paper";

const MyFavoriteFileDetail = ({
  route: {
    params: { esIds, fileId, fileName },
  },
  navigation: { goBack, navigate },
}) => {
  const [tradeMarks, setTradeMarks] = useState([]);
  const [isLongPressBottomVisible, setIsLongPressBottomVisible] =
    useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const onDelete = async () => {
    await PostDeleteFavorite(
      fileId,
      selectedItem["_id"],
      selectedItem["_source"]["tmark-name"]
    );
    setIsLongPressBottomVisible(false);
    await loadDatas();
  };

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
          onLongPress={() => {
            setSelectedItem(item);
            setIsLongPressBottomVisible(true);
          }}
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
  const loadDatas = async () => {
    const data = await GetMyFavoriteFileDetail(fileId);
    setTradeMarks(data);
  };

  useEffect(() => {
    loadDatas();
  }, [navigate]);

  return (
    <Provider>
      <LgsLogo />
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
              <Portal>
                <BottomSheet
                  isVisible={isLongPressBottomVisible}
                  onBackdropPress={() => setIsLongPressBottomVisible(false)}
                >
                  <ListItem onPress={() => onDelete()}>
                    <ListItem.Content>
                      <ListItem.Title>
                        刪除{" "}
                        {selectedItem
                          ? selectedItem["_source"]["tmark-name"]
                          : null}
                        ?
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                </BottomSheet>
              </Portal>
            </ContentContainer>
          </Scroll>
        ) : (
          <View style={styles.center}>
            <Text>這個資料夾是空的</Text>
          </View>
        )}
      </Background>
    </Provider>
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
