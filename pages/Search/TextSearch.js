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
import { async } from "rxjs";
import LgsDatePicker from "../../components/LgsDatePicker";
import { DateTime } from "luxon";
const TextSearch = ({ navigation: { navigate }, route: { params } }) => {
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [searchKeywords, setsearchKeywords] = React.useState("");
  const [isSimShape, setisSimShape] = React.useState(false);
  const [isSimSound, setisSimSound] = React.useState(false);
  const [target_applicant, settarget_applicant] = React.useState("");
  const [date, setDate] = useState();

  const [target_startTime, settarget_startTime] = useState(
    DateTime.fromFormat("2010-01-01", "yyyy-mm-dd").toFormat("yyyy/MM/dd")
  );
  const [target_endTime, settarget_endTime] = useState(
    DateTime.now().toFormat("yyyy/MM/dd")
  );
  const [isLoading, setIsLoading] = useState(false);

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
      "",
      target_applicant,
      target_startTime,
      target_endTime
    );
    if (data) {
      setIsLoading(false);
      navigate("Result", { data: data });
    } else {
      setIsLoading(false);
      Alert.alert("搜尋失敗");
    }
    // data = null;
  };

  const [open, setOpen] = useState(false);
  const [target_classcodes, settarget_classcodes] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    //console.log("params", params);
    if (params) {
      setsearchKeywords(params["searchKeywords"]);
      setisSimShape(params["isSimShape"]);
      setisSimSound(params["isSimSound"]);
      settarget_applicant(params["targetApplicant"]);
      settarget_startTime(params["targetStartTime"]);
      settarget_endTime(params["targetEndTime"]);
      settarget_classcodes(params["targetClasscodes"]);
    }
  }, [params]);

  return (
    <Background>
      <Scroll>
        <ContentContainer>
          <Text style={FONTS.h1}>文字商標查詢</Text>
          <LgsTextInput
            placeholder="請輸入關鍵字"
            style={style.input}
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
              marginBottom: 10,
            }}
          >
            <Text>字音相似</Text>
            <LgsCheckbox
              status={isSimSound ? "checked" : "unchecked"}
              onPress={() => {
                setisSimSound(!isSimSound);
              }}
            />
            <Text>字型相似</Text>
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
            badgeStyle={{
              padding: 5,
              backgroundColor: "red",
            }}
            badgeTextStyle={{
              width: 100,
              height: 20,
              fontSize: 8,
            }}
            bad
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
            onChangeText={settarget_applicant}
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
              alignItems: "center",
              // backgroundColor: "green",
            }}
          >
            {Platform.OS === "android" ? (
              <LgsDatePicker
                value={target_startTime}
                onChange={settarget_startTime}
              />
            ) : (
              <DatePicker
                date={target_startTime}
                mode="date"
                placeholder="select date"
                format="YYYY/MM/DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  flex: 1,
                  dateIcon: {
                    position: "relative",
                    // right: -5,
                    // top: 4,
                    // marginLeft: 0,
                  },
                  dateInput: {
                    borderColor: "gray",
                    alignItems: "flex-start",
                    borderWidth: 0,
                    borderBottomWidth: 1,
                  },
                  placeholderText: {
                    fontSize: 17,
                    color: "gray",
                  },
                  dateText: {
                    fontSize: 17,
                  },
                }}
                onDateChange={(date) => {
                  console.log(date);
                  settarget_startTime(date);
                }}
              />
            )}

            <Text
              style={{
                ...FONTS.h2,
                margin: 5,
              }}
            >
              ~
            </Text>
            {Platform.OS === "android" ? (
              <LgsDatePicker
                value={target_endTime}
                onChange={settarget_endTime}
              />
            ) : (
              <DatePicker
                date={target_endTime}
                mode="date"
                placeholder="select date"
                format="YYYY/MM/DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  flex: 1,
                  alignItems: "flex-end",
                  dateIcon: {
                    position: "relative",
                    // right: -5,
                    // top: 4,
                    // marginLeft: 0,
                  },
                  dateInput: {
                    borderColor: "gray",
                    alignItems: "flex-start",
                    borderWidth: 0,
                    borderBottomWidth: 1,
                  },
                  placeholderText: {
                    fontSize: 17,
                    color: "gray",
                  },
                  dateText: {
                    fontSize: 17,
                  },
                }}
                onDateChange={(date) => {
                  console.log(date);
                  settarget_endTime(date);
                }}
              />
            )}
          </View>
          <LgsButton
            style={{ width: "100%", marginTop: 40 }}
            title="搜尋"
            onPress={() => onSearch()}
            onChangeText={settarget_endTime}
            value={target_endTime}
            disabled={
              (searchKeywords !== "") & (isLoading !== true) ? false : true
            }
          />

          {isLoading ? <ActivityIndicator /> : null}
        </ContentContainer>
      </Scroll>
    </Background>
  );
};

export default TextSearch;
