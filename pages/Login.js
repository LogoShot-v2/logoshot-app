import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Facebook from "expo-facebook";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppleAuthentication from "expo-apple-authentication";
import { LoginToFireBase, SignInToFireBase } from "../axios/api";
import LgsTextInput from "../components/lgsTextInput";
import { Background, Scroll, ContentContainer } from "../components/lgsScreen";
import LgsButton from "../components/lgsButton";
import LgsGobackButton from "../components/lgsGobackButton";
import LgsLogo from "../components/lgsLogo";

const Login = ({ navigation: { navigate } }) => {
  // 禁區----------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const facebooklogin = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "848189786592365",
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.height(500)`
        );
        const { id, name, picture } = await response.json();
        await AsyncStorage.setItem(
          "@userInfo",
          JSON.stringify({
            userId: id,
            name: name,
            token: token,
            image: picture,
            userType: "facebook",
          })
        );
        Alert.alert("Logged in!", `Hi ${name}!`);
        const localData = await AsyncStorage.getItem("@userInfo");
        navigate("Home", localData);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      console.log(message);
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  };
  const firebaselogin = async () => {
    try {
      const loginDatas = await LoginToFireBase(email, password);
      await AsyncStorage.setItem(
        "@userInfo",
        JSON.stringify({
          userId: loginDatas["res"]["userId"],
          name: email,
          userType: "firebase",
        })
      );

      const localData = await AsyncStorage.getItem("@userInfo");

      Alert.alert("Logged in!");
      navigate("Home", localData);
    } catch (e) {
      // Alert.alert(e.data);
    }
  };
  const applelogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // signed in
      if (credential.fullName.givenName) {
        await AsyncStorage.setItem(
          "@appleInfo",
          JSON.stringify(credential.fullName)
        );
      }
      const appleInfoStr = await AsyncStorage.getItem("@appleInfo");
      const appleInfo = JSON.parse(appleInfoStr);
      const name = appleInfo.givenName;
      await AsyncStorage.setItem(
        "@userInfo",
        JSON.stringify({
          userId: credential.user,
          name: name,
          userType: "apple",
        })
      );
      console.log(credential.user);
      const localData = await AsyncStorage.getItem("@userInfo");
      Alert.alert("Logged in!", `Hi ${name}!`);
      navigate("Home", localData);
    } catch (e) {
      Alert.alert("Apple Login Error !");
    }
  };

  // 禁區----------------------
  const goBack = () => {
    navigate("Home");
  };
  return (
    <Background>
      <LgsLogo />
      <LgsGobackButton goBack={goBack} />
      <Scroll>
        <ContentContainer>
          <LgsTextInput
            style={styles.input}
            placeholder={"請輸入電子郵件"}
            value={email}
            onChangeText={setEmail}
          />
          <LgsTextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder={"請輸入密碼"}
            value={password}
            onChangeText={setPassword}
          />

          <LgsButton
            style={{ marginTop: 30 }}
            title="登入 Logoshot 帳號"
            disabled={!email || !password}
            onPress={() => firebaselogin()}
          />
          <View
            style={{
              marginTop: 30,
              flexDirection: "row",
              height: 45,
              alignItems: "flex-end",
              justifyContent: "center",
              // backgroundColor: "red",
            }}
          >
            <TouchableOpacity
              style={{ ...styles.outerSourceButton, marginRight: "30%" }}
              onPress={() => applelogin()}
            >
              <Image
                source={require("../assets/apple.png")}
                style={{ width: 20, height: 22.5 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.outerSourceButton}
              onPress={() => facebooklogin()}
            >
              <Image
                source={require("../assets/facebook.png")}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
        </ContentContainer>
      </Scroll>
    </Background>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginTop: 40,
    borderRadius: 8,
  },
  outerSourceButton: {
    borderRadius: 25,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#7E7E7E",
    //
  },
});
