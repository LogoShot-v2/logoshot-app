import * as React from 'react';
import { useState, useEffect } from "react";
import { Keyboard, StyleSheet, View, Text, TextInput, Image, ImageStore, TouchableOpacity, Alert } from "react-native";
import { Chip, ThemeProvider, Button} from "react-native-elements";
import RNPickerSelect from 'react-native-picker-select';



const ImageSearch = () =>{
    const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  
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
  


    return (
        <View style={style.container}>
        <Text>  圖片商標查詢</Text>
         <View>
            <Text>應用商品類別</Text>
            <RNPickerSelect
            placeholder="select here" 
            onValueChange={(value) => console.log(value)}
            items={[
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
            ]}/>
        </View>
        <View>
            <Text>商標色彩</Text>
            <RNPickerSelect
            placeholder="select here" 
            onValueChange={(value) => console.log(value)}
            items={[
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
            ]}/>
        </View>
        <View> 

         <TextInput
          style={style.input}
          placeholder='輸入商標路徑'
          onSubmitEditing={Keyboard.dismiss}
            />
         <Text style={style.status}>{keyboardStatus}</Text></View>
         <View> 
        <Text>文字商標查詢</Text>
         <TextInput
          style={style.input}
          placeholder='輸入申請人'
          onSubmitEditing={Keyboard.dismiss}
            />
         <Text style={style.status}>{keyboardStatus}</Text></View>
         <View>
            <Text>商標註冊期間</Text>
            <View style={{flexDirection:"row"}}>
                    <View style={style.twoinput}>
                        <TextInput placeholder="yyyy/mm/dd" style={{justifyContent: 'flex-start',}} />
                    </View>
                    <Text>~</Text>
                    <View style={style.twoinput}>
                        <TextInput placeholder="yyy/mm/dd" style={{justifyContent: 'flex-end',}} />
                    </View>
            </View>
         <Text style={style.status}>{keyboardStatus}</Text>
         </View>
       
        <Button
        title="Press me"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
        
      </View>
    )
}
const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 36
    },
    input: {
      padding: 10,
      borderWidth: 0.5,
      borderRadius: 8
    },
    twoinput: {
        flex: 1,
        padding: 10,
        borderWidth: 0.5,
        borderRadius: 8
      },
 
    status: {
      padding: 10,
      textAlign: "center"
    }
  });
  
export default ImageSearch;