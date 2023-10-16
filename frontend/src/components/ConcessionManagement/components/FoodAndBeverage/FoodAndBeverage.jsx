import { ShoppingCartOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Flex, InputNumber, Tabs, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addConsessToCart } from '../../../../redux/actions/cartActions';
import Swal from 'sweetalert2';

export default function FoodAndBeverage({ prop = 'default value' }) {
  const [food, setFood] = useState([]);
  const [beverage, setBeverage] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setDataLoading(true);
    axios
      .get("/product/")
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

  const handleAddToCart = (item) => {
    // Create a movie slip object with relevant details
    const conSec = {
      product: item, // Use seatId or another identifier
      name: item.P_name, // Customize as needed
      imageUrl: item.P_image, // Provide an image URL if available
      price: item.P_price, // Customize as needed
      countInStock: 1, // Set the available stock count
      qty: 1, // Set the quantity to 1
    };

    // Dispatch the action to add the movie slip to the cart
    dispatch(addConsessToCart(conSec));

    Swal.fire({
      icon: 'success',
      title: 'Item Added To Cart',
      showConfirmButton: false,
      timer: 900
    })

    // Optional: Provide UI feedback to the user
     // Update the route as needed
  };

  const items = [
    {
      key: '1',
      label: 'Food',
      children: <Flex wrap="wrap" gap="large" style={{ padding: 20 }}>
        {food.map((item) => <FoodAndBeverageItem item={item} handleAddToCart={handleAddToCart} />)}
      </Flex>,
    },
    {
      key: '2',
      label: 'Beverage',
      children: <Flex wrap="wrap" gap="large" style={{ padding: 20 }}>
        {beverage.map((item) => <FoodAndBeverageItem item={item} handleAddToCart={handleAddToCart} />)}
      </Flex>
    },
  ];

  const handleContinue = () => {
    navigate('/shop');
    console.log();
  };

  return (
    <div className="FoodAndBeverage">
      <Tabs
        type="card"
        items={items}
        tabBarExtraContent={
          <Button
            type="primary"
            shape="round"
            size="large"
            icon={<ArrowRightOutlined />}
            onClick={handleContinue}
          >
            continue
          </Button>
        }
      />
    </div>
  );
}

function FoodAndBeverageItem({ item, handleAddToCart }) {
  const [q, setQ] = useState(0);

  const handleQtyChange = (q) => {
    setQ(q);
  }

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src={item.P_image}
        />
      }
      actions={[
        <InputNumber addonBefore="Qty" value={q} max={20} style={{ paddingLeft: 30 }} onChange={handleQtyChange} />,
        <Button type="primary" shape="round" icon={<ShoppingCartOutlined />} onClick={() => handleAddToCart(item)}>
          Add
        </Button>
      ]}
    >
      <Card.Meta
        title={`${item.P_name} - Rs. ${item.P_price}`}
        description={item.P_description}
      />
    </Card>
  );
}
