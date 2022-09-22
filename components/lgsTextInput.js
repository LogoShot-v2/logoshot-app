import React from "react";
import { Text, TextInput, StyleSheet, View, Keyboard } from "react-native";

const LgsTextInput = ({ placeholder, style, value, onChangeText }) => {
  return (
    <View style={style}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onSubmitEditing={Keyboard.dismiss}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default LgsTextInput;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 20,
    height: 40,
  },
});
