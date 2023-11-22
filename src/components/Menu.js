import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const AppMenu = () => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState('list');

  useEffect(() => {
    const path = location.pathname;

    if (path === '/liste' || path === '/') {
      setSelectedKey('list');
    } else if (path === '/task-ekle') {
      setSelectedKey('add');
    }
  }, [location.pathname]);

  return (
    <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]}>
      <Menu.Item key="list">
        <Link to="/liste">Görev Listesi</Link>
      </Menu.Item>
      <Menu.Item key="add">
        <Link to="/task-ekle">Yeni Görev Ekle</Link>
      </Menu.Item>
    </Menu>
  );
};

export default AppMenu;
