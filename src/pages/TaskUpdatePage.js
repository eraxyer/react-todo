import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Space } from 'antd';
import { toggleTask } from '../redux/taskSlice';

const TaskUpdatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Redux'tan tüm görevleri al //
  const tasks = useSelector(state => state.tasks);

  // id'ye sahip görevi bul //
  const task = tasks.find(task => task.id === parseInt(id));

  // Görev varsa ve title, completed özellikleri tanımlıysa
  const taskTitle = task?.title || "";

  const [updatedTitle, setUpdatedTitle] = useState(taskTitle);

  useEffect(() => {
    // Görev değiştiğinde updatedTitle'ı güncelle //
    setUpdatedTitle(task?.title || "");
  }, [task]);

  const handleUpdate = () => {
    // Güncelle butonuna tıklandığında Redux store'u güncelleme //
    dispatch(toggleTask({ id: task.id, title: updatedTitle, completed: task.completed }));
    navigate('/liste');
  };

  const handleTitleChange = (e) => {
    // Input alanındaki değişikliği takip et ve updatedTitle'ı güncelle //
    setUpdatedTitle(e.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Görev Güncelleme</h1>
      <Form>
        <Form.Item label="Görev Başlığı" name="title" initialValue={taskTitle}>
          <Input onChange={handleTitleChange} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" onClick={handleUpdate}>
              Güncelle
            </Button>
            <Button onClick={() => navigate('/liste')}>
              İptal
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaskUpdatePage;
