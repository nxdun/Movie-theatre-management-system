import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Flex, InputNumber, Tabs, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


export function FoodAndBeverage({ prop = 'default value' }) {
  const [food, setFood] = useState([]);
  const [beverage, setBeverage] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setDataLoading(true);
    axios
      .get("http://localhost:3013/product/")
      .then(res => {
        const food = (res.data.products || []).filter(val => val.P_type === 'Food').map(val => ({ ...val, key: val._id }));
        const beverage = (res.data.products || []).filter(val => val.P_type === 'Beverage').map(val => ({ ...val, key: val._id }));
        setFood(food);
        setBeverage(beverage);
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

  const handleAddItem = (item, q) => {
    console.log(item, q)
  }

  const items = [
    {
      key: '1',
      label: 'Food',
      children: <Flex wrap="wrap" gap="large" style={{ padding: 20 }}>
        {food.map((item) => <FoodAndBeverage item={item} onAddItem={handleAddItem} />)}
      </Flex>,
    },
    {
      key: '2',
      label: 'Beverage',
      children: <Flex wrap="wrap" gap="large" style={{ padding: 20 }}>
        {beverage.map((item) => <FoodAndBeverage item={item} onAddItem={handleAddItem} />)}
      </Flex>
    },
  ];

  return <div className="FoodAndBeverage">
    <Tabs
      type="card"
      items={items}
    />
  </div>;
}

function FoodAndBeverage({ item, onAddItem }) {
  const [q, setQ] = useState(0);
  handleAddItem = () => {
    onAddItem(item, q)
  }
  handleQtyChange = (q) => {
    setQ(q)
  }
  return <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src={item.P_image}
      />
    }
    actions={[
      <InputNumber addonBefore="Qty" value={q} max={20} style={{ paddingLeft: 30 }} onChange={handleQtyChange} />,
      <Button type="primary" shape="round" icon={<ShoppingCartOutlined />} onClick={handleAddItem}>
        Add
      </Button>
    ]}
  >
    <Card.Meta
      title={item.P_name}
      description={item.P_description}
    />
  </Card>;
}
