// menuItems.js
import React from 'react';
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  CalendarOutlined ,
  DiffOutlined 
} from '@ant-design/icons';

export const items = [
  {
    label: 'Calender',
    key: '1',
    icon: <CalendarOutlined />,
    link: '/calender'
  },

  {
    label: 'Movie Shedule',
    key: '2',
    icon: <DiffOutlined />,
    link: '/sheduleMovie'
  },

  
];
// {
  //   label: 'Product',
  //   key: 'sub1',
  //   icon: <UserOutlined />,
  //   children: [
  //     { label: 'All Products', key: '3', link: '/product', icon: <UserOutlined />, },
  //     { label: 'Add Product', key: '4', link: '/add-product', icon: <UserOutlined />, },

  //   ],
  // },

  // {
  //   label: 'Team',
  //   key: 'sub2',
  //   icon: <TeamOutlined />,
  //   children: [
  //     { label: 'Team 1', key: '6', link: '/home' },
  //     { label: 'Team 2', key: '8', link: '/home' },
  //   ],
  // },

  // {
  //   label: 'Files',
  //   key: '9',
  //   icon: <FileOutlined />,
  //   link: '/home'
  // },