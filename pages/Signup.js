import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Facebook from "expo-facebook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginToFireBase, SignInToFireBase } from "../axios/api";
import LgsTextInput from "../components/lgsTextInput";
import { Background, Scroll, ContentContainer } from "../components/lgsScreen";
import LgsButton from "../components/lgsButton";
import LgsGobackButton from "../components/lgsGobackButton";
import LgsLogo from "../components/lgsLogo";

const Signup = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = async () => {
    const signInStatus = await SignInToFireBase(email, password);

    if (signInStatus) {
      Alert.alert(
        `驗證信已寄至${signInStatus}，請至信箱中點擊連結完成驗證。（請小心，驗證信有可能會被信箱中被歸類為垃圾信件）`
      );
      navigate("Home");
    }
  };

  const goBack = async () => {
    navigate("Home");
  };
  return (
    <Background>
      <LgsLogo />
      <LgsGobackButton goBack={goBack} />
      <Scroll>
        <ContentContainer>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* <TouchableOpacity onPress={() => logout()}>
              <Text>logout</Text>
            </TouchableOpacity> */}
          </View>
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
            title="註冊 Logoshot 帳號"
            disabled={!email || !password}
            onPress={() => signIn()}
          />
        </ContentContainer>
      </Scroll>
    </Background>
  );
};

export default Signup;
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
});
