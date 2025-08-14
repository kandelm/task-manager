import React, { useState } from 'react';
import {
  FlatList,
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

  /**
   * Add a new task to the list
   */
  const addTask = () => {
    if (text.trim() === '') return;
    setTasks(prev => [
      ...prev,
      { id: Date.now().toString(), text: text.trim(), completed: false }
    ]);
    setText('');
  };

  /**
   * Toggle a task's completed state
   */
  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /**
   * Delete a task from the list
   */
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  /**
   * Render each task item
   */
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
      <Text style={styles.header}>📋 Task Manager</Text>

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
          <Text style={styles.emptyText}>No tasks yet. Add one!</Text>
        }
        contentContainerStyle={tasks.length === 0 && { flexGrow: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa'
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 8
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24
  },
  taskItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  taskPressed: {
    opacity: 0.8
  },
  completedTaskItem: {
    backgroundColor: '#e8f5e9' // light green background for completed tasks
  },
  taskTextContainer: {
    flex: 1
  },
  taskText: {
    fontSize: 16
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray'
  },
  deleteButton: {
    marginLeft: 10
  },
  deleteText: {
    fontSize: 18,
    color: 'red'
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray'
  }
});
