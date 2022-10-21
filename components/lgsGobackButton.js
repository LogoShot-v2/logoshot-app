// import { TouchableOpacity, Image } from "react-native-gesture-handler";
import { TouchableOpacity, Image } from "react-native";

const LgsGobackButton = ({ goBack }) => {
  return (
    <TouchableOpacity onPress={() => goBack()}>
      <Image
        source={require("../assets/back.png")}
        style={{ height: 24, width: 24 }}
      />
    </TouchableOpacity>
  );
};

export default LgsGobackButton;
