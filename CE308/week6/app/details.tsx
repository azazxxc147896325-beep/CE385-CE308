import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const PRIMARY = "#F4511E";

export default function DetailsScreen() {
  const { name, price, description } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Text style={{ color: "#bbb" }}>Product Image</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.price}>฿{price}</Text>

        <View style={styles.divider} />

        <Text style={styles.desc}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },

  imageBox: {
    height: 200,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    padding: 16,
    backgroundColor: "#fff",
  },

  title: { fontSize: 18, fontWeight: "bold" },

  price: {
    color: PRIMARY,
    fontWeight: "bold",
    marginTop: 6,
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },

  desc: { color: "#444" },
}); 