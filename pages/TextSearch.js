import * as React from 'react';
import { useState, useEffect } from "react";
import { Keyboard, StyleSheet, View, Text, TextInput, Image, ImageStore, TouchableOpacity, Alert } from "react-native";
import { Chip, ThemeProvider, Button, CheckBox } from "react-native-elements";
import { icons, COLORS, FONTS, SIZES } from "../constant";
import RNPickerSelect from 'react-native-picker-select';
import LgsTextInput from "../components/lgsTextInput";
import LgsCheckbox from "../components/lgsCheckbox";
import LgsButton from "../components/lgsButton";
import { RotateInDownLeft } from 'react-native-reanimated';





const TextSearch = () => {
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

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
  const [isSelected, setSelection] = useState(false);


  return (

    <View style={style.container}>
      <View style={{ height: "10%" }}>
        <Text style={{ ...FONTS.h2, marginBottom: SIZES.padding / 4, lineHeight: 68 }}>文字商標查詢</Text>
        <LgsTextInput
          placeholder='Click here…'
          onSubmitEditing={Keyboard.dismiss}
        />
      </View>
      <View style={{ height: "18%", flexDirection: 'row', alignItems: "center" }}>
        <LgsCheckbox

          value={isSelected}
          onValueChange={setSelection}
        />
        <LgsCheckbox>
          value={isSelected}
          onValueChange={setSelection}

          <Text style={{ fontSize: 4, }}>Family</Text>
        </LgsCheckbox>



        <Chip style={{ margin: 4 }}>
          <Text style={{}}>Adventure</Text>
        </Chip>

        <Chip style={{ margin: 4 }}>
          <Text style={{}}>Family</Text>
        </Chip>

        <Chip style={{ margin: 4 }}>
          <Text style={{}}>Fantasy</Text>
        </Chip>

      </View>



      <View style={{ height: "25%" }}>
        <Text style={{ ...FONTS.h2, marginBottom: SIZES.padding / 6, lineHeight: 68 }}
        >應用商品類別</Text>
        <RNPickerSelect
          placeholder={{ label: "Select here", value: null }}
          onValueChange={(value) => console.log(value)}
          items={[
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
          ]} />

        <Text style={{ ...FONTS.h2, marginBottom: SIZES.padding / 6, lineHeight: 68 }}>混淆基準</Text>
        <RNPickerSelect
          placeholder={{ label: "Select here", value: null }}
          onValueChange={(value) => console.log(value)}
          items={[
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
          ]} />
      </View>
      <View style={{ flex: 1 }} >

        <Text style={{ ...FONTS.h2, marginBottom: SIZES.padding / 6, lineHeight: 68 }}>商標註冊期間</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={style.twoinput}>
            <LgsTextInput placeholder="yyyy/mm/dd" style={{ justifyContent: 'flex-start', }} />
          </View>
          <Text>~</Text>
          <View style={style.twoinput}>
            <LgsTextInput placeholder="yyy/mm/dd" style={{ justifyContent: 'flex-end', }} />
          </View>
        </View>

      </View >

      <LgsButton
        style={{ width: "100%", height: 70 }}
        title="Press me"
        onPress={() => Alert.alert('Simple Button pressed')}
      />


    </View>


  );
}

const style = StyleSheet.create({
  container: {

    flex: 1,
    padding: 50,
    justifyContent: 'center',

  },
  input: {
    marginTop: 10,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 8
  },
  twoinput: {
    flex: 1,
  },

  status: {
    padding: 10,
    textAlign: "center"
  }

});

/* Rectangle 2 */


export default TextSearch;