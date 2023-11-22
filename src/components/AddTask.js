import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/taskSlice';

const AddTask = ({ history }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');

  const handleAddTask = () => {
    dispatch(addTodo({ title, completed: false }));
    setTitle('');
    history.push('/liste');
  };

  return (
    <div>
      <h1>Task Ekle</h1>
      <Input
        placeholder="Task adını girin"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="primary" onClick={handleAddTask}>
        Ekle
      </Button>
    </div>
  );
};

export default AddTask;
