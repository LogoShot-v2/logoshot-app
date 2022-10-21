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
import { GetMyFavoriteFiles, PostAddFavoriteFile } from "../../axios/api";
import {
  Provider,
  Portal,
  Dialog,
  Button,
  Paragraph,
} from "react-native-paper";
import LgsTextInput from "../../components/lgsTextInput";

const File = ({ item }, onPressFile) => {
  return (
    <TouchableOpacity
      style={{
        ...FONTS.image,
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: 20,
      }}
      onPress={() => onPressFile(item)}
    >
      <Text>{item["fileName"]}</Text>
    </TouchableOpacity>
  );
};

const MyFavorite = ({ navigation: { navigate } }) => {
  const [files, setFiles] = useState(null);
  const [addDialogVisible, setAddDialogVisible] = useState(false);
  const [newFileName, setNewFileName] = useState("新增資料夾");
  const onPressFile = (file) => {
    if (file.fileId < 0) {
      setAddDialogVisible(true);
    } else {
      navigate("MyFavoriteFileDetail", file);
    }
  };

  const addFile = async () => {
    await PostAddFavoriteFile(newFileName);
    setAddDialogVisible(false);
  };

  useEffect(() => {
    const asyncfunction = async () => {
      const data = await GetMyFavoriteFiles();
      const newObj = {
        esIds: [],
        fileId: -1,
        fileName: "+",
      };
      setFiles([newObj, ...data]);
    };
    asyncfunction();
  }, [addDialogVisible]);

  return (
    <Provider>
      <Background>
        <Scroll>
          <ContentContainer>
            <Text style={FONTS.h1}>我的最愛</Text>
            {files ? (
              <FlatList
                data={files}
                renderItem={(item) => File(item, onPressFile)}
                keyExtractor={(x) => x["fileId"]}
                numColumns={3}
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
            </Portal>
          </ContentContainer>
        </Scroll>
      </Background>
    </Provider>
  );
};

export default MyFavorite;

const styles = StyleSheet.create({});
