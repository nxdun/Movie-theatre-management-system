import { MenuOutlined, PieChartOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Layout, Menu, Row } from 'antd';
import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './MainLayout.css';

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    {
      key: '/dashboard',
      icon: <PieChartOutlined />,
      label: 'Manager Dashboard',
    },
    {
      key: '/concession',
      icon: <ShoppingCartOutlined />,
      label: 'Concession Management',
      children: [
        { key: '/concession/supplier_list', label: 'Supplier List' },
        { key: '/concession/product_list', label: 'Product List' },
        { key: '/concession/stock_list', label: 'Stock List' }]
    }
  ];
  const handleMenuClick = ({ item, key, keyPath, domEvent }) => {
    navigate(key === '/dashboard' ? '/' : key);
  }
  const findTitle = (items, pathname) => {
    let title = '';
    items.forEach(item => {
      if (item.children) {
        title = findTitle(item.children, pathname);
      }
      if (item.key === pathname) {
        title = item.label;
      }
    });
    return title;
  }
  return <Layout className="MainLayout">
    <Layout.Header>
      <Row>
        <Col flex="40px">
          <Button
            ghost
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Col>
        <Col flex="auto" className="HeaderTitle">{findTitle(items, location.pathname) || 'Manager Dashboard'}</Col>
        <Col flex="40px">
          <Avatar size="large" icon={<UserOutlined />} />
        </Col>
      </Row>
    </Layout.Header>
    <Layout>
      <Layout.Sider width={250} trigger={null} collapsible collapsed={collapsed}>
        <Menu
          defaultSelectedKeys={[location.pathname === '/' ? '/dashboard' : location.pathname]}
          defaultOpenKeys={['/concession']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
          onClick={handleMenuClick}
        />
      </Layout.Sider>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  </Layout>;
}
