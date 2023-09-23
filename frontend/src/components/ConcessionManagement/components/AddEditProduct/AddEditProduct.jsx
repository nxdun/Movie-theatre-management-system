import { Form, Input, InputNumber, Select, Space, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AddEditProduct.css';


export function AddEditProduct({ data, addMode, onDataChange }) {
  const [fileList, setFileList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [supplierListLoading, setSupplierListLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ data });
    setFileList(data?.P_image ? [{ uid: '-1', name: 'image.png', status: 'done', url: data?.P_image }] : []);
    axios.get('http://localhost:3013/supplier/').then((res) => {
      setSupplierList((res.data.suppliers || []).map(val => ({ ...val, key: val._id })));
      setSupplierListLoading(false);
    }, (err) => {
      setSupplierListLoading(false);
    })
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
  const handleDataChange = async (value) => {
    let src = '';
    let file = fileList[0];
    if (file) {
      src = file.url;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
    }

    onDataChange({ ...value.data, P_image: src });
  }

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return <Form id="AddEditProductForm" name="AddEditProductForm" form={form} initialValues={{ data }} onFinish={handleDataChange} validateMessages={validateMessages} style={{ paddingTop: 10, width: "100%" }}>
    <Space style={{ width: "100%" }} size="large">
      <div>
        <Form.Item
          name={['data', 'P_id']}
          rules={[
            {
              required: true
            },
          ]}
        >
          <Input addonBefore={<div style={{ width: 100, textAlign: "left" }}>Product Code</div>} style={{ width: 318 }} />
        </Form.Item>
        <Input.Group compact>
          <Input addonBefore={<div style={{ width: 100, textAlign: "left" }}>Product Type</div>} style={{ width: 124 }} />
          <Form.Item
            name={['data', 'P_type']}
            rules={[
              {
                required: true
              },
            ]}
          >
            <Select
              options={[
                { value: 'Food', label: 'Food' },
                { value: 'Beverage', label: 'Beverage' },
              ]}
              style={{ width: "195px" }}
            />
          </Form.Item>
        </Input.Group>
        <Form.Item
          name={['data', 'P_name']}
          rules={[
            {
              required: true
            },
          ]}
        >
          <Input addonBefore={<div style={{ width: 100, textAlign: "left" }}>Product Name</div>} style={{ width: "500px" }} />
        </Form.Item>
      </div>
      <div style={{ width: 128, height: 128 }}>
        <ImgCrop rotationSlider>
          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            maxCount={1}
          >
            {fileList.length === 0 && '+ Upload Image'}
          </Upload>
        </ImgCrop>
      </div>
    </Space>
    <Form.Item
      name={['data', 'P_description']}
      rules={[
        {
          required: true
        },
      ]}
    >
      <Input addonBefore={<div style={{ width: 136, textAlign: "left" }}>Product Description</div>} />
    </Form.Item>
    <Input.Group compact>
      <Input addonBefore={<div style={{ width: 140, textAlign: "left" }}>Supplier Code & Name</div>} style={{ width: 160 }} />
      <Form.Item
        name={['data', 'P_supplierId']}
        rules={[
          {
            required: true
          },
        ]}
        style={{ width: "calc(100% - 159px)" }}
      >
        <Select
          loading={supplierListLoading}
          options={supplierList.map(supplier => ({ value: supplier._id, label: `${supplier.S_id} - ${supplier.S_name}` }))}
          style={{ width: "100%" }}
        />
      </Form.Item>
    </Input.Group>
    <Form.Item name={['data', 'P_price']} rules={[{ required: true, type: 'number', min: 0 }]}>
      <InputNumber addonBefore={<div style={{ width: 100, textAlign: "left" }}>Prise (LKR)</div>} prefix="Rs." style={{ width: "322px" }}
        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} />
    </Form.Item>
    <Space>
      <Form.Item
        name={['data', 'P_reoderLevel']}
        rules={[
          {
            required: true
          },
        ]}
      >
        <Input addonBefore={<div style={{ width: 100, textAlign: "left" }}>Re-Order Level</div>} style={{ width: "322px" }} />
      </Form.Item>
      <Input.Group compact>
        <Input addonBefore={<div style={{ width: 100, textAlign: "left" }}>Status</div>} style={{ width: 124 }} />
        <Form.Item
          name={['data', 'P_status']}
          rules={[
            {
              required: true
            },
          ]}
        >
          <Select
            options={[
              { value: true, label: 'Active' },
              { value: false, label: 'Inactive' },
            ]}
            style={{ width: "199px" }}
          />
        </Form.Item>
      </Input.Group>
    </Space>

  </Form>
}
