import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Home = ({ navigation: { navigate } }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate("Login")}>
        <Text>登入</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
