import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Background, Scroll, ContentContainer } from "../components/lgsScreen";
import LgsButton from "../components/lgsButton";
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
      <Scroll contentContainerStyle={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 30,
            margintop: 40,
            // marginRight: 40,
          }}
        >
          <Text style={{ ...FONTS.h1 }}>Logoshot</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
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
                      height: 30,
                      width: 30,
                      borderRadius: 15,
                      backgroundColor: "red",
                    }}
                  />
                ) : null}
                <Text
                  style={{
                    backgroundColor: "#ffffff",
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
                    marginRight: 10,
                    // marginTop: 10,
                  }}
                  onPress={() => logout()}
                >
                  <Text style={{ fontSize: 20 }}>登出</Text>
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
                  }}
                  onPress={() => navigate("Login")}
                >
                  <Text style={{ fontSize: 20 }}>登入</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    backgroundColor: "#ffffff",
                    borderRadius: 5,
                    margin: 10,
                  }}
                  onPress={() => navigate("Signup")}
                >
                  <Text style={{ fontSize: 20 }}>註冊</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
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
    width: 300,
    height: 300,
  },
});
