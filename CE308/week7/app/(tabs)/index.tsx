import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const PRIMARY = "#F4511E";

export default function MarketScreen() {
  const products = [
    {
      id: 1,
      name: "Premium Coffee Bean",
      price: 450,
      description: "เมล็ดกาแฟคุณภาพจากดอยช้าง",
    },
    {
      id: 2,
      name: "Green Tea Powder",
      price: 290,
      description: "ชาเขียวมัทฉะแท้จากญี่ปุ่น",
    },
    {
      id: 3,
      name: "Oat Milk 1L",
      price: 115,
      description: "นมโอ๊ตเพื่อสุขภาพ",
    },
  ];

  return (
    <View style={styles.container}>
      {products.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/details",
              params: item,
            })
          }
        >
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>฿{item.price}</Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  name: { fontSize: 16, fontWeight: "600" },
  price: { color: PRIMARY, marginTop: 4, fontWeight: "bold" },
});