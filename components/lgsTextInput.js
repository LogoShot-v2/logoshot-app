import React, { useState } from "react";

import { TextInput, Text, StyleSheet, View, Keyboard } from "react-native";
import { icons, COLORS, FONTS, SIZES } from "../constant";

const LgsTextInput = ({ placeholder, style, value, onChangeText, title }) => {


  return (
    <View style={style}>
      {title ? (
        <Text
          style={{
            ...FONTS.h1,
            marginBottom: SIZES.padding / 6,
            lineHeight: 68,
          }}
        >
          {title}
        </Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onSubmitEditing={Keyboard.dismiss}
        value={value}
        onChangeText={(query) => onChangeText(query)}
      />
    </View>
  );
};

export default LgsTextInput;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 8,
    height: 50,
  },
});
