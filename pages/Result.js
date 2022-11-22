import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { FONTS } from "../constant";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Background, ContentContainer, Scroll } from "../components/lgsScreen";
import { SearchText } from "../axios/api";
import { set } from "react-native-reanimated";
import LgsGobackButton from "../components/lgsGobackButton";

const Result = ({ navigation: { navigate, goBack }, route: { params } }) => {
  const [data, setData] = useState([]);
  const [trademarkDetail, settrademarkDetail] = useState(null);

  useEffect(() => {
    addData();
  }, []);

  const addData = () => {
    if (params.data) {
      setData(
        params.data.slice(0, Math.min(data.length + 20, params.data.length))
      );
    }
  };

  return (
    <>
      {data.length !== 0 ? (
        <Background>
          <LgsGobackButton goBack={goBack} />
          <Scroll
            contentContainerStyle={{ alignItems: "center" }}
            onScrollEndDrag={() => addData()}
          >
            <ContentContainer>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  marginVertical: 10,
                  marginLeft: 15,
                }}
              >
                {params ? params.data.length : ""} result(s) found.
              </Text>

              <View style={styles.searchResults}>
                {data.map((values, idx) => (
                  <View
                    style={{
                      ...styles.searchResultsBox,
                      marginBottom: 1,
                      // borderRightWidth: 0.5,
                    }}
                  >
                    <TouchableOpacity
                      style={styles.searchResultsButton}
                      onPress={() => {
                        settrademarkDetail(params.data[idx]);
                        navigate("ResultDetail", {
                          trademarkDetail: params.data[idx],
                        });
                      }}
                    >
                      <Image
                        source={{
                          uri:
                            "http://140.112.106.88:8082/" +
                            params.data[idx]["_source"]["tmark-image-url_1"],
                        }}
                        style={styles.searchResultsImage}
                      />
                      <Text style={styles.searchResultsText}>
                        {params.data[idx]["_source"]["tmark-name"].replace(
                          /\s*/g,
                          ""
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ContentContainer>
          </Scroll>
        </Background>
      ) : (
        <View>
          <View
            style={{
              height: "80%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>找不到結果</Text>
            <Text>試試看搜尋不同的關鍵字</Text>
          </View>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "white",
  },
  scrollView: {
    backgroundColor: "white",
  },
  searchResults: {
    // borderWidth: 1,
    width: 321,
    justifyContent: "space-between",
    backgroundColor: "#D0D0D0",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  searchResultsBox: {
    width: 160,
    height: 200,
    padding: 20,
    backgroundColor: "white",
  },
  searchResultsButton: {
    alignItems: "center",
  },
  searchResultsImage: {
    width: 150,
    height: 100,
    resizeMode: "contain",
  },
  searchResultsText: {
    marginTop: 10,
    color: "#808080",
    fontSize: 14,
  },
});
export default Result;
