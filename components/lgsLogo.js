import { BackgroundImage } from "@rneui/base";
import { View, Text, ImageBackground } from "react-native";
import { FONTS } from "../constant";

const LgsLogo = ({}) => {
  return (
    <BackgroundImage
      source={require("../assets/logobg.jpg")}
      style={{
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        // backgroundColor: "gainsboro",
        zIndex: 1,
        // marginLeft: 30,
        marginTop: 10,
        flexDirection: "row",
        borderBottomColor: "black",
        // margintop: 40,
        // marginRight: 40,
      }}
    >
      <Text
        style={{
          ...FONTS.h1,
          color: "#406E9F",
          fontWeight: "bold",
          height: "100%",
          flex: 1,
          textAlign: "right",
        }}
      >
        Logo
      </Text>
      <Text
        style={{
          ...FONTS.h1,
          color: "black",
          fontWeight: "bold",
          flex: 1,
          textAlign: "left",
        }}
      >
        shot
      </Text>
    </BackgroundImage>
  );
};

export default LgsLogo;
