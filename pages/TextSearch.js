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
  Navigatorㄝ
} from "react-native";
import { Checkbox } from "react-native-paper";
import { Chip, ThemeProvider, Button, CheckBox } from "react-native-elements";
import { icons, COLORS, FONTS, SIZES } from "../constant";
import RNPickerSelect from "react-native-picker-select";
import LgsTextInput from "../components/lgsTextInput";
import LgsCheckbox from "../components/lgsCheckbox";
import LgsButton from "../components/lgsButton";
import { RotateInDownLeft } from "react-native-reanimated";
import { Background, Scroll, ContentContainer } from "../components/lgsScreen";

import { SearchText } from "../axios/api";
import DropDownPicker from "react-native-dropdown-picker";


const TextSearch = ({ navigation: { navigate } }) => {
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [checkedW, setCheckedW] = React.useState(true);

  const [checkedS, setCheckedS] = React.useState(true);
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
    // const data = await SearchText(
    //   searchQuery,
    // );
    // console.log(data);
    // console.log(searchQuery);

    navigate("SearchResult")
    console.log(checkedW)


  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
  const [items, setItems] = useState([

    { label: '1', value: '1' },

    { label: '2', value: '2' },

    { label: '3', value: '3' },

    { label: '4', value: '4' },

    { label: '5', value: '5' },

    { label: '6', value: '6' },

    { label: '7', value: '7' },

    { label: '8', value: '8' },

    { label: '9', value: '9' },

    { label: '10', value: '10' },
  ]);


  return (
    <Background>
      <ContentContainer>

        <View >
          <View style={{ marginTop: 35, paddingHorizontal: 20 }}>

            <LgsTextInput
              placeholder="Click here…"
              title="文字商標查詢"
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={(query) => setSearchQuery(query)}
              value={searchQuery}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 30,
              paddingHorizontal: 20,
            }}
          >
            <Text>字音相似</Text>
            <Checkbox
              status={checkedS ? 'checked' : 'unchecked'}
              onPress={() => {
                setCheckedS(!checkedS);
              }}


            />
            <Text>字型相似</Text>
            <Checkbox

              status={checkedW ? 'checked' : 'unchecked'}
              onPress={() => {
                setCheckedW(!checkedW);
              }}
              color={'green'}
            />


          </View>

          <View style={Platform.OS === 'ios' ? { zIndex: 10, height: 50, marginTop: 30, paddingHorizontal: 20 } : { height: 40, marginTop: 20, paddingHorizontal: 20 }}>


            <Text style={{
              ...FONTS.h2,
              marginBottom: SIZES.padding / 6,


            }}
            >商標搜尋類別</Text>
            <DropDownPicker
              dropDownContainerStyle={{
                backgroundColor: "#dfdfdf",
              }}
              searchable={true}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              dropDownDirection="AUTO"
              theme="LIGHT"
              multiple={true}
              mode="BADGE"
            />

          </View>

          <View style={{ marginTop: 70, paddingHorizontal: 20 }}>


            <LgsTextInput
              placeholder="Click here…"

              onSubmitEditing={Keyboard.dismiss}
              onChangeText={(query) => setSearchQuery(query)}
              value={searchQuery}
            />
          </View>
          <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            <Text

              style={{
                ...FONTS.h2,
                marginBottom: SIZES.padding / 6,
                lineHeight: 68,
              }}
            >

              商標註冊期間
            </Text>
            <View style={{ flexDirection: "row", justifyContent: 'center' }}>
              <View style={style.twoinput}>
                <LgsTextInput

                  placeholder="yyyy/mm/dd"
                  style={{ justifyContent: "flex-start" }}
                />
              </View>
              <Text
                style={{
                  ...FONTS.h2,
                  marginBottom: SIZES.padding / 6,
                }}

              >~</Text>
              <View style={style.twoinput}>
                <LgsTextInput
                  placeholder="yyy/mm/dd"
                  style={{ justifyContent: "flex-end" }}
                />

              </View>
            </View>
          </View>
          <LgsButton
            style={{ width: "100%", marginTop: 40, paddingHorizontal: 20 }}
            title="Press me"
            onPress={onSearch}
          />

        </View>




      </ContentContainer>
    </Background >
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    justifyContent: "flex-start",
  },
  input: {
    marginTop: 10,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 8,
  },
  twoinput: {
    flex: 1,
    marginRight: 10,

    marginLeft: 10,
  },

  status: {
    padding: 10,
    textAlign: "center",
  },
  chip: {
    backgroundColor: "#2096F3",
    margin: 4,
    width: 150,
  },
  chipText: {
    color: "#ffffff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 5,
  },
  checkbox: {
    alignSelf: "center",
  },
});

/* Rectangle 2 */

export default TextSearch;
