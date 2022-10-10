import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/Login";
import BottomBar from "./BottomBar";
import "react-native-gesture-handler";

const Base = createStackNavigator();

const Root = () => {
  return (
    <Base.Navigator>
      <Base.Screen
        name="Base"
        component={BottomBar}
        options={{
          headerShown: false,
        }}
      />
      <Base.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </Base.Navigator>
  );
};

export default Root;
