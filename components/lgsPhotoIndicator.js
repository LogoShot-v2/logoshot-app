import React from "react";
import {
  TextInput,
  Text,
  StyleSheet,
  View,
  Keyboard,
  Image,
  Dimensions,
} from "react-native";
import { useState } from "react";
import LgsDraggablePin from "./lgsDraggablePin";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

const LgsPhotoIndicator = ({ style, source }) => {
  const [containerX, setContainerX] = useState();
  const [containerY, setContainerY] = useState();

  const drag = (x, y) => {
    console.log("dragging", x, y);
  };
  const drop = (x, y) => {
    console.log("dragging", x, y);
  };

  return (
    <GestureHandlerRootView
      style={{
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "red",
        ...style,
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
      <LgsDraggablePin X={0} Y={0} onDrag={drag} onDrop={drop}>
        <Text>+</Text>
      </LgsDraggablePin>
    </GestureHandlerRootView>
  );
};

export default LgsPhotoIndicator;

const styles = StyleSheet.create({});
