// src/pages/TaskListPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Checkbox, Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import { CheckOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import { setTasks, toggleTask, deleteTask } from '../redux/taskSlice';

const TaskListPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        dispatch(setTasks(response.data));
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, [dispatch]);

  const handleCheckboxChange = (taskId) => {
    // Checkbox durumu değiştiğinde Redux store'u güncelleme
    dispatch(toggleTask({ id: taskId }));
  };

  const handleDeleteTask = (taskId) => {
    // Task silindiğinde Redux store'u güncelleme
    dispatch(deleteTask({ id: taskId }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Görev Listesi ({tasks.length})</h1>
      <List
        dataSource={tasks}
        renderItem={task => (
          <List.Item>
              <Checkbox
                checked={task.completed}
                onChange={() => handleCheckboxChange(task.id)}
              >
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</span>
              </Checkbox>
              <div>
              {task.completed ? <CheckOutlined style={{ color: 'green', marginRight : 10 }} /> : <CloseOutlined style={{ color: 'red', marginRight : 10 }} />}
                <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDeleteTask(task.id)} >
                  Sil
                </Button>
              </div>
          </List.Item>
        )}
      />
      <Link to="/task-ekle">
        <Button type="primary">
          Yeni Görev Ekle
        </Button>
      </Link>
    </div>
  );
};

export default TaskListPage;
