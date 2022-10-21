import React, { FunctionComponent, useEffect } from "react";
import { View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useAnimatedGestureHandler } from "react-native-reanimated";

const LgsDraggablePin = ({
  children,
  X,
  Y,
  onDrag,
  onDrop,
  imageWidth,
  imageHeight,
}) => {
  const x = useSharedValue(X);
  const y = useSharedValue(Y);
  const drag = useAnimatedGestureHandler({
    onStart: (_, c) => {
      c.x = x.value;
      c.y = y.value;
      console.log("onStart,", c.x, c.y);
    },
    onActive: (e, c) => {
      x.value =
        Math.abs(e.translationX + c.x) > imageWidth / 2
          ? (Math.sign(e.translationX + c.x) * imageWidth) / 2
          : e.translationX + c.x;
      y.value =
        Math.abs(e.translationY + c.y) > imageHeight / 2
          ? (Math.sign(e.translationY + c.y) * imageHeight) / 2
          : e.translationY + c.y;
      runOnJS(onDrag)(x.value, y.value);
    },
    onEnd: (e, c) => {
      x.value =
        Math.abs(e.translationX + c.x) > imageWidth / 2
          ? (Math.sign(e.translationX + c.x) * imageWidth) / 2
          : e.translationX + c.x;
      y.value =
        Math.abs(e.translationY + c.y) > imageHeight / 2
          ? (Math.sign(e.translationY + c.y) * imageHeight) / 2
          : e.translationY + c.y;
      console.log("drop", e.translationX, e.translationY);
      runOnJS(onDrop)(x.value, y.value);
    },
  });

  useEffect(() => {
    console.log("useEffect here");
    x.value = X;
    y.value = Y;
  }, [X, Y]);

  return (
    <PanGestureHandler onGestureEvent={drag}>
      <Animated.View
        style={[
          {
            position: "absolute",
          },
          useAnimatedStyle(() => {
            return {
              transform: [{ translateX: x.value }, { translateY: y.value }],
            };
          }),
        ]}
      >
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default LgsDraggablePin;
