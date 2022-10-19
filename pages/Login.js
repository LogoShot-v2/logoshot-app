import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Facebook from "expo-facebook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginToFireBase, SignInToFireBase } from "../axios/api";
import LgsTextInput from "../components/lgsTextInput";
import { Background, Scroll, ContentContainer } from "../components/lgsScreen";

const Login = () => {
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
        console.log("localData", localData);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
  const firebaselogin = async () => {
    try {
      const loginDatas = await LoginToFireBase(email, password);
      console.log("hi", loginDatas);
      await AsyncStorage.setItem(
        "@userInfo",
        JSON.stringify({
          userId: loginDatas["res"]["userId"],
          name: email,
          userType: "firebase",
        })
      );

      const localData = await AsyncStorage.getItem("@userInfo");
      console.log("localData", localData);
      Alert.alert("Logged in!");
    } catch (e) {
      console.log(e.data);
      alert(e.data);
    }
  };

  const signIn = async () => {
    const signInStatus = await SignInToFireBase(email, password);
    console.log(signInStatus);
    Alert.alert(
      `驗證信已寄至${signInStatus}，請至信箱中點擊連結完成驗證。（請小心，驗證信有可能會被信箱中被歸類為垃圾信件）`
    );
  };

  const logout = async () => {
    await AsyncStorage.clear();
    console.log("logout clear:", await AsyncStorage.getAllKeys());
  };
  // 禁區----------------------

  return (
    <Background>
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
            placeholder={"請輸入密碼"}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => facebooklogin()}>
            <Text>FaceBooklogin</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => firebaselogin()}>
            <Text>login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => logout()}>
            <Text>logout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => signIn()}>
            <Text>signIn</Text>
          </TouchableOpacity>
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
    marginTop: 10,
    borderRadius: 8,
  },
});
