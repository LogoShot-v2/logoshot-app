// import { TouchableOpacity, Image } from "react-native-gesture-handler";
import { TouchableOpacity, Image } from "react-native";

const LgsGobackButton = ({ goBack }) => {
  return (
    <TouchableOpacity
      onPress={() => goBack()}
      style={{
        zIndex: 1,
        position: "absolute",
      }}
    >
      <Image
        source={require("../assets/back.png")}
        style={{ height: 50, width: 50 }}
      />
    </TouchableOpacity>
  );
};

export default LgsGobackButton;
