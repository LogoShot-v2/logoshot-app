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
import { Scroll } from "../components/lgsScreen";
import { SearchText } from "../axios/api";
import { set } from "react-native-reanimated";

const Array = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

const Result = ({ navigation: { navigate }, route: { params } }) => {
  const [datesBactches, setDatesBactches] = useState(null);
  const [trademarkDetail, settrademarkDetail] = useState(null);

  useEffect(() => {
    setDatesBactches(params);
    // console.log("up")
    // console.log(params.data[12]["_source"]["tmark-image-url_1"])
    // //console.log(params)
    // console.log(datesBactches)
    // console.log("down")
  }, [params]);

  return (
    <>
      {datesBactches?.data.length !== 0 ? (
        <View style={styles.container}>
          <Scroll>
            <View style={styles.searchResults}>
              {datesBactches ? (
                <>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      marginVertical: 10,
                      marginLeft: 15,
                    }}
                  >
                    {datesBactches ? datesBactches.data.length : ""} result(s)
                    found.
                  </Text>
                  {Array.map((values, idx) => (
                    <View
                      style={
                        idx === 0
                          ? styles.searchResultsRow
                          : { ...styles.searchResultsRow, borderTopWidth: 1 }
                      }
                      key={idx}
                    >
                      <View
                        style={{
                          ...styles.searchResultsBox,
                          borderRightWidth: 1,
                        }}
                      >
                        <TouchableOpacity
                          style={styles.searchResultsButton}
                          onPress={() => {
                            settrademarkDetail(datesBactches.data[2 * idx]);
                            navigate("ResultDetail", {
                              trademarkDetail: datesBactches.data[2 * idx],
                            });
                          }}
                        >
                          <Image
                            source={{
                              uri:
                                "http://140.112.106.88:8082/" +
                                datesBactches.data[2 * idx]["_source"][
                                  "tmark-image-url_1"
                                ],
                            }}
                            style={styles.searchResultsImage}
                          />
                          <Text style={styles.searchResultsText}>
                            {datesBactches.data[2 * idx]["_source"][
                              "tmark-name"
                            ].replace(/\s*/g, "")}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.searchResultsBox}>
                        <TouchableOpacity
                          style={styles.searchResultsButton}
                          onPress={() => {
                            navigate("ResultDetail", {
                              trademarkDetail: datesBactches.data[2 * idx + 1],
                            });
                          }}
                        >
                          <Image
                            source={{
                              uri:
                                "http://140.112.106.88:8082/" +
                                datesBactches.data[2 * idx + 1]["_source"][
                                  "tmark-image-url_1"
                                ],
                            }}
                            style={styles.searchResultsImage}
                          />
                          <Text style={styles.searchResultsText}>
                            {datesBactches.data[2 * idx + 1]["_source"][
                              "tmark-name"
                            ].replace(/\s*/g, "")}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </>
              ) : null}
            </View>
          </Scroll>
        </View>
      ) : (
        <View>
          <View
            style={{
              height: "80%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ ...FONTS.largeTitle }}>找不到結果</Text>
            <Text style={{ ...FONTS.h1 }}>試試看搜尋不同的關鍵字</Text>
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
    borderWidth: 1,
    backgroundColor: "white",
  },
  searchResultsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchResultsBox: {
    flex: 1,
    padding: 20,
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
