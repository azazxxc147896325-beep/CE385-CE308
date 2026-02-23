import { Text, Button, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
const products = [
  { id: '1', name: 'iPhone 15', price: '32,900' }, { id: '2', name: 'iPad Air', price: '23,900' },
];
export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollcontent}>
      <Text style={styles.title}>welcome Home!</Text>
      <Button
        title="Go to Details"
        onPress={() => router.push('/details')}
      />
      <Button
        title="Go to Profile (Purple Header)"
        onPress={() => router.push('/profile')}
      />
      <Button
        title="Go to Settings (Orange Header)"
        onPress={() => router.push('/settings')}
      />
      <Button
        title="Open Login Modal"
        onPress={() => router.push('/login')}
      />
      <Text style={styles.sectionTitle}>Product List</Text>
      {products.map((item) => (
        <Pressable
          key={item.id}
          onPress={() => {
            router.push({
              pathname: '/product/[id]',
              params:
              {
                id: item.id,
                name: item.name,
                price: item.price
              }
            });
          }}
          style={styles.productCard}
        >
          <Text>{item.name}</Text>
          <Text style={styles.price}>{item.price} baht</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollcontent: {
    padding: 20,
    gap: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
  },
  productCard: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    width: '100%',
    borderRadius: 8,
  },
  price: {
    color: '#666',
    marginTop: 5,
  },
});