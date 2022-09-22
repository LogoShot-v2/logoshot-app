import * as React from "react";
import { useState, useEffect } from "react";
import {
  Keyboard,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ImageStore,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheet, ListItem } from "@rneui/themed";
import { Chip, ThemeProvider, Button } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import LgsTextInput from "../components/lgsTextInput";

const ImageSearch = () => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [image, setImage] = useState(null);

  /* inputs */
  const [type, setType] = useState("");
  const [path, setPath] = useState("");

  const [isImagePickerDrawerVisible, setIsImagePickerDrawerVisible] =
    useState(false);

  const list = [
    {
      title: "開啟相機",
      onPress: () => pickImage("camera"),
    },
    {
      title: "從相簿中選擇",
      onPress: () => pickImage("photo"),
    },
  ];

  const pickImage = async (chooseType) => {
    let result;
    switch (chooseType) {
      case "photo":
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
        break;
      case "camera":
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
        break;
    }

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setIsImagePickerDrawerVisible(false);
    }
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  return (
    <SafeAreaProvider style={style.container}>
      <Text>圖片商標查詢</Text>
      <Button
        title="圖片商標查詢"
        onPress={() => setIsImagePickerDrawerVisible(true)}
      ></Button>
      {image && <Image source={{ uri: image }} style={{ flex: 1 }}></Image>}
      <View>
        <Text>應用商品類別</Text>
        <RNPickerSelect
          placeholder="select here"
          onValueChange={(value) => console.log(value)}
          items={[
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
          ]}
        />
      </View>
      <View>
        <Text>商標色彩</Text>
        <RNPickerSelect
          placeholder="select here"
          onValueChange={(value) => console.log(value)}
          items={[
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
          ]}
        />
      </View>
      <LgsTextInput
        title={"輸入商標路徑"}
        style={style.input}
        value={path}
        onChangeText={(t) => setPath(t)}
        placeholder="輸入商標路徑"
      ></LgsTextInput>
      <LgsTextInput
        title={"文字商標查詢"}
        style={style.input}
        placeholder={"輸入申請人"}
      ></LgsTextInput>
      <View>
        <Text> 商標註冊期間</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={style.twoinput}>
            <TextInput
              placeholder="yyyy/mm/dd"
              style={{ justifyContent: "flex-start" }}
            />
          </View>
          <Text>~</Text>
          <View style={style.twoinput}>
            <TextInput
              placeholder="yyy/mm/dd"
              style={{ justifyContent: "flex-end" }}
            />
          </View>
        </View>
        <Text style={style.status}>{keyboardStatus}</Text>
      </View>

      <Button
        title="Press me"
        onPress={() => Alert.alert("Simple Button pressed")}
      />

      <BottomSheet
        modalProps={{}}
        isVisible={isImagePickerDrawerVisible}
        onBackdropPress={() => setIsImagePickerDrawerVisible(false)}
      >
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </SafeAreaProvider>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36,
  },
  input: {
    marginTop: 10,
  },
  twoinput: {
    flex: 1,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 8,
  },

  status: {
    padding: 10,
    textAlign: "center",
  },
});

export default ImageSearch;
