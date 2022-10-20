import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GetSearchingHistory } from "../axios/api";

const Log = () => {
  useEffect(() => {
    console.log("hihi");
    GetSearchingHistory(true);
  }, []);
  return (
    <View>
      <Text>Log</Text>
    </View>
  );
};

export default Log;
