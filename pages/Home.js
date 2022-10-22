import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Background, Scroll, ContentContainer } from "../components/lgsScreen";
import LgsButton from "../components/lgsButton";
import { icons, COLORS, FONTS, SIZES, classCodeList } from "../constant";



const Home = ({ navigation: { navigate } }) => {
  return (
    <Background>
      <Scroll contentContainerStyle={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: 'center',
            marginLeft: 30,
            margintop: 40,
            marginRight: 40,
          }}
        >
          <Text
            style={{ ...FONTS.h1, }}
          >Logoshot</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: 'flex-end',

            }}>
            <TouchableOpacity
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: '#406E9F',
                borderRadius: 5,
                margin: 10,

              }}

              onPress={() => navigate("Login")}>
              <Text>登入</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style=
              {{
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: '#ffffff',
                borderRadius: 5,
                margin: 10,
              }}
              onPress={() => navigate("Signup")}>
              <Text>註冊</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: "center", //Centered vertically
            justifyContent: "center",


          }}
        >
          <Image
            style={styles.imageStyle}
            source={require("../assets/Logoshot.png")}
          />
        </View>

      </Scroll>
    </Background>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    //backgroundColor: 'green'
  },
  center: {
    alignItems: "center", //Centered vertically
    justifyContent: "center",
    backgroundColor: 'green'


  },
  imageStyle: {
    width: 300,
    height: 300,
  },
});
