import { View, Text, TextInput } from "react-native";

type InputProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
};

export default function CustomInput({
  label,
  value,
  placeholder,
  onChangeText,
}: InputProps) {
  return (
    <View className="mb-4">
      <Text className="mb-1 font-semibold">{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        className="border border-gray-300 rounded-lg px-3 py-2"
      />
    </View>
  );
}
