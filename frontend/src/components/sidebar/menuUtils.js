// menuUtils.js
import React from 'react';
import { Menu } from 'antd';

const { SubMenu } = Menu;

export function getItem(title, key, icon, subItems = []) {
  if (subItems.length > 0) {
    return (
      <SubMenu key={key} title={title} icon={icon}>
        {subItems.map((subItem) => getItem(subItem.title, subItem.key))}
      </SubMenu>
    );
  }
  return (
    <Menu.Item key={key} icon={icon}>
      {title}
    </Menu.Item>
  );
}
