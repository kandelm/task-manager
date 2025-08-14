# 📋 Task Manager - React Native

A simple and intuitive Task Manager app built with React Native. This app allows users to add, complete, and delete tasks, providing a clean user experience while demonstrating core concepts of state management and UI interactions.

## 🚀 Features

- **Add Task**: Quickly add a task with a brief description.
- **Mark as Complete**: Toggle a task's completion status with visual distinction.
- **Delete Task**: Remove tasks from the list.
- **Task List**: View all tasks (completed and pending) in a scrollable list.
- **Visual Feedback**: Completed tasks are styled differently, and press animations are provided.
- **Accessibility**: Includes accessibility labels for better screen reader support.

## 🛠 Technologies Used

- **React Native** (via Expo)
- No external UI libraries - only built-in React Native components.

## 📦 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/kandelm/task-manager.git
cd task-manager
```

### 2️⃣ Install dependencies
```bash
npm install

```

### 3️⃣ Start the development server
If using **Expo**:
```bash
npx expo start
```

If using **React Native CLI** (ensure your environment is set up):
```bash
npx react-native start
npx react-native run-android   # for Android
npx react-native run-ios       # for iOS
```

## 📖 Usage

1. Type a task in the input field.
2. Press the ➕ button to add it.
3. Tap a task to toggle its completed state.
4. Press the 🗑 icon to delete a task.
5. Enjoy task organization! ✅


## 🧑‍💻 Code Overview

- **State Management**: Uses `useState` for local component state.
- **UI Components**: Implemented with `FlatList`, `TextInput`, `Pressable`, `TouchableOpacity`, and `View`.
- **Styles**: Managed via `StyleSheet` for consistency.

## 📜 Special Instructions

- Works on both Android and iOS.
- No persistent storage; tasks reset on app restart (optional enhancement could be `AsyncStorage`).

## 📄 License

This project is licensed under the MIT License.

---
Made with ❤️ for the Chapter One React Native Tech Screen.
