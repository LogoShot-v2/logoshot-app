import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Background, Scroll, ContentContainer } from "../components/lgsScreen";
import * as AppleAuthentication from "expo-apple-authentication";
import LgsButton from "../components/lgsButton";
import LgsLogo from "../components/lgsLogo";
import { icons, COLORS, FONTS, SIZES, classCodeList } from "../constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation: { navigate }, route: { params } }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    const asyncFunction = async () => {
      const userInfoStr = await AsyncStorage.getItem("@userInfo");
      const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
      setName(userInfo ? userInfo.name : null);
      setImage(userInfo ? userInfo.image : null);
    };
    asyncFunction();
  }, [params, name]);

  // useEffect(() => {
  //   console.log("name", name);
  //   console.log("image", image);
  // }, [name, image]);

  const logout = async () => {
    const userInfoStr = await AsyncStorage.getItem("@userInfo");
    const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
    const userType = userInfo.userType;
    // if (userInfo.userType === "apple") {
    //   await AppleAuthentication.signOutAsync();
    //   console.log("apple");
    // }
    await AsyncStorage.removeItem("@userInfo");
    setName(null);
    setImage(null);
    Alert.alert("Logged out!");
    navigate("Home", {});
  };

  return (
    <Background>
      <LgsLogo isHome={true} name={name} image={image} logout={logout} />

      <Scroll contentContainerStyle={styles.container}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center", //Centered vertically
            justifyContent: "center",
          }}
        >
          <Image
            style={styles.imageStyle}
            source={require("../assets/Logoshot.png")}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            // backgroundColor: "red",
          }}
        >
          {name ? null : (
            <>
              <TouchableOpacity
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  backgroundColor: "#FFF5E0",
                  borderRadius: 5,
                  margin: 10,
                  width: 300,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => navigate("Login")}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                >
                  登入
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  backgroundColor: "#ffffff",
                  borderWidth: 1,
                  borderColor: "#939393", // 灰色
                  borderRadius: 5,
                  margin: 10,
                  width: 300,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => navigate("Signup")}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>註冊</Text>
              </TouchableOpacity>
            </>
          )}
          <View style={{ height: 80 }}></View>
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
    backgroundColor: "green",
  },
  imageStyle: {
    marginTop: 150,
    width: 300,
    height: 300,
  },
});
