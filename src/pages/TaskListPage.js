import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Checkbox, Button, Space } from 'antd';
import { CheckOutlined, DeleteOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { setTasks, toggleTask, deleteTask } from '../redux/taskSlice';
import { Link } from 'react-router-dom';

const TaskListPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);

  useEffect(() => {
    // Redux store boşsa JSONPlaceholder'dan veriyi çek //
    if (tasks.length === 0) {
      axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(response => {
          dispatch(setTasks(response.data));
          console.log(response)
        })
        .catch(error => {
          console.error('Error task', error);
        });
    }
  }, [dispatch, tasks]);

  const handleCheckboxChange = (taskId) => {
    dispatch(toggleTask({ id: taskId }));
  };

  const handleDeleteTask = (taskId) => {
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
          <Space>
            {task.completed ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />}
            <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDeleteTask(task.id)}>
              Sil
            </Button>
            <Link to={{ pathname: `/task-guncelle/${task.id}`, state: { task } }}>
              <Button type="default" icon={<EditOutlined />}>
                Güncelle
              </Button>
            </Link>
          </Space>
        </List.Item>
      )}
    />
  </div>
  );
};

export default TaskListPage;
