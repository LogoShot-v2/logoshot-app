import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList, StatusBar, TouchableOpacity } from "react-native";
import { Scroll } from "../components/lgsScreen";


const Array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const Result = () => {


  return (
    <View style={styles.container}>
      <Scroll>
        <View style={styles.searchResults}>
          {Array.map((values, idx) => (
            <View style={idx === 0 ? styles.searchResultsRow : { ...styles.searchResultsRow, borderTopWidth: 1 }} key={idx}>
              <View style={{ ...styles.searchResultsBox, borderRightWidth: 1 }}>
                <TouchableOpacity
                  style={styles.searchResultsButton}
                  onPress={() => {
                    // navigation.push("ResultDetail", { uri: values[0], metadatas: photos.metadatas[idx][0] });
                  }}
                >
                  <Image source={require("../assets/Logoshot.png")} style={styles.searchResultsImage} />
                  <Text style={styles.searchResultsText}>1</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.searchResultsBox}>
                <TouchableOpacity
                  style={styles.searchResultsButton}
                  onPress={() => {
                    // navigation.push("ResultDetail", { uri: values[1], metadatas: photos.metadatas[idx][1] });
                  }}
                >
                  <Image source={require("../assets/Logoshot.png")} style={styles.searchResultsImage} />
                  <Text style={styles.searchResultsText}>2</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </Scroll>
    </View>
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
    fontSize: 16,
  },
});
export default Result;
