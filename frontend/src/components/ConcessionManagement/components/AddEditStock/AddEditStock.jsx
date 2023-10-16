import { Input, Space, Select, InputNumber, Form, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import './AddEditStock.css';
import axios from 'axios';

export function AddEditStock({ data, addMode, onDataChange }) {
  const [supplierList, setSupplierList] = useState([]);
  const [supplierListLoading, setSupplierListLoading] = useState(false);
  const [stockList, setStockList] = useState([]);
  const [stockListLoading, setStockListLoading] = useState(false);
  const [form] = Form.useForm();
  const productId = Form.useWatch(['data', 'St_productId'], form);
  useEffect(() => {
    form.setFieldsValue({ data: data.stock })
    setSupplierList((data.products || []).map(val => ({ ...val, key: val._id })));
    axios.get('http://localhost:3013/supplier/').then((res) => {
      setSupplierList((res.data.suppliers || []).map(val => ({ ...val, key: val._id })));
      setSupplierListLoading(false);
    }, (err) => {
      setSupplierListLoading(false);
    });
    if (!addMode) {
      setStockListLoading(true);
      axios.get(`http://localhost:3013/stock/get/${data.stock.St_productId}`).then((res) => {
        setStockList((res.data.stocks || []).map(val => ({ ...val, key: val._id })));
        setStockListLoading(false);
      }, (err) => {
        setStockListLoading(false);
      });
    }
  }, [data]);

  const validateMessages = {
    required: 'Input is required!',
    types: {
      email: 'Input is not a valid email!',
      number: 'Input is not a valid number!',
    },
    number: {
      range: 'Input must be between 1 and 10',
    },
  };

  const handleDataChange = (value) => {

    onDataChange(value.data);
  }
  return <Form id="AddEditStockForm" name="AddEditStockForm" form={form} initialValues={{ data: data.stock }} onFinish={handleDataChange} validateMessages={validateMessages} style={{ paddingTop: 10, width: "100%" }}>
    <Input.Group compact>
      <Input addonBefore={<div style={{ width: 140, textAlign: "left" }}>Product Code & Name</div>} style={{ width: 160 }} />
      <Form.Item
        name={['data', 'St_productId']}
        rules={[
          {
            required: true
          },
        ]}
        style={{ width: "calc(100% - 159px)" }}
      >
        <Select
          options={data.products.map(product => ({ value: product._id, label: `${product.P_id} - ${product.P_name}` }))}
          style={{ width: "100%", pointerEvents: addMode ? "" : "none" }}
        />
      </Form.Item>
    </Input.Group>
    <Input.Group compact>
      <Input addonBefore={<div style={{ width: 140, textAlign: "left" }}>Supplier Code & Name</div>} style={{ width: 160 }} />
      <Form.Item style={{ width: "calc(100% - 159px)" }}>
        <Select
          value={supplierList?.find(supplier => supplier._id === data?.products.find(product => product._id === productId)?.P_supplierId)?._id}
          loading={supplierListLoading}
          options={supplierList.map(supplier => ({ value: supplier._id, label: `${supplier.S_id} - ${supplier.S_name}` }))}
          style={{ width: "100%", pointerEvents: "none" }}
        />
      </Form.Item>
    </Input.Group>
    {addMode ?
      <Space style={{ width: "100%" }}>
        <Form.Item
          name={['data', 'St_price']}
          rules={[
            {
              required: true
            },
          ]}>
          <InputNumber addonBefore={<div style={{ width: 100, textAlign: "left" }}>Prise (LKR)</div>} prefix="Rs." style={{ width: "322px" }}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} />
        </Form.Item>
        <Form.Item
          name={['data', 'St_quantity']}
          rules={[
            {
              required: true
            },
          ]}>
          <InputNumber addonBefore={<div style={{ width: 100, textAlign: "left" }}>Quantity</div>} style={{ width: "322px" }} />
        </Form.Item>
      </Space> :
      <Table columns={[{
        title: 'Prise (LKR)',
        dataIndex: 'St_price',
        key: 'St_price',
      },
      {
        title: 'Quantity',
        dataIndex: 'St_quantity',
        key: ' St_quantity',
      }]} dataSource={stockList} loading={setStockListLoading} />
    }
  </Form>
}
