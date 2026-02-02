import "./global.css";
import { View, Text } from "react-native";
import CustomButton from "./Component/CustomButton";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center gap-3">
      <CustomButton title="Small Button" size="small" variant="primary" />
      <CustomButton title="Medium Button" size="medium" variant="secondary" />
      <CustomButton title="Large Button" size="large" variant="danger" />
    </View>
  );
}
