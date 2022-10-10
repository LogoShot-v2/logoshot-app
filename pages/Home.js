import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Background, Scroll, ContentContainer } from "../components/lgsScreen";

import { icons, COLORS, FONTS, SIZES } from "../constant";

const Home = ({ navigation: { navigate } }) => {
  return (
    <Background>
      <Scroll contentContainerStyle={styles.container}>
        <Text>Logoshot</Text>
        <Image
          style={[styles.imageStyle, styles.center]}
          source={require('../assets/Logoshot.png')} />


        <TouchableOpacity
          onPress={() => navigate("Login")}>
          <Text >登入</Text>
        </TouchableOpacity>

      </Scroll>

    </Background>

  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {


    alignItems: 'center', //Centered vertically

    //backgroundColor: 'green'
  },
  imageStyle: {


    width: 300,
    height: 300,

  },
});
