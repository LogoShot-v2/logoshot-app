import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const MyFavorite = () => {
  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   };
  // }, [input]);
  return (
    <View style={{ flex: 1 }}>
      <Text>MyFavorite</Text>
      <Image
        source={{
          uri: "http://140.112.106.88:8082/v2_raw_data/pics/000/000000001_1.jpg",
        }}
        style={{ height: 100, width: 100 }}
      />
    </View>
  );
};

export default MyFavorite;
