import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskListPage from './pages/TaskListPage';
import AddTaskPage from './pages/AddTaskPage';
import AppMenu from './components/Menu';
import { useDispatch } from 'react-redux';
import { setTasks } from './redux/taskSlice';
import { useStore } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan veriyi çek ve Redux store'u güncelle
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      dispatch(setTasks(JSON.parse(storedTasks)));
    }
  }, [dispatch]);

  useEffect(() => {
    // Redux store güncellendiğinde localStorage'a yaz
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <AppMenu />
      <Routes>
        <Route path="/" element={<TaskListPage />} /> 
        <Route path="/liste" element={<TaskListPage />} />
        <Route path="/task-ekle" element={<AddTaskPage />} />
      </Routes>
    </Router>
  );
}

export default App;
