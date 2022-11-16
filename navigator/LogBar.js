import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import "react-native-gesture-handler";
import ImageLog from "../pages/Log/ImageLog";
import TextLog from "../pages/Log/TextLog";

const Tab = createMaterialTopTabNavigator();

const LogBar = () => {
  return (
    <Tab.Navigator pagerStyle={{ width: "100%" }}>
      <Tab.Screen
        name="ImageLog"
        component={ImageLog}
        options={{ tabBarLabel: "圖片搜尋", headerShown: false }}
      />
      <Tab.Screen
        name="TextLog"
        component={TextLog}
        options={{ tabBarLabel: "文字搜尋", headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default LogBar;
