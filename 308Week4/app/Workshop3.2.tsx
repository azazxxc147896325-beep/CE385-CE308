import { View, Text, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import CustomInput from "./Component/CustomInput";
import CustomButton from "./Component/CustomButton";

export default function Workshop32() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [pcs, setPcs] = useState("");

  const handleSubmit = () => {
    // ตรวจสอบว่ากรอกข้อมูลครบหรือไม่
    if (!productName || !price || !pcs) {
      Alert.alert("ข้อผิดพลาด", "กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    // แสดงข้อมูลที่กรอก
    Alert.alert(
      "บันทึกข้อมูลสำเร็จ",
      `ชื่อสินค้า: ${productName}\nราคา: ${price} บาท\nจำนวน: ${pcs} ชิ้น`,
      [
        {
          text: "ตรวจสอบ",
          onPress: () => console.log("ข้อมูลสินค้า:", { productName, price, pcs }),
        },
        {
          text: "รีเซ็ต",
          onPress: () => {
            setProductName("");
            setPrice("");
            setPcs("");
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView className="flex-1 bg-gray-100">
        <View className="p-6">
          {/* หัวข้อฟอร์ม */}
          <View className="mb-6">
            <Text className="text-3xl font-bold text-gray-800 mb-2">
              เพิ่มสินค้าใหม่
            </Text>
            <Text className="text-base text-gray-600">
              กรุณากรอกข้อมูลสินค้าที่ต้องการเพิ่ม
            </Text>
          </View>

          {/* ฟอร์มกรอกข้อมูล */}
          <View className="bg-white rounded-2xl p-6 shadow-md">
            <CustomInput
              label="ชื่อสินค้า"
              value={productName}
              onChangeText={setProductName}
              placeholder="เช่น กาแฟ, ชาเขียว"
            />

            <CustomInput
              label="ราคา (บาท)"
              value={price}
              onChangeText={setPrice}
              placeholder="เช่น 60"
            />

            <CustomInput
              label="จำนวน (ชิ้น)"
              value={pcs}
              onChangeText={setPcs}
              placeholder="เช่น 10"
            />

            {/* ปุ่มยืนยัน */}
            <View className="mt-4">
              <CustomButton
                title="บันทึกข้อมูล"
                onPress={handleSubmit}
                variant="primary"
                size="medium"
              />
            </View>
          </View>

          {/* ตัวอย่างการแสดงข้อมูลที่กรอก */}
          {(productName || price || pcs) && (
            <View className="mt-6 bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
              <Text className="text-lg font-bold text-blue-800 mb-3">
                ตัวอย่างข้อมูล:
              </Text>
              <Text className="text-base text-gray-700">
                ชื่อสินค้า: {productName || "-"}
              </Text>
              <Text className="text-base text-gray-700">
                ราคา: {price ? `${price} บาท` : "-"}
              </Text>
              <Text className="text-base text-gray-700">
                จำนวน: {pcs ? `${pcs} ชิ้น` : "-"}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
