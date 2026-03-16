import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, removeTodo } from '../redux/todoSlice';
import { RootState } from '../redux/store';
import uuid from 'react-native-uuid';

export default function TodoScreen() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (!text.trim()) return;
    dispatch(
      addTodo({
        id: uuid.v4() as string,
        text: text.trim(),
        completed: false,
      })
    );
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="เพิ่มงาน..."
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
        <Text style={styles.btnText}>เพิ่มงาน</Text>
      </TouchableOpacity>

      <Text style={styles.count}>งานทั้งหมด: {todos.length} รายการ</Text>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.textArea}
              onPress={() => dispatch(toggleTodo(item.id))}
            >
              <Text
                style={[
                  styles.itemText,
                  item.completed && styles.completed,
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => dispatch(removeTodo(item.id))}
            >
              <Text style={styles.btnText}>ลบ</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
  btnText: { color: '#fff', fontWeight: 'bold' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  textArea: { flex: 1, marginRight: 8 },
  itemText: { fontSize: 16 },
  completed: { textDecorationLine: 'line-through', color: '#999' },
  count: { marginBottom: 8, color: '#555' },
});
