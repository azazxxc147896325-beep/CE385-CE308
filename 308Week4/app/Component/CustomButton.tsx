import { Text, TouchableOpacity } from "react-native";

type CustomButtonProps = {
  title: string;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "danger";
  onPress?: () => void;
};

export default function CustomButton({
  title,
  size = "medium",
  variant = "primary",
  onPress,
}: CustomButtonProps) {
  const sizeClass = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const variantClass = {
    primary: "bg-blue-500",
    secondary: "bg-gray-500",
    danger: "bg-red-500",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${sizeClass[size]} ${variantClass[variant]} rounded-lg active:bg-opacity-70`}
    >
      <Text
        className={`text-white font-bold text-center ${sizeClass[size]}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
