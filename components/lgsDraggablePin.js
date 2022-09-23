import React, { FunctionComponent } from "react";
import { View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useAnimatedGestureHandler } from "react-native-reanimated";

const LgsDraggablePin = ({ children, X, Y, onDrag, onDrop }) => {
  const x = useSharedValue(X);
  const y = useSharedValue(Y);
  const drag = useAnimatedGestureHandler({
    onStart: (_, c) => {
      c.x = x.value;
      c.y = y.value;
    },
    onActive: (e, c) => {
      x.value = e.translationX + c.x;
      y.value = e.translationY + c.y;
      runOnJS(onDrag)(x.value, y.value);
    },
    onEnd: (e) => {
      console.log("drop", e.translationX, e.translationY);
      runOnJS(onDrop)(x.value, y.value);
    },
  });

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
