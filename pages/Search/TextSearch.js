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
} from "react-native";
import { Checkbox } from "react-native-paper";
import { Chip, ThemeProvider, Button, CheckBox } from "react-native-elements";
import { icons, COLORS, FONTS, SIZES, classCodeList } from "../../constant";
import RNPickerSelect from "react-native-picker-select";
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

const TextSearch = ({ navigation: { navigate } }) => {
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [searchKeywords, setsearchKeywords] = React.useState("");
  const [isSimShape, setisSimShape] = React.useState(true);
  const [isSimSound, setisSimSound] = React.useState(true);
  const [target_applicant, settarget_applicant] = React.useState("");

  const [target_startTime, settarget_startTime] = React.useState("");
  const [target_endTime, settarget_endTime] = React.useState("");

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
    const data = await SearchText(
      searchKeywords,
      isSimSound,
      isSimShape,
      target_classcodes,
      target_applicant,
      target_startTime,
      target_endTime
    );
    navigate("SearchResult");
  };

  const [open, setOpen] = useState(false);
  const [target_classcodes, settarget_classcodes] = useState([]);
  const [items, setItems] = useState([
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
  ]);

  return (
    <Background>
      <Scroll>
        <ContentContainer>
          <Text style={FONTS.h1}>文字商標查詢</Text>
          <LgsTextInput
            placeholder="請輸入關鍵字"
            style={style.input}
            onSubmitEditing={Keyboard.dismiss}
            onChangeText={(query) => setsearchKeywords(query)}
            value={searchKeywords}
          />
          <View
            style={{
              ...style.input,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginBottom: 10,
            }}
          >
            <Text>字音相似</Text>
            <Checkbox
              status={isSimSound ? "checked" : "unchecked"}
              onPress={() => {
                setisSimSound(!isSimSound);
              }}
            />
            <Text>字型相似</Text>
            <Checkbox
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
            placeholder={"商標搜尋類別"}
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
          <LgsTextInput
            style={style.input}
            placeholder="輸入申請人"
            onSubmitEditing={Keyboard.dismiss}
            onChangeText={(query) => settarget_applicant(query)}
            value={target_applicant}
          />
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
              placeholder="yyyy/mm/dd"
              style={{ flex: 1, justifyContent: "flex-start" }}
            />
            <Text
              style={{
                ...FONTS.h2,
                margin: 5,
              }}
            >
              ~
            </Text>
            <LgsTextInput
              placeholder="yyy/mm/dd"
              style={{ flex: 1, justifyContent: "flex-end" }}
              onChangeText={(query) => settarget_startTime(query)}
              value={target_startTime}
            />
          </View>
          <LgsButton
            style={{ width: "100%", marginTop: 40 }}
            title="Press me"
            onPress={onSearch}
            onChangeText={(query) => settarget_endTime(query)}
            value={target_endTime}
            disabled={!searchKeywords}
          />
        </ContentContainer>
      </Scroll>
    </Background>
  );
};

export default TextSearch;
