import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  /** Add a new task */
  const addTask = () => {
    if (text.trim() === '') return;
    setTasks(prev => [
      ...prev,
      { id: Date.now().toString(), text: text.trim(), completed: false }
    ]);
    setText('');
  };

  /** Toggle a task's completed state */
  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /** Delete a task */
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  /** Render each task item */
  const renderTask = ({ item }) => (
    <Pressable
      onPress={() => toggleTask(item.id)}
      style={({ pressed }) => [
        styles.taskItem,
        pressed && styles.taskPressed,
        item.completed && styles.completedTaskItem
      ]}
      accessibilityLabel={`Task: ${item.text}`}
      accessibilityRole="button"
    >
      <View style={styles.taskTextContainer}>
        <Text style={[styles.taskText, item.completed && styles.completedText]}>
          {item.text}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => deleteTask(item.id)}
        style={styles.deleteButton}
        accessibilityLabel={`Delete task: ${item.text}`}
        accessibilityRole="button"
      >
        <Text style={styles.deleteText}>🗑</Text>
      </TouchableOpacity>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>📋 Task Manager</Text>
      </View>

      {/* Input + Add Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={text}
          onChangeText={setText}
          accessibilityLabel="Task input field"
        />
        <TouchableOpacity
          onPress={addTask}
          style={styles.addButton}
          accessibilityLabel="Add task"
          accessibilityRole="button"
        >
          <Text style={styles.addButtonText}>＋</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4076/4076505.png' }}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyText}>No tasks yet. Add one and get started 🚀</Text>
          </View>
        }
        contentContainerStyle={tasks.length === 0 && { flexGrow: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF3D5'
  },
  header: {
    backgroundColor: '#9CAFAA',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FBF3D5'
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 15
  },
  input: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#9CAFAA',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    elevation: 2,
    color: '#333'
  },
  addButton: {
    backgroundColor: '#D6A99D',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 25,
    elevation: 3
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24
  },
  taskItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 2
  },
  taskPressed: {
    opacity: 0.9
  },
  completedTaskItem: {
    backgroundColor: '#D6DAC8'
  },
  taskTextContainer: {
    flex: 1
  },
  taskText: {
    fontSize: 16,
    color: '#333'
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#666'
  },
  deleteButton: {
    marginLeft: 10
  },
  deleteText: {
    fontSize: 18,
    color: '#D6A99D'
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 15
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 20
  }
});
