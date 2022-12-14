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
  Navigator,
  Pressable,
  ActivityIndicator,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { DateTimePicker } from "@react-native-community/datetimepicker";
import DatePicker from "react-native-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Checkbox } from "react-native-paper";
import { Chip, ThemeProvider, Button, CheckBox } from "react-native-elements";
import { icons, COLORS, FONTS, SIZES, classCodeList } from "../../constant";
import RNPickerSelect from "react-native-picker-select";
import LgsLogo from "../../components/lgsLogo";
import LgsTextInput from "../../components/lgsTextInput";
import LgsCheckbox from "../../components/lgsCheckbox";
import LgsButton from "../../components/lgsButton";
import { RotateInDownLeft } from "react-native-reanimated";
import {
  Background,
  Scroll,
  ContentContainer,
} from "../../components/lgsScreen";

import { SearchText } from "../../axios/api";
import DropDownPicker from "react-native-dropdown-picker";
import style from "./style";
import LgsDatePicker from "../../components/LgsDatePicker";
import { DateTime } from "luxon";
const TextSearch = ({ navigation: { navigate }, route: { params } }) => {
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [searchKeywords, setsearchKeywords] = useState("");
  const [isSimShape, setisSimShape] = useState(false);
  const [isSimSound, setisSimSound] = useState(false);
  const [targetColor, setTargetColor] = useState("");
  const [target_applicant, settarget_applicant] = useState("");
  const [targetDraftC, setTargetDraftC] = useState("");
  const [targetDraftE, setTargetDraftE] = useState("");
  const [targetDraftJ, setTargetDraftJ] = useState("");
  const [date, setDate] = useState();

  const [target_startTime, settarget_startTime] = useState(
    DateTime.fromFormat("2000-01-01", "yyyy-mm-dd").toFormat("yyyy/MM/dd")
  );
  const [target_endTime, settarget_endTime] = useState(
    DateTime.now().toFormat("yyyy/MM/dd")
  );

  const [isLoading, setIsLoading] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [advance, setAdvance] = useState(false);
  const colorList = [
    { label: "??????", value: "??????" },
    { label: "??????", value: "??????" },
  ];

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
  const onSearch = async () => {
    setIsLoading(true);
    let data = await SearchText(
      searchKeywords,
      isSimSound,
      isSimShape,
      target_classcodes,
      targetColor,
      target_applicant,
      target_startTime,
      target_endTime,
      targetDraftC,
      targetDraftE,
      targetDraftJ
    );
    if (data) {
      setIsLoading(false);
      navigate("Result", { data: data });
    } else {
      setIsLoading(false);
      Alert.alert("????????????");
    }
    // data = null;
  };

  const [open, setOpen] = useState(false);
  const [target_classcodes, settarget_classcodes] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    //console.log("params", params);
    if (params) {
      if (
        params["targetDraftC"] ||
        params["targetDraftE"] ||
        params["targetDraftJ"]
      ) {
        setAdvance(true);
      }
      setsearchKeywords(params["searchKeywords"]);
      setisSimShape(params["isSimShape"]);
      setisSimSound(params["isSimSound"]);
      setTargetColor(params["targetColor"]);
      settarget_applicant(params["targetApplicant"]);
      settarget_startTime(params["targetStartTime"]);
      settarget_endTime(params["targetEndTime"]);
      settarget_classcodes(params["targetClasscodes"]);
      setTimeout(() => {
        setTargetDraftC(params["targetDraftC"]);
        setTargetDraftE(params["targetDraftE"]);
        setTargetDraftJ(params["targetDraftJ"]);
      });
    }
  }, [params]);

  useEffect(() => {
    if (!advance) {
      setTargetDraftC("");
      setTargetDraftE("");
      setTargetDraftJ("");
    }
  }, [advance]);

  return (
    <Background>
      <LgsLogo />
      <Scroll>
        <ContentContainer>
          <View style={{ height: 50 }}></View>
          <LgsTextInput
            placeholder="??????????????????"
            style={{ ...style.input, marginTop: 20 }}
            onSubmitEditing={Keyboard.dismiss}
            onChangeText={setsearchKeywords}
            value={searchKeywords}
          />
          <View
            style={{
              ...style.input,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              // marginBottom: 10,
            }}
          >
            <Text>????????????</Text>
            <LgsCheckbox
              status={isSimSound ? "checked" : "unchecked"}
              onPress={() => {
                setisSimSound(!isSimSound);
              }}
            />
            <Text>????????????</Text>
            <LgsCheckbox
              status={isSimShape ? "checked" : "unchecked"}
              onPress={() => {
                setisSimShape(!isSimShape);
              }}
              color={"green"}
            />
          </View>
          <DropDownPicker
            dropDownContainerStyle={{
              backgroundColor: "#ffffff",
            }}
            style={{ ...style.input, borderColor: "#FFFFFF" }}
            badgeStyle={{
              padding: 5,
              // backgroundColor: "red",
            }}
            badgeTextStyle={{
              width: 100,
              height: 20,
              fontSize: 8,
            }}
            bad
            placeholder={"??????????????????"}
            searchable={true}
            open={open}
            value={target_classcodes}
            items={classCodeList}
            setOpen={setOpen}
            setValue={settarget_classcodes}
            setItems={setItems}
            dropDownDirection="AUTO"
            theme="LIGHT"
            multiple={true}
            mode="BADGE"
          />
          <DropDownPicker
            style={{ ...style.input, borderColor: "#FFFFFF" }}
            placeholder="????????????"
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
            style={style.input}
            placeholder="???????????????"
            onSubmitEditing={Keyboard.dismiss}
            onChangeText={settarget_applicant}
            value={target_applicant}
          />
          <Text
            style={{
              ...FONTS.h4,
              lineHeight: 50,
              alignSelf: "center",
            }}
          >
            ????????????????????????
          </Text>
          <View style={style.rangeContainer}>
            <LgsDatePicker
              value={target_startTime}
              onChange={settarget_startTime}
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
            <LgsDatePicker
              value={target_endTime}
              onChange={settarget_endTime}
            />
          </View>
          <View
            style={{
              ...style.input,
              borderWidth: 0,
              flexDirection: "row",
              marginTop: 20,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "#406E9F", fontWeight: "bold" }}>
              {" "}
              ????????????
            </Text>
            <LgsCheckbox
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
                placeholder={"??????????????????"}
              ></LgsTextInput>
              <LgsTextInput
                value={targetDraftE}
                onChangeText={setTargetDraftE}
                style={style.input}
                placeholder={"??????????????????"}
              ></LgsTextInput>
              <LgsTextInput
                value={targetDraftJ}
                onChangeText={setTargetDraftJ}
                style={style.input}
                placeholder={"??????????????????"}
              ></LgsTextInput>
            </>
          ) : null}
          <LgsButton
            style={{ ...style.input, borderWidth: 0 }}
            title="??????"
            onPress={() => onSearch()}
            onChangeText={settarget_endTime}
            value={target_endTime}
            disabled={
              (searchKeywords !== "") & (isLoading !== true) ? false : true
            }
          />
          {isLoading ? <ActivityIndicator /> : null}
        </ContentContainer>
        <View style={{ minHeight: 60 }}></View>
      </Scroll>
    </Background>
  );
};

export default TextSearch;
