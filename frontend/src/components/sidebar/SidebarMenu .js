import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'; // Import Link
import { items } from './sidebarData';

function SidebarMenu({isDarkMode}) {
  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{background: isDarkMode ? 'var(--content-container-bg-dark)' : '#001529'}}>
      {items.map((item) =>
        item.children ? (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
            {item.children.map((child) => (
              <Menu.Item key={child.key} icon={child.icon}>
                <Link to={child.link}>{child.label}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        )
      )}
    </Menu>
  );
}

export default SidebarMenu;
