import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Home.js';

const Base = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Base.Navigator>
        <Base.Screen name="Login" component={Login} />
      </Base.Navigator>
    </NavigationContainer>
  );
}
