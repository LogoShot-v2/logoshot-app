import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/Login";
import BottomBar from "./BottomBar";

import "react-native-gesture-handler";
import Result from "../pages/Result";
import MyFavoriteFileDetail from "../pages/MyFavorite/MyFavoriteFileDetail";
import Signup from "../pages/Signup";
import ResultDetail from "../pages/ResultDetail";


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
      <Base.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      <Base.Screen
        name="Result"
        component={Result}
        options={{
          headerShown: false,
        }}
      />
      <Base.Screen
        name="ResultDetail"
        component={ResultDetail}
        options={{
          headerShown: false,
        }}
      />
      <Base.Screen
        name="MyFavoriteFileDetail"
        component={MyFavoriteFileDetail}
        options={{
          headerShown: false,
        }}
      />
    </Base.Navigator>
  );
};

export default Root;
