import React from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Keyboard,
  Image,
  Dimensions,
} from "react-native";
import LgsDraggablePin from "./lgsDraggablePin";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

const LgsPhotoIndicator = ({ style, source }) => {
  return (
    <GestureHandlerRootView
      style={{
        ...style,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
      }}
    >
      <Image
        source={source}
        style={{
          resizeMode: "contain",
          width: windowWidth * 0.7,
          height: windowWidth * 0.7,
        }}
      />
      <LgsDraggablePin></LgsDraggablePin>
    </GestureHandlerRootView>
  );
};

export default LgsPhotoIndicator;

const styles = StyleSheet.create({});
