import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Background, Scroll, ContentContainer } from "../components/lgsScreen";
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
    await AsyncStorage.clear();
    setName(null);
    setImage(null);
    Alert.alert("Logged out!");
    navigate("Home", {});
  };

  return (
    <Background>
      <LgsLogo />
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
          {name ? (
            <>
              {/* <TouchableOpacity
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  backgroundColor: "#406E9F",
                  borderRadius: 5,
                  marginTop: 10,
                  marginLeft: 10,
                }}
                onPress={() => logout()}
              >
                <Text>登出</Text>
              </TouchableOpacity> */}
              {image ? (
                <Image
                  source={{ uri: image.data.url }}
                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 50,
                    backgroundColor: "red",
                  }}
                />
              ) : (
                <Image
                  source={require("../assets/userlogin.png")}
                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 50,
                    backgroundColor: "#ffffff",
                  }}
                />
              )}
              <Text
                style={{
                  // backgroundColor: "#ffffff",
                  textAlign: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  margin: 10,
                  width: image ? undefined : "60%",
                }}
                numberOfLines={1}
                ellipsizeMode={"tail"}
              >
                {name}
              </Text>
              <TouchableOpacity
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  backgroundColor: "#406E9F",
                  borderRadius: 5,
                  width: 300,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => logout()}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                >
                  登出
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  backgroundColor: "#406E9F",
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
