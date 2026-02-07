import { FlatList, View } from "react-native";
import ItemCard from "./Component/ItemCard";

const DATA = [
  { id: "1", name: "กาแฟ", price: 60, pcs: 10 },
  { id: "2", name: "ชาเขียว", price: 55, pcs: 8 },
  { id: "3", name: "ชาไทย", price: 50, pcs: 12 },
];

export default function Index() {
  return (
    <View className="flex-1 p-4 bg-white">
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard
            name={item.name}
            price={item.price}
            pcs={item.pcs}
          />
        )}
      />
    </View>
  );
}
