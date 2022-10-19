global.Buffer = global.Buffer || require("buffer").Buffer;
import axios from "./axios";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { images, icons, COLORS, FONTS, SIZES } from "../constant/";

export async function LoginToFireBase(email, password) {
  return await axios
    .post("/login", { email: email, password: password })
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
}

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
    });
}

export async function SEND_IMAGE(ImageURL) {
  // Check if any file is selected or not
  if (ImageURL != null) {
    // If file selected then create FormData
    const data = new FormData();
    data.append("name", Date.now());
    // console.log("ImageURL.uri: ", ImageURL.uri);
    const base64 = await FileSystem.readAsStringAsync(ImageURL.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    data.append("file_attachment", base64);
    // Please change file upload URL

    let res = await axios.post("/function3", data, {
      headers: { "Content-Type": "multipart/form-data; " },
    });
    // console.log(res.data);
    if (res.data.status == 1) {
      alert("Upload Successful");
    }
  } else {
    // If no file selected the show alert
    alert("Please Select File first");
  }

  return;
}

export async function GET_IMAGE2() {
  return await axios
    .get("/function4", {
      responseType: "json",
    })
    .then((res) => {
      // console.log(res.data.images[0]);
      // console.log(res.data.images[1]);
      // console.log(res.data.metadatas[0]);
      // console.log(res.data.metadatas[1]);
      const metadatas = res.data.metadatas;
      const base64Images = res.data.base64Images.map(
        (base64Image) => `data:image/jpeg;base64,${base64Image}`
      );
      let photos = {
        metadatas: [],
        base64Images: [],
      };
      var steps = metadatas.length / 2;
      for (var i = 0; i < steps; i++) {
        photos.metadatas.push([metadatas[2 * i], metadatas[2 * i + 1]]);
        photos.base64Images.push([
          base64Images[2 * i],
          base64Images[2 * i + 1],
        ]);
      }
      // console.log(photos.metadatas);
      return photos;
    });
}

function ImagePreprocessing(metadatas, base64Images) {
  let photos = {
    metadatas: [],
    base64Images: [],
  };
  var steps = parseInt(metadatas.length / 2);
  for (var i = 0; i < steps; i++) {
    photos.metadatas.push([metadatas[2 * i], metadatas[2 * i + 1]]);
    photos.base64Images.push([base64Images[2 * i], base64Images[2 * i + 1]]);
  }
  return photos;
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
  targetDraftJ
) {
  console.log(Image, photoWidth, photoHeight, indicatorX, indicatorY);
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

  const userInfoStr = await AsyncStorage.getItem("@userInfo");
  const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
  console.log(userInfo);
  data.append("userId", userInfo.userId || "1234");
  data.append("userType", userInfo.userType || "manual");

  console.log("datahihi", data);

  if (Image) {
    const base64 = await FileSystem.readAsStringAsync(Image.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    data.append("file_attachment", base64);
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
export async function TextSearch(
  searchKeywords = "又昕",
  isSimSound = false,
  isSimShape = false,
  target_classcodes = ["123", "234"],
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
  console.log(userInfo);
  data.append("userId", userInfo.userId || "1234");
  data.append("userType", userInfo.userType || "manual");

  return await axios
    .post("/postTextSearch", data, {
      headers: { "Content-Type": "multipart/form-data; " },
      responseType: "json",
    })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log("e", e);
    });
}

export async function GET_IMAGE3(label) {
  return await axios
    .get("/function6", {
      responseType: "json",
      params: {
        label: label,
      },
    })
    .then((res) => {
      const base64Images = res.data.base64Images.map(
        (base64Image) => `data:image/jpeg;base64,${base64Image}`
      );
      return base64Images;
    });
}
