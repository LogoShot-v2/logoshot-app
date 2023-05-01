import { BackgroundImage } from "@rneui/base";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FONTS } from "../constant";

const LgsLogo = ({
  isHome = false,
  name = "",
  image = null,
  logout = () => {},
  showDeleteAccount = () => {},
}) => {
  return (
    <BackgroundImage
      source={require("../assets/logobg.jpg")}
      style={{
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        zIndex: 1,
        marginTop: 10,
        flexDirection: "row",
        borderBottomColor: "black",
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

      {isHome && (
        <View
          style={{
            width: "30%",
            // backgroundColor: "red",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {name && (
            <>
              {image && (
                <Image
                  source={{ uri: image.data.url }}
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                  }}
                />
              )}
              <Text
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 5,
                  margin: 10,
                  width: image ? undefined : "60%",
                }}
                numberOfLines={1}
                ellipsizeMode={"tail"}
                onLongPress={() => showDeleteAccount()}
              >
                {name}
              </Text>
              <TouchableOpacity
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  backgroundColor: "#406E9F",
                  borderRadius: 5,
                  marginRight: 10,
                }}
                onPress={() => logout()}
              >
                <Text style={{ fontSize: 15 }}>登出</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </BackgroundImage>
  );
};

export default LgsLogo;
