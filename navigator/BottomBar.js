import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import TextSearch from "../pages/TextSearch";
import ImageSearch from "../pages/ImageSearch";
import MyFavorite from "../pages/MyFavorite/MyFavorite";
import Log from "../pages/Log/Log";
import Home from "../pages/Home";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-text"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ImageSearch"
        component={ImageSearch}
        options={{
          tabBarLabel: "圖片搜尋",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="image-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "首頁",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyFavorite"
        component={MyFavorite}
        options={{
          tabBarLabel: "我的最愛",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="heart-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Log"
        component={Log}
        options={{
          tabBarLabel: "瀏覽紀錄",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBar;
