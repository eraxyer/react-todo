import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { addTask } from '../redux/taskSlice';

const AddTaskPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(addTask({ title: values.title }));
    navigate('/liste'); 
  };

  return (
    <div style={{ maxWidth: '500px',  padding: '20px' }}>
      <h1>Yeni Görev Ekle</h1>
      <Form onFinish={onFinish}>
        <Form.Item
          label="Görev İsmi"
          name="title"
          rules={[{ required: true, message: 'Görev boş bırakılmaz!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            EKLE
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddTaskPage;
