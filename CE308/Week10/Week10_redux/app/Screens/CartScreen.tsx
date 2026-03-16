import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, clearCart } from '../redux/cartSlice';
import { RootState } from '../redux/store';
import uuid from 'react-native-uuid';

export default function CartScreen() {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (!name.trim() || !quantity.trim() || !price.trim()) {
      Alert.alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }
    dispatch(
      addItem({
        id: uuid.v4() as string,
        name: name.trim(),
        quantity: Number(quantity),
        price: Number(price),
      })
    );
    setName('');
    setQuantity('');
    setPrice('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="ชื่อสินค้า"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="จำนวน"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="ราคา"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
        <Text style={styles.btnText}>เพิ่มลงตะกร้า</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.itemText}>
              {item.name} x{item.quantity} ราคาต่อจำนวน {item.price * item.quantity} บาท
            </Text>
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => dispatch(removeItem(item.id))}
            >
              <Text style={styles.btnText}>ลบ</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.total}>ยอดรวม: {totalAmount} บาท</Text>

      <TouchableOpacity style={styles.clearBtn} onPress={() => dispatch(clearCart())}>
        <Text style={styles.btnText}>ล้างตะกร้า</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  addBtn: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  removeBtn: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  clearBtn: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemText: { flex: 1, marginRight: 8 },
  total: { fontSize: 16, fontWeight: 'bold', marginTop: 12 },
});
