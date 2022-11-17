import React, { useState, useEffect } from "react";
import {
  Background,
  Scroll,
  ContentContainer,
  ListBlock,
} from "../components/lgsScreen";
import { FONTS } from "../constant";
import { Platform, StyleSheet, Text, View } from "react-native";
import LgsTextInput from "./lgsTextInput";
import { TouchableOpacity, Image } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTime } from "luxon";

const LgsDatePicker = ({ value, onChange }) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(value));
  const [mode, setMode] = useState("date");

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    const datet = DateTime.fromJSDate(selectedDate).toFormat("yyyy/MM/dd");
    console.log("hihi", datet);
    setShow(false);
    onChange(datet);
    // setDate(currentDate);
    console.log("date");
  };

  return (
    <>
      {Platform.OS === "android" && (
        <>
          <LgsTextInput
            placeholder="yyyy/mm/dd"
            style={{ flex: 1, justifyContent: "flex-start" }}
            onChangeText={onChange}
            value={value}
          />
          <TouchableOpacity
            style={{
              flex: 0.5,
              // backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              width: 50,
            }}
            onPress={() => setShow(!show)}
          >
            <Image
              source={require("../assets/dateIcon.png")}
              style={{ height: 33, width: 30 }}
            />
          </TouchableOpacity>
        </>
      )}

      {/* <Text>{DateTime.now().toFormat("MMM dd, yyyy")}</Text> */}

      {(show || Platform.OS === "ios") && (
        <DateTimePicker
          style={{
            flex: 1,
            display: "flex",
            height: Platform.OS === "ios" ? 50 : undefined,
            marginRight: 15,
            // width: "100%",
            // backgroundColor: "red",

            // margin: "auto",
            // width: 300,
          }}
          // locale="es-ES"
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          onChange={onChangeDate}
          // display={"default"}
        />
      )}

      {Platform.OS === "ios" ? (
        <Image
          source={require("../assets/dateIcon.png")}
          style={{ height: 33, width: 30 }}
        />
      ) : null}
    </>
  );
};

export default LgsDatePicker;
