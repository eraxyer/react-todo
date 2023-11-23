import { createSlice } from '@reduxjs/toolkit';

// localStorage'dan veriyi almak için bir yardımcı fonksiyon //
const getStoredTasks = () => {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: getStoredTasks(), // localStorage'dan veriyi aldık //
  reducers: {
    setTasks: (state, action) => {
      return action.payload;
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
      const { id, title, completed } = action.payload;
      const task = state.find(task => task.id === id);
    
      if (task) {
        // Eğer action.payload.completed tanımlıysa onu kullan, değilse mevcut değeri koru
        task.completed = completed !== undefined ? completed : !task.completed;
        if (title !== undefined) {
          task.title = title;
        }
        localStorage.setItem('tasks', JSON.stringify(state));
      }
    },
    deleteTask: (state, action) => {
      const newState = state.filter(task => task.id !== action.payload.id);
      state.length = 0;
      state.push(...newState);
      localStorage.setItem('tasks', JSON.stringify(state)); // güncellenmiş veriyi localStorage'a kaydet
    },
  },
});

export const { setTasks, addTask, toggleTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
