import * as React from "react";
import { useState, useEffect } from "react";
import {
  Keyboard,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ImageStore,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheet, ListItem } from "@rneui/themed";
import { Chip, ThemeProvider, Button } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import LgsTextInput from "../components/lgsTextInput";
import LgsPhotoIndicator from "../components/lgsPhotoIndicator";
// import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LgsButton from "../components/lgsButton";
import { SearchImage, Searching } from "../axios/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ImageSearch = () => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [image, setImage] = useState({ uri: "" });
  const [imageWidth, setImageWidth] = useState(0);
  const [imgaeHeight, setImageHeight] = useState(0);
  const [indicatorX, setIndicatorX] = useState(0);
  const [indicatorY, setIndicatorY] = useState(0);

  /* inputs */
  const [type, setType] = useState("");
  const [path, setPath] = useState("");

  const [isImagePickerDrawerVisible, setIsImagePickerDrawerVisible] =
    useState(false);

  const list = [
    {
      title: "開啟相機",
      onPress: () => pickImage("camera"),
    },
    {
      title: "從相簿中選擇",
      onPress: () => pickImage("photo"),
    },
  ];

  const pickImage = async (chooseType) => {
    let result;
    switch (chooseType) {
      case "photo":
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
        break;
      case "camera":
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
        break;
    }

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
      setIsImagePickerDrawerVisible(false);
    }
  };

  const setIndicator = (x, y) => {
    setIndicatorX(x);
    setIndicatorY(y);
  };

  const onSearch = async () => {
    // await Searching("", "google", [true, true, true, true]);
    const userInfoStr = await AsyncStorage.getItem("@userInfo");
    const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
    const data = await SearchImage(
      image,
      imageWidth,
      imgaeHeight,
      indicatorX,
      indicatorY,
      userInfo.userId ? userInfo.userId : "1234"
    );
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  useEffect(() => {
    console.log("back param", imageWidth, imgaeHeight, indicatorX, indicatorY);
  }, [imageWidth, imgaeHeight, indicatorX, indicatorY]);

  return (
    <>
      <View style={style.statusBarBlank}></View>
      <ScrollView style={style.container}>
        <LgsButton
          style={style.input}
          title={"新增圖片"}
          onPress={() => setIsImagePickerDrawerVisible(true)}
        ></LgsButton>
        <LgsPhotoIndicator
          width={imageWidth}
          height={imgaeHeight}
          setWidth={setImageWidth}
          setHeight={setImageHeight}
          setIndicator={setIndicator}
          style={style.input}
          source={image}
        ></LgsPhotoIndicator>
        <LgsTextInput
          style={style.input}
          placeholder={"應用商品類別"}
        ></LgsTextInput>
        <LgsTextInput
          style={style.input}
          placeholder={"商標色彩"}
        ></LgsTextInput>
        <LgsTextInput
          style={style.input}
          placeholder={"輸入商標路徑"}
        ></LgsTextInput>
        <LgsTextInput
          style={style.input}
          placeholder={"輸入申請人"}
        ></LgsTextInput>
        <LgsButton
          style={style.input}
          title={"搜尋"}
          onPress={onSearch}
        ></LgsButton>
        <BottomSheet
          isVisible={isImagePickerDrawerVisible}
          onBackdropPress={() => setIsImagePickerDrawerVisible(false)}
        >
          {list.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={l.onPress}
            >
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
      </ScrollView>
    </>
  );
};
const style = StyleSheet.create({
  statusBarBlank: {
    height: StatusBar.currentHeight,
    // backgroundColor: "red",
  },
  image: {
    marginTop: 10,
    //backgroundColor: "red",
  },
  container: {
    paddingHorizontal: 36,
    // paddingTop: StatusBar.currentHeight,
  },
  input: {
    marginTop: 10,
    // backgroundColor: "yellow",
  },
  twoinput: {
    // flex: 1,
    width: "45%",
    height: 40,
    borderWidth: 0.5,
    borderRadius: 20,
  },

  status: {
    padding: 10,
    textAlign: "center",
  },
});

export default ImageSearch;
