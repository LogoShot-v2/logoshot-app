import React, { useState, useEffect } from "react";
import {
  Background,
  Scroll,
  ContentContainer,
  ListBlock,
} from "../../components/lgsScreen";
import { FONTS } from "../../constant";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  GetMyFavoriteFiles,
  PostAddFavoriteFile,
  PostDeleteFavoriteFile,
} from "../../axios/api";
import { BottomSheet, ListItem } from "@rneui/base";
import {
  Provider,
  Portal,
  Dialog,
  Button,
  Paragraph,
} from "react-native-paper";
import LgsTextInput from "../../components/lgsTextInput";

const File = ({ item }, onPressFile, onLongPress) => {
  return (
    <TouchableOpacity
      style={{
        ...FONTS.image,
        // marginRight: "auto",
        // marginLeft: "auto",
        marginTop: 20,
      }}
      onPress={() => onPressFile(item)}
      onLongPress={() => onLongPress(item)}
    >
      <Text>{item["fileName"]}</Text>
    </TouchableOpacity>
  );
};

const MyFavorite = ({ navigation: { navigate } }) => {
  const [files, setFiles] = useState([
    {
      esIds: [],
      fileId: -1,
      fileName: "+",
    },
  ]);
  const [addDialogVisible, setAddDialogVisible] = useState(false);
  const [newFileName, setNewFileName] = useState("新增資料夾");
  const [selectedFile, setSelectedFile] = useState(null);

  const [isLongPressBottomVisible, setIsLongPressBottomVisible] =
    useState(false);

  const onPressFile = (file) => {
    if (file.fileId < 0) {
      setAddDialogVisible(true);
    } else {
      navigate("MyFavoriteFileDetail", file);
    }
  };

  const onDeleteFile = async () => {
    setIsLongPressBottomVisible(false);
    await PostDeleteFavoriteFile(selectedFile["fileId"]);
  };

  const onLongPress = (file) => {
    setSelectedFile(file);
    setIsLongPressBottomVisible(true);
  };

  const addFile = async () => {
    await PostAddFavoriteFile(newFileName);
    setAddDialogVisible(false);
  };

  const loadDatas = async () => {
    const data = await GetMyFavoriteFiles();
    const newObj = {
      esIds: [],
      fileId: -1,
      fileName: "+",
    };
    setFiles([newObj, ...data]);
  };
  useEffect(() => {
    loadDatas();
  }, [addDialogVisible, navigate, onDeleteFile]);

  return (
    <Provider>
      <Background>
        <Scroll>
          <ContentContainer>
            <Text style={FONTS.h1}>我的最愛</Text>
            {files ? (
              <FlatList
                data={files}
                renderItem={(item) => File(item, onPressFile, onLongPress)}
                keyExtractor={(x) => x["fileId"]}
                numColumns={3}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                contentContainerStyle={{ width: "100%" }}
              />
            ) : null}
            <Portal>
              <Dialog
                visible={addDialogVisible}
                onDismiss={() => setAddDialogVisible(false)}
              >
                <Dialog.Title>新增資料夾</Dialog.Title>
                <Dialog.Content>
                  <LgsTextInput
                    value={newFileName}
                    placeholder={"請輸入資料夾名稱"}
                    onChangeText={setNewFileName}
                  />
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => addFile()} disabled={!newFileName}>
                    Done
                  </Button>
                </Dialog.Actions>
              </Dialog>

              <BottomSheet
                isVisible={isLongPressBottomVisible}
                onBackdropPress={() => setIsLongPressBottomVisible(false)}
              >
                <ListItem onPress={() => onDeleteFile()}>
                  <ListItem.Content>
                    <ListItem.Title>
                      刪除 {selectedFile ? selectedFile.fileName : null}?
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </BottomSheet>
            </Portal>
          </ContentContainer>
        </Scroll>
      </Background>
    </Provider>
  );
};

export default MyFavorite;

const styles = StyleSheet.create({});
