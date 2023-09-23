import { Input, Space, Select, InputNumber } from 'antd';
import React from 'react';
import './AddEditStock.css';

export function AddEditStock({ data, onDataChange }) {
  const handleActiveChange = (value) => {
    onDataChange({ ...data, status: value });
  }
  return <Space direction="vertical" size="middle" style={{ paddingTop: 10, width: "100%" }}>
    <Input.Group compact>
      <Input addonBefore={<div style={{ width: 140, textAlign: "left" }}>Product Code & Name</div>} style={{ width: 160 }} />
      <Select
        defaultValue="Active"
        onChange={handleActiveChange}
        options={[
          { value: 'Active', label: 'Active' },
          { value: 'Inactive', label: 'Inactive' },
        ]}
        style={{ width: "calc(100% - 159px)" }}
      />
    </Input.Group>
    <Input.Group compact>
      <Input addonBefore={<div style={{ width: 140, textAlign: "left" }}>Supplier Code & Name</div>} style={{ width: 160 }} />
      <Select
        defaultValue="Active"
        onChange={handleActiveChange}
        options={[
          { value: 'Active', label: 'Active' },
          { value: 'Inactive', label: 'Inactive' },
        ]}
        style={{ width: "calc(100% - 159px)" }}
      />
    </Input.Group>
    <Space style={{ width: "100%" }}>
      <InputNumber addonBefore={<div style={{ width: 100, textAlign: "left" }}>Prise (LKR)</div>} prefix="Rs." style={{ width: "322px" }} 
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}/>
      <InputNumber addonBefore={<div style={{ width: 100, textAlign: "left" }}>Quantity</div>} style={{ width: "322px" }} />
    </Space>
  </Space>
}
