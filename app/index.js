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
  // State to store all tasks (each task has id, text, and completion status)
  const [tasks, setTasks] = useState([]);

  // State for the current text in the input field
  const [text, setText] = useState('');

  /**
   * Function to add a new task
   * - Prevents adding empty tasks
   * - Adds a unique id using Date.now()
   * - Default completion state is false
   */
  const addTask = () => {
    if (text.trim() === '') return; // ignore empty input
    setTasks(prev => [
      ...prev,
      { id: Date.now().toString(), text: text.trim(), completed: false }
    ]);
    setText(''); // reset input field
  };

  /**
   * Function to toggle a task's completion state
   * - Finds task by ID and flips the "completed" boolean
   */
  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /**
   * Function to delete a task from the list
   * - Filters out the task with the given ID
   */
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  /**
   * Render function for each task item in the FlatList
   * - Uses Pressable for toggle (completion)
   * - Delete button with trash icon
   */
  const renderTask = ({ item }) => (
    <Pressable
      onPress={() => toggleTask(item.id)}
      style={({ pressed }) => [
        styles.taskItem,
        pressed && styles.taskPressed, // visual feedback when pressed
        item.completed && styles.completedTaskItem // change background if completed
      ]}
      accessibilityLabel={`Task: ${item.text}`}
      accessibilityRole="button"
    >
      {/* Task text container */}
      <View style={styles.taskTextContainer}>
        <Text style={[styles.taskText, item.completed && styles.completedText]}>
          {item.text}
        </Text>
      </View>

      {/* Delete button */}
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
      {/* App Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>📋 Task Manager</Text>
      </View>

      {/* Input field + Add button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={text}
          onChangeText={setText} // update input state
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

      {/* Task list */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id} // unique key for each item
        renderItem={renderTask}
        ListEmptyComponent={
          // Friendly empty state when there are no tasks
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
  // Screen background color
  container: {
    flex: 1,
    backgroundColor: '#FBF3D5' // light cream background
  },

  // Header styles
  header: {
    backgroundColor: '#9CAFAA', // cool gray-blue header
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
    color: '#FBF3D5' // text color matches background cream
  },

  // Input row container
  inputContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 15 // spacing before task list starts
  },

  // Task input text field
  input: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#9CAFAA', // matches header tone
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    elevation: 2,
    color: '#333' // readable dark text
  },

  // Add task button
  addButton: {
    backgroundColor: '#D6A99D', // warm beige
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

  // Task item styles
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
    opacity: 0.9 // feedback on press
  },
  completedTaskItem: {
    backgroundColor: '#D6DAC8' // soft sage for completed tasks
  },

  // Task text container
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

  // Delete button styles
  deleteButton: {
    marginLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 6, // extra touch area
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 1
  },
  deleteText: {
    fontSize: 26, // bigger icon
    color: '#B22222' // high-contrast red
  },

  // Empty state container
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
