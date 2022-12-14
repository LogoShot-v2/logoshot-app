import React, { useCallback } from "react";
import {
  TextInput,
  Text,
  StyleSheet,
  View,
  Keyboard,
  Image,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import LgsDraggablePin from "./lgsDraggablePin";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

const LgsPhotoIndicator = ({
  initialX,
  initialY,
  style,
  source,
  width,
  height,
  setWidth,
  setHeight,
  setIndicator,
}) => {
  // const [width, setWidth] = useState(0);
  // const [height, setHeight] = useState(0);

  const drag = (x, y) => {
    // console.log("dragging", x, y);
    // setIndicator(x, y);
  };
  const drop = (x, y) => {
    setIndicator(x, y);
  };

  useEffect(() => {
    Image.getSize(
      source.uri,
      (srcWidth, srcHeight) => {
        const maxHeight = Dimensions.get("window").height * 0.7; // or something else
        const maxWidth = Dimensions.get("window").width * 0.7;

        const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        setWidth(srcWidth * ratio);
        setHeight(srcHeight * ratio);
      },
      (error) => {
        console.log("error:", error);
      }
    );
  }, [source.uri]);

  return (
    <GestureHandlerRootView
      style={{
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <Image
        resizeMode="cover"
        source={source}
        style={{
          width: width,
          height: height,
        }}
      />
      {source.uri ? (
        <LgsDraggablePin
          X={initialX}
          Y={initialY}
          onDrag={drag}
          onDrop={drop}
          imageWidth={width}
          imageHeight={height}
        >
          <Image
            source={require("../assets/indicator.png")}
            style={{ width: 30, height: 30 }}
          ></Image>
        </LgsDraggablePin>
      ) : null}
    </GestureHandlerRootView>
  );
};

export default LgsPhotoIndicator;

const styles = StyleSheet.create({
  // indicator: {
  //   color: "white",
  //   textShadowColor: "#585858",
  //   textShadowRadius: 10,
  //   textShadowOffset: { width: 1, height: 1 },
  // },
});
