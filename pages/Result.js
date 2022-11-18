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


const Array = [1, 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]



const Result = ({ navigation: { navigate }, route: { params } }) => {
  const [datesBactches, setDatesBactches] = useState(null);
  const [trademarkDetail, settrademarkDetail] = useState(null);

  useEffect(() => {   
     setDatesBactches(params);
    {params.data.length>1000?(params.data = params.data.slice(0,1000)):(null)}
      console.log("hello world")
      // console.log(params.data[12]["_source"]["tmark-image-url_1"])
      console.log(params.data.length)
      // console.log(datesBactches)
      // console.log("down")
  }, []);

  return (
    <>
{params.data !== null ?(
      <View style={styles.container}>
      <Scroll>
      <Text style={{ fontWeight: "bold", fontSize: 18, marginVertical: 10, marginLeft: 15 }}>{params? params.data.length: '' } result(s) found.</Text>

        <View style={styles.searchResults}>
          {params.data.map((values, idx) => (
            <View style={idx === 0 ? styles.searchResultsRow : { ...styles.searchResultsRow, borderTopWidth: 1 , }} key={idx}>
              <View style={{ ...styles.searchResultsBox, borderRightWidth: 0.5,}}>
                <TouchableOpacity
                  style={styles.searchResultsButton}
                  onPress={() => {
                    settrademarkDetail (params.data[idx]) ;
                    navigate("ResultDetail", {trademarkDetail: params.data[idx]});
                  }}
                >
                  <Image source={{
                    uri:
                      "http://140.112.106.88:8082/"
                      + params.data[idx]["_source"]["tmark-image-url_1"]

                  }}
                    style={styles.searchResultsImage} />
                  <Text style={styles.searchResultsText}>{params.data[idx]["_source"]["tmark-name"].replace(/\s*/g,"")}</Text>
                </TouchableOpacity>
              </View>
          
            </View>
          ))}
        
        
        </View>
      </Scroll>
    </View>):( 
    <View>
      <View style={{ height: "80%", alignItems: "center", justifyContent: "center" }}>
        <Text >找不到結果</Text>
        <Text>試試看搜尋不同的關鍵字</Text>
      </View>
    </View>)}   
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
    flexDirection: "row",
    flexWrap: "wrap"
    
  
  },
  searchResultsRow: {
    flexDirection: "row",
    justifyContent: "space-between",

  },
  searchResultsBox: {
 
    width: 160,
    height: 200,
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
