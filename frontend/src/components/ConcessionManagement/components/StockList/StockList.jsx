import { EyeOutlined, PlusOutlined, PrinterFilled } from '@ant-design/icons';
import { Button, Col, Input, Layout, Modal, Row, Space, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { AddEditStock } from '../AddEditStock/AddEditStock';
import './StockList.css';

export default function StockList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: '', addMode: false, data: null });
  const [dataLoading, setDataLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [dataSaving, setDataSaving] = useState(false);
  const [tableHeight, setTableHeight] = useState(600);

  const ref = useRef(null);

  useEffect(() => {
    if (ref && ref.current) {
      const timeoutId = setTimeout(() => {
        const node = ref.current;
        const { height } = node.getBoundingClientRect();
        setTableHeight(height - 119);
        clearTimeout(timeoutId);
      }, 10);

    }
    window.addEventListener("resize", () => {
      if (ref && ref.current) {
        const node = ref.current;
        const { height } = node.getBoundingClientRect();
        setTableHeight(height - 119);
      }
    });

    return function () {
      window.removeEventListener("resize", () => {
      });
    }
  }, []);

  const handleSearch = (value) => {
    setDataLoading(true);
    setSearching(true);
    setTimeout(() => {
      setDataLoading(false);
      setSearching(false);
    }, 3000);
  }
  const handleAddNewStockClick = () => {
    setModalData({ title: 'Add New Stock', addMode: true, data: {} });
    setModalOpen(true);
  }
  const handleViewStockClick = (data) => {
    setModalData({ title: 'View Stock', addMode: false, data: data });
    setModalOpen(true);
  }
  const handleDataChange = (data) => {
    setModalData({ ...modalData, data });
  }
  const handleModalOkClick = () => {
    if (modalData.addMode) {
      setDataSaving(true);
      setTimeout(() => {
        setDataSaving(false);
        setModalOpen(false);
      }, 3000);

    } else {
      setModalOpen(false);
    }

  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags'
    },
    {
      title: 'Edit',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" ghost icon={<EyeOutlined />} size="middle" onClick={() => handleViewStockClick(record)}>
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '11',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '12',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '13',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '21',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '22',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '23',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '31',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '32',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '33',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '41',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '42',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '43',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '51',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '52',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '53',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '61',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '62',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '63',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '71',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '72',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '73',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return <>
    <Layout className="StockList">
      <Layout.Header style={{ backgroundColor: "#ffffff" }}>
        <Row align="middle">
          <Col flex="400px">
            <div style={{ height: 32 }}>
              <Input.Search placeholder="search..." onSearch={handleSearch} enterButton allowClear loading={searching} disabled={dataLoading && !searching} />
            </div>
          </Col>
          <Col flex="auto"></Col>
          <Col >
            <Space>
              <Button type="primary" shape="round" icon={<PlusOutlined />} size="middle" onClick={handleAddNewStockClick}>
                Add New Stock
              </Button>
              <Button type="primary" shape="round" icon={<PrinterFilled />} size="middle">
                Print
              </Button>
            </Space>
          </Col>
        </Row></Layout.Header>
      <Layout.Content >
        <div className='StockList' ref={ref}>
          <Table columns={columns} dataSource={data} loading={dataLoading} scroll={{ y: tableHeight }} style={{ padding: "0px 50px" }} />
        </div>
      </Layout.Content>
    </Layout>
    <Modal
      title={modalData.title}
      centered
      width={700}
      open={modalOpen}
      okText={modalData.addMode ? "Save" : "Ok"}
      okButtonProps={{ loading: dataSaving }}
      onOk={handleModalOkClick}
      cancelButtonProps={{ disabled: dataSaving, style: { display: modalData.addMode ? "inline-block" : "none" } }}
      onCancel={() => setModalOpen(false)}
    >
      <AddEditStock data={modalData.data} onDataChange={handleDataChange} />
    </Modal>
  </>
}
