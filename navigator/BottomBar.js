import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../pages/Login";
import "react-native-gesture-handler";
import TextSearch from "../pages/TextSearch";
import ImageSearch from "../pages/ImageSearch";
import MyFavorite from "../pages/MyFavorite";
import Log from "../pages/Log";
import Home from "../pages/Home";

const Tab = createBottomTabNavigator();

const BottomBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TextSearch"
        component={TextSearch}
        options={{
          tabBarLabel: "文字搜尋",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ImageSearch"
        component={ImageSearch}
        options={{
          tabBarLabel: "圖片搜尋",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "首頁",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyFavorite"
        component={MyFavorite}
        options={{
          tabBarLabel: "我的最愛",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Log"
        component={Log}
        options={{
          tabBarLabel: "瀏覽紀錄",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBar;
