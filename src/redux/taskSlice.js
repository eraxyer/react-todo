// src/redux/tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

// localStorage'dan veriyi almak için bir yardımcı fonksiyon
const getStoredTasks = () => {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: getStoredTasks(), // localStorage'dan veriyi al
  reducers: {
    setTasks: (state, action) => {
  // JSON'dan gelen yeni veri ile Redux store'u güncelleme
    state = [...action.payload]; // state'e yeni bir referans ataması yaparak güncelleme
    localStorage.setItem('tasks', JSON.stringify(state)); // güncellenmiş veriyi localStorage'a kaydet
    },
    addTask: (state, action) => {
      const newTask = {
        id: new Date().getTime(),
        title: action.payload.title,
        completed: false,
      };
      state.unshift(newTask);
      localStorage.setItem('tasks', JSON.stringify(state)); // güncellenmiş veriyi localStorage'a kaydet
    },
    toggleTask: (state, action) => {
      const task = state.find(task => task.id === action.payload.id);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state)); 
      }
    },
    deleteTask: (state, action) => {
      const newState = state.filter(task => task.id !== action.payload.id);
      state.length = 0;
      state.push(...newState);
      localStorage.setItem('tasks', JSON.stringify(state)); 
    },
  },
});

export const { setTasks, addTask, toggleTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
