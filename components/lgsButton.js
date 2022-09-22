import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
// import { Button } from "react-native-elements";

const LgsButton = ({ title, onPress, style }) => {
  return (
    <View style={style}>
      <TouchableOpacity style={styles.input} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LgsButton;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5173B7",
    height: 40,
    borderRadius: 20,
  },
  title: {
    color: "white",
  },
});
