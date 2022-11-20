import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View, LogBox } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigator/Base";
import "intl";
import "intl/locale-data/jsonp/en";
// import Log from "./pages/Log/Log";

LogBox.ignoreAllLogs();
export default function App() {
  return (
    <NavigationContainer>
      <Root></Root>
    </NavigationContainer>
  );
}
