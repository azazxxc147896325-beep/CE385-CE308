import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
  error?: string;
}

export default function Checkbox({ label, checked, onPress, error }: CheckboxProps) {
  return (
    <View className="mb-4">
      <TouchableOpacity 
        className="flex-row items-center" 
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View className={`w-6 h-6 border-2 rounded mr-3 items-center justify-center ${checked ? 'bg-blue-600 border-blue-600' : 'border-gray-400 bg-white'}`}>
          {checked && <Text className="text-white font-bold">✓</Text>}
        </View>
        
        <Text className="text-gray-700 text-base">{label}</Text>
      </TouchableOpacity>
      
      {error && <Text className="text-red-500 text-sm mt-1 ml-9">{error}</Text>}
    </View>
  );
}