import React, { useState, useEffect } from 'react';
import { Card, Button, List, message, Avatar } from 'antd';
import { ReloadOutlined, SendOutlined, ShoppingOutlined } from '@ant-design/icons';
import axios from 'axios';

import './ReorderList.css';


export function ReorderList({ prop = 'default value' }) {
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [supplierList, setSupplierList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    axios.get('http://localhost:3013/supplier/').then((res) => {
      setSupplierList((res.data.suppliers || []).map(val => ({ ...val, key: val._id })));
    }, (err) => {
      messageApi.open({
        type: 'error',
        content: err.message,
      });
    });
    getData();
  }, []);

  const getData = () => {
    setDataLoading(true);
    axios
      .get("http://localhost:3013/product/")
      .then(res => {
        const products = (res.data.products || []).filter(val=>val.P_quantity<=val.P_reoderLevel).map(val => ({ ...val, key: val._id }))
        setData(products);
        setDataLoading(false);
      })
      .catch((err) => {
        setDataLoading(false);
        messageApi.open({
          type: 'error',
          content: err.message,
        });
      });
  }

  const sendEmail = (item) => {
    const email = supplierList.find(val => val._id === item.P_supplierId)?.S_email;
    const subject = 'Reorder List';
    const body = `Dear Supplier, \n\nPlease send us ${item.P_reoderLevel + 1000} more ${item.P_name}.\n\nThank you.`;
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
  }

  return <Card title="Reorder List" extra={
    <Button type="link" shape="circle" icon={<ReloadOutlined />} onClick={getData} />} style={{ width: 500 }}>
    <List
      className="ReorderList"
      loading={dataLoading}
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          actions={[<Button type="primary" shape="round" icon={<SendOutlined />} onClick={() => sendEmail(item)}>
            ReOrder
          </Button>]}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.P_image} shape="square" size="large" icon="<ShoppingOutlined />" onError={() => false} />}
            title={`${item.P_id}/${item.P_name}`}
            description={item.P_description}
          />
        </List.Item>
      )}
    />
  </Card>
}
