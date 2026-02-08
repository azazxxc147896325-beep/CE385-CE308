import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "./CustomButton";

type ItemProps = {
  name: string;
  price: number;
  pcs: number;
};

export default function ItemCard({ name, price, pcs }: ItemProps) {
  const router = useRouter();

  const handleOrder = () => {
    // นำทางไปยังหน้า Workshop 3.2
    router.push("/Workshop3.2");
  };

  return (
    <View className="bg-gray-200 p-4 rounded-xl mb-4">
      <Text className="text-4xl font-bold mb-2">{name}</Text>

      <Text className="text-base">ราคา: {price} บาท</Text>
      <Text className="text-base mb-3">จำนวน: {pcs} ชิ้น</Text>

      <CustomButton
        title="สั่งซื้อ"
        size="medium"
        variant="primary"
        onPress={handleOrder}
      />
    </View>
  );
}
