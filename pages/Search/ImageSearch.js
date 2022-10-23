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
import LgsTextInput from "../../components/lgsTextInput";
import LgsPhotoIndicator from "../../components/lgsPhotoIndicator";
// import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LgsButton from "../../components/lgsButton";
import { SearchImage, Searching, TextSearch } from "../../axios/api";
import {
  Background,
  Scroll,
  ContentContainer,
} from "../../components/lgsScreen";
import { classCodeList, FONTS, SIZES } from "../../constant";
import DropDownPicker from "react-native-dropdown-picker";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from "./style";
const ImageSearch = ({ route: { params } }) => {
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
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);
  const [isOldImage, setIsOldImage] = useState(true);

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

    if (!result.cancelled) {
      setImage(result);
      setIsImagePickerDrawerVisible(false);
      setIsOldImage(false);
    }
  };

  const setIndicator = (x, y) => {
    setIndicatorX(x);
    setIndicatorY(y);
  };

  const onSearch = async () => {
    // console.log(
    //   searchKeywords,
    //   targetClasscodes,
    //   targetColor,
    //   targetApplicant,
    //   targetStartTime,
    //   targetEndTime,
    //   targetDraftC,
    //   targetDraftE,
    //   targetDraftJ,
    //   isOldImage
    // );
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
      targetDraftJ,
      isOldImage
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
    if (!advance) {
      setTargetDraftC("");
      setTargetDraftE("");
      setTargetDraftJ("");
    }
  }, [advance]);

  useEffect(() => {
    const asyncfunction = async () => {
      const userInfoStr = await AsyncStorage.getItem("@userInfo");
      const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
      setSearchKeywords(params["searchKeywords"]);
      setTargetClasscodes(params["targetClasscodes"]);
      setTargetColor(params["targetColor"]);
      setTargetApplicant(params["targetApplicant"]);
      setTargetStartTime(params["targetStartTime"]);
      setTargetEndTime(params["targetEndTime"]);
      setTargetDraftC(params["targetDraftC"]);
      setTargetDraftE(params["targetDraftE"]);
      setTargetDraftJ(params["targetDraftJ"]);
      setImage({
        uri:
          "http://140.112.106.82:8081/imagelog/" +
          userInfo.userId +
          "/" +
          params["formatSearchTime"] +
          ".png",
      });
      setIndicatorX(Number(params["indicatorX"]));
      setIndicatorY(Number(params["indicatorY"]));
      setInitialX(Number(params["indicatorX"]));
      setInitialY(Number(params["indicatorY"]));
      setImageHeight(Number(params["photoHeight"]));
      setImageWidth(Number(params["photoWidth"]));
      setIsOldImage(true);
    };
    asyncfunction();
  }, [params]);

  return (
    <>
      <Background>
        <Scroll>
          <ContentContainer>
            <Text style={FONTS.h1}>圖片搜尋</Text>
            {image.uri ? (
              <>
                <LgsPhotoIndicator
                  initialX={initialX}
                  initialY={initialY}
                  width={imageWidth}
                  height={imgaeHeight}
                  setWidth={setImageWidth}
                  setHeight={setImageHeight}
                  setIndicator={setIndicator}
                  style={style.photoIndicator}
                  source={image}
                ></LgsPhotoIndicator>
                <View
                  style={{
                    ...style.input,
                    borderWidth: 0,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={style.blueText}>請將十字移動至商標中心</Text>
                  <TouchableOpacity
                    onPress={() => setIsImagePickerDrawerVisible(true)}
                  >
                    <Image
                      source={require("../../assets/readdImageButton.png")}
                      style={style.readdImageButton}
                    />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <TouchableOpacity
                style={style.imagePickerButton}
                onPress={() => setIsImagePickerDrawerVisible(true)}
              >
                <Image
                  source={require("../../assets/addImageButton.png")}
                  style={style.addImageButtonImage}
                />
              </TouchableOpacity>
            )}

            <DropDownPicker
              placeholder="商標搜尋類別"
              containerStyle={style.input}
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
              placeholder="商標色彩"
              containerStyle={style.input}
              open={colorOpen}
              value={targetColor}
              items={colorList}
              setOpen={setColorOpen}
              setValue={setTargetColor}
              dropDownDirection="BOTTOM"
              theme="LIGHT"
              multiple={false}
              mode="BADGE"
              zIndex={990}
              zIndexInverse={3000}
            />
            <LgsTextInput
              value={searchKeywords}
              onChangeText={setSearchKeywords}
              style={style.input}
              placeholder={"輸入關鍵字"}
            ></LgsTextInput>
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
              <View style={style.rangeContainer}>
                <LgsTextInput
                  value={targetStartTime}
                  onChangeText={setTargetStartTime}
                  placeholder="yyyy/mm/dd"
                  style={{ flex: 1, justifyContent: "flex-start" }}
                />
                <Text
                  style={{
                    marginHorizontal: 6,
                    textAlignVertical: "center",
                    alignSelf: "center",
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
                borderWidth: 0,
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
              style={{ ...style.input, borderWidth: 0 }}
              title={"搜尋"}
              onPress={onSearch}
              disabled={!image.uri}
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

export default ImageSearch;