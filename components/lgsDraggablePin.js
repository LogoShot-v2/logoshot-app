import React, { Component } from "react";
import { Animated, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

const circleRadius = 30;

class LgsDraggablePin extends Component {
  _touchX = new Animated.Value(width / 2 - circleRadius);
  _touchY = new Animated.Value(height / 2 - circleRadius);

  _onPanGestureEvent = Animated.event(
    [{ nativeEvent: { x: this._touchX, y: this._touchY } }],
    {
      useNativeDriver: true,
    }
  );

  render() {
    return (
      //   <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={this._onPanGestureEvent}>
        <Animated.View
          style={{
            height: 150,
            justifyContent: "center",
          }}
        >
          <Animated.View
            style={[
              {
                backgroundColor: "#42a5f5",
                borderRadius: circleRadius,
                height: circleRadius * 2,
                width: circleRadius * 2,
              },
              {
                transform: [
                  {
                    translateX: Animated.add(
                      this._touchX,
                      new Animated.Value(-circleRadius)
                    ),
                  },
                ],
              },
            ]}
          />
        </Animated.View>
      </PanGestureHandler>
      //   </GestureHandlerRootView>
    );
  }
}

export default LgsDraggablePin;
