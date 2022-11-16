global.Buffer = global.Buffer || require("buffer").Buffer;
import axios from "./axios";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, Alert } from "react-native";
// import { images, icons, COLORS, FONTS, SIZES } from "../constant/";

// 登入
export async function LoginToFireBase(email, password) {
  // console.log(34);
  return await axios
    .post("/login", { email: email, password: password })
    .then((res) => {
      // console.log(res);
      return res.data;
    });
}

// 註冊
export async function SignInToFireBase(email, password) {
  return await axios
    .post("/registerVerify", {
      email: email,
      password: password,
      name: "1234",
    })
    .then((res) => {
      if (res.status === 200) {
        // console.log(res.data);
        return res.data["res"]["email"];
      }
    })
    .catch((res) => {
      Alert.alert("註冊失敗，請檢查是否已註冊過");
      return;
    });
}

// 取得搜尋紀錄
export async function GetSearchingHistory(isImageSearch) {
  const userInfoStr = await AsyncStorage.getItem("@userInfo");
  const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
  // console.log(userInfo);
  if (userInfo) {
    return await axios
      .get(
        "/getHistory?userId=" +
          userInfo.userId +
          "&userType=" +
          userInfo.userType +
          "&isImageSearch=" +
          isImageSearch
      )
      .then((res) => {
        // console.log(res.data);
        return res.data;
      });
  } else {
    Alert.alert("如需使用搜尋紀錄功能，請先登入");

    return;
  }
}

// 圖片搜尋頁
export async function SearchImage(
  Image,
  photoWidth,
  photoHeight,
  indicatorX,
  indicatorY,
  searchKeywords,
  targetClasscodes,
  targetColor,
  targetApplicant,
  targetStartTime,
  targetEndTime,
  targetDraftC,
  targetDraftE,
  targetDraftJ,
  isOldImage
) {
  // console.log(Image, photoWidth, photoHeight, indicatorX, indicatorY);
  const data = new FormData();
  var initial = "Image Search";
  data.append("photoWidth", photoWidth);
  data.append("photoHeight", photoHeight);
  data.append("indicatorX", indicatorX);
  data.append("indicatorY", indicatorY);
  data.append("searchKeywords", searchKeywords);
  data.append("targetClasscodes", JSON.stringify(targetClasscodes));
  data.append("targetColor", targetColor);
  data.append("targetApplicant", targetApplicant);
  data.append("targetStartTime", targetStartTime);
  data.append("targetEndTime", targetEndTime);
  data.append("targetDraftC", targetDraftC);
  data.append("targetDraftE", targetDraftE);
  data.append("targetDraftJ", targetDraftJ);
  data.append("isOldImage", isOldImage);

  const userInfoStr = await AsyncStorage.getItem("@userInfo");
  const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
  data.append("userId", userInfo ? userInfo.userId : "1234");
  data.append("userType", userInfo ? userInfo.userType : "manual");

  if (!isOldImage) {
    const base64 = await FileSystem.readAsStringAsync(Image.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    data.append("file_attachment", base64);
  } else {
    const re = /imagelog\/\w{1,30}\/\d{4}-\d{2}-\d{2}-\d{2}:\d{2}:\d{2}.png/;
    data.append("file_attachment", re.exec(Image.uri)[0]);
  }

  return await axios
    .post("/postImageSearch", data, {
      headers: { "Content-Type": "multipart/form-data; " },
      responseType: "json",
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => {
      console.log(e);
    });
}
// 文字搜尋頁
export async function SearchText(
  searchKeywords = "",
  isSimSound = false,
  isSimShape = false,
  target_classcodes = [],
  target_color = "",
  target_applicant = "",
  target_startTime = "",
  target_endTime = ""
) {
  const data = new FormData();
  data.append("searchKeywords", searchKeywords);
  data.append("isSimSound", isSimSound);
  data.append("isSimShape", isSimShape);
  data.append("target_classcodes", JSON.stringify(target_classcodes));
  data.append("target_color", target_color);
  data.append("target_applicant", target_applicant);
  data.append("target_startTime", target_startTime);
  data.append("target_endTime", target_endTime);

  const userInfoStr = await AsyncStorage.getItem("@userInfo");
  const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
  data.append("userId", userInfo ? userInfo.userId : "1234");
  data.append("userType", userInfo ? userInfo.userType : "manual");

  return await axios
    .post("/postTextSearch", data, {
      headers: { "Content-Type": "multipart/form-data; " },
      responseType: "json",
    })
    .then((res) => {
      console.log(res.data.resultData);
      return res.data.resultData;
    })
    .catch((e) => {
      console.log("e", e);
    });
}
// 我的最愛資料夾們
export async function GetMyFavoriteFiles() {
  const userInfoStr = await AsyncStorage.getItem("@userInfo");
  const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
  if (userInfo) {
    return await axios
      .get(
        "/getMyFavoriteFile?userId=" +
          userInfo.userId +
          "&userType=" +
          userInfo.userType
      )
      .then((res) => {
        // console.log(res.data);
        return res.data;
      });
  } else {
    Alert.alert("如需使用我的最愛，請先登入");
    return;
  }
}
// 我的最愛資料夾內容
export async function GetMyFavoriteFileDetail(esIds) {
  return await axios.post("/getMyFavoriteFileDetail", { esIds }).then((res) => {
    // console.log(res.data);
    return res.data;
  });
}

// 新增我的最愛資料夾
export async function PostAddFavoriteFile(fileName) {
  const userInfoStr = await AsyncStorage.getItem("@userInfo");
  const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
  if (userInfo) {
    return await axios
      .post("/postAddMyFavoriteFile", {
        userId: userInfo.userId,
        userType: userInfo.userType,
        fileName,
      })
      .then((res) => {
        console.log(res.data["res"]["fileName"]);
      });
  } else {
    Alert.alert("如需新增我的最愛資料夾，請先登入");
  }
}
