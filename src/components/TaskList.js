import React, { useEffect } from 'react';
import { List, Checkbox, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, removeTodo, toggleTodo } from '../redux/taskSlice';

const TaskList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleRemove = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <div>
      <h1>Task Listesi</h1>
      <List
        dataSource={todos}
        renderItem={(item) => (
          <List.Item>
            <Checkbox checked={item.completed} onChange={() => handleToggle(item.id)}>
              <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.title}</span>
            </Checkbox>
            <Button type="danger" onClick={() => handleRemove(item.id)}>
              Sil
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TaskList;
