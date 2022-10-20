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
import { Checkbox } from "react-native-paper";
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
import { SearchImage, Searching, TextSearch } from "../axios/api";
import { Background, Scroll, ContentContainer } from "../components/lgsScreen";
import { classCodeList, FONTS, SIZES } from "../constant";
import DropDownPicker from "react-native-dropdown-picker";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

const ImageSearch = () => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [image, setImage] = useState({ uri: "" });
  const [imageWidth, setImageWidth] = useState(0);
  const [imgaeHeight, setImageHeight] = useState(0);
  const [indicatorX, setIndicatorX] = useState(0);
  const [indicatorY, setIndicatorY] = useState(0);
  const [open, setOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [advance, setAdvance] = useState(false);

  /* inputs */
  const [searchKeywords, setSearchKeywords] = useState("");
  const [targetClasscodes, setTargetClasscodes] = useState([]);
  const [targetColor, setTargetColor] = useState("");
  const [targetApplicant, setTargetApplicant] = useState("");
  const [targetStartTime, setTargetStartTime] = useState("");
  const [targetEndTime, setTargetEndTime] = useState("");
  const [targetDraftC, setTargetDraftC] = useState("");
  const [targetDraftE, setTargetDraftE] = useState("");
  const [targetDraftJ, setTargetDraftJ] = useState("");

  const [isImagePickerDrawerVisible, setIsImagePickerDrawerVisible] =
    useState(false);

  const imagePickerList = [
    {
      title: "開啟相機",
      onPress: () => pickImage("camera"),
    },
    {
      title: "從相簿中選擇",
      onPress: () => pickImage("photo"),
    },
  ];

  const colorList = [
    { label: "彩色", value: "彩色" },
    { label: "墨色", value: "墨色" },
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
    console.log(
      searchKeywords,
      targetClasscodes,
      targetColor,
      targetApplicant,
      targetStartTime,
      targetEndTime,
      targetDraftC,
      targetDraftE,
      targetDraftJ
    );
    const data = await SearchImage(
      image,
      imageWidth,
      imgaeHeight,
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
      <Background>
        <Scroll>
          <ContentContainer>
            <View style={style.statusBarBlank}></View>
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
            {/* <View style={style.input}> */}
            <LgsTextInput
              value={searchKeywords}
              onChangeText={setSearchKeywords}
              style={style.input}
              placeholder={"輸入關鍵字"}
            ></LgsTextInput>
            <DropDownPicker
              style={style.input}
              placeholder="商標搜尋類別"
              dropDownContainerStyle={{
                backgroundColor: "#ffffff",
              }}
              searchable={true}
              open={open}
              value={targetClasscodes}
              items={classCodeList}
              setOpen={setOpen}
              setValue={setTargetClasscodes}
              dropDownDirection="BOTTOM"
              theme="LIGHT"
              multiple={true}
              mode="BADGE"
              zIndex={3000}
              zIndexInverse={1000}
            />
            <DropDownPicker
              style={style.input}
              placeholder="商標色彩"
              dropDownContainerStyle={{}}
              open={colorOpen}
              value={targetColor}
              items={colorList}
              setOpen={setColorOpen}
              setValue={setTargetColor}
              dropDownDirection="BOTTOM"
              theme="LIGHT"
              multiple={false}
              mode="BADGE"
              zIndex={2000}
              zIndexInverse={2000}
            />
            <LgsTextInput
              value={targetApplicant}
              onChangeText={setTargetApplicant}
              style={style.input}
              placeholder={"輸入申請人"}
            ></LgsTextInput>
            <>
              <Text
                style={{
                  ...FONTS.h2,
                  lineHeight: 68,
                }}
              >
                商標註冊期間
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <LgsTextInput
                  value={targetStartTime}
                  onChangeText={setTargetStartTime}
                  placeholder="yyyy/mm/dd"
                  style={{ flex: 1, justifyContent: "flex-start" }}
                />
                <Text
                  style={{
                    ...FONTS.h2,
                    marginBottom: SIZES.padding / 6,
                    marginHorizontal: 10,
                  }}
                >
                  ~
                </Text>
                <LgsTextInput
                  value={targetEndTime}
                  onChangeText={setTargetEndTime}
                  placeholder="yyyy/mm/dd"
                  style={{ flex: 1, justifyContent: "flex-end" }}
                />
              </View>
            </>
            <View
              style={{
                ...style.input,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text>進階搜尋</Text>
              <Checkbox
                status={advance ? "checked" : "unchecked"}
                onPress={() => {
                  setAdvance(!advance);
                }}
              />
            </View>
            {advance ? (
              <>
                <LgsTextInput
                  value={targetDraftC}
                  onChangeText={setTargetDraftC}
                  style={style.input}
                  placeholder={"輸入圖樣中文"}
                ></LgsTextInput>
                <LgsTextInput
                  value={targetDraftE}
                  onChangeText={setTargetDraftE}
                  style={style.input}
                  placeholder={"輸入圖樣英文"}
                ></LgsTextInput>
                <LgsTextInput
                  value={targetDraftJ}
                  onChangeText={setTargetDraftJ}
                  style={style.input}
                  placeholder={"輸入圖樣日文"}
                ></LgsTextInput>
              </>
            ) : null}

            <LgsButton
              style={style.input}
              title={"搜尋"}
              onPress={onSearch}
            ></LgsButton>
            <BottomSheet
              isVisible={isImagePickerDrawerVisible}
              onBackdropPress={() => setIsImagePickerDrawerVisible(false)}
            >
              {imagePickerList.map((l, i) => (
                <ListItem
                  key={i}
                  containerStyle={l.containerStyle}
                  onPress={l.onPress}
                >
                  <ListItem.Content>
                    <ListItem.Title style={l.titleStyle}>
                      {l.title}
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </BottomSheet>
          </ContentContainer>
        </Scroll>
      </Background>
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
