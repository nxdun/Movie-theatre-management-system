import { Form, Input, InputNumber, Select, Space } from 'antd';
import React, { useEffect } from 'react';
import './AddEditSupplier.css';


export default function AddEditSupplier({ data, addMode, onDataChange }) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ data })
  }, [data]);
  const validateMessages = {
    required: 'Input is required!',
    types: {
      email: 'Input is not a valid email!',
      number: 'Input is not a valid number!',
    },
    number: {
      range: 'Input must be 9 digits',
    },
  };
  const handleDataChange = (value) => {
    onDataChange(value.data);
  }
  const checkNo = (_, value) => {
    if (value.number > 0 && value.number.toString().length === 9) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Input must be 9 digits!'));
  };
  return <Form id="AddEditSupplierForm" name="AddEditSupplierForm" form={form} initialValues={{ data }} onFinish={handleDataChange} validateMessages={validateMessages} style={{ paddingTop: 10, width: "100%" }}>
    <Form.Item
      name={['data', 'S_id']}
      rules={[
        {
          required: true
        },
      ]}
    >
      <Input readOnly={!addMode} addonBefore={<div style={{ width: 100, textAlign: "left" }}>Supplier Code</div>} style={{ width: "322px" }} />
    </Form.Item>
    <Form.Item
      name={['data', 'S_name']}
      rules={[
        {
          required: true
        },
      ]}
    >
      <Input addonBefore={<div style={{ width: 100, textAlign: "left" }}>Supplier Name</div>} />
    </Form.Item>
    <Form.Item
      name={['data', 'S_address']}
      rules={[
        {
          required: true
        }
      ]}
    >
      <Input addonBefore={<div style={{ width: 100, textAlign: "left" }}>Address</div>} />
    </Form.Item>
    <Space style={{ width: "100%" }}>
      <Form.Item
        name={['data', 'S_contactNo']}
        rules={[{ validator: checkNo }
        ]}
      >
        <InputNumber prefix="+94" addonBefore={<div style={{ width: 100, textAlign: "left" }}>Contact No</div>} style={{ width: "322px" }} />
      </Form.Item>
      <Form.Item
        name={['data', 'S_email']}
        rules={[
          {
            type: 'email',
            required: true,
          },
        ]}
      >
        <Input addonBefore={<div style={{ width: 100, textAlign: "left" }}>Email</div>} style={{ width: "322px" }} />
      </Form.Item>
    </Space>

    <Input.Group compact>
      <Input addonBefore={<div style={{ width: 100, textAlign: "left" }}>Status</div>} style={{ width: 124 }} />
      <Form.Item
        name={['data', 'S_status']}
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
  </Form>
}
