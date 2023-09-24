import { EyeOutlined, PlusOutlined, PrinterFilled } from '@ant-design/icons';
import { Button, Col, Input, Layout, Modal, Row, Space, Table, message } from 'antd';
import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import { AddEditStock } from '../AddEditStock/AddEditStock';
import './StockList.css';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

export default function StockList() {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: '', addMode: false, data: null });
  const [dataLoading, setDataLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [dataSaving, setDataSaving] = useState(false);
  const [tableHeight, setTableHeight] = useState(600);
  const [messageApi, contextHolder] = message.useMessage();

  const ref = useRef(null);

  const columns = [
    {
      title: '#',
      key: 'index',
      render: (text, record, index) => (
        index + 1
      ),
      width: 50
    },
    {
      title: 'Product Code',
      dataIndex: 'P_id',
      key: 'P_id',
    },
    {
      title: 'Product Name',
      dataIndex: 'P_name',
      key: 'P_name',
    },
    {
      title: 'Available Quantity',
      dataIndex: 'P_quantity',
      key: ' P_quantity',
    },

    {
      title: 'Edit',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" ghost icon={<EyeOutlined />} size="middle" onClick={() => handleViewStockClick(record)}>
        </Button>
      ),
      width: 60
    },
  ];


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
    getData();
    return function () {
      window.removeEventListener("resize", () => {
      });
    }
  }, []);

  const getData = () => {
    setDataLoading(true);
    axios
      .get("http://localhost:3013/product/")
      .then(res => {
        const products = (res.data.products || []).map(val => ({ ...val, key: val._id }))
        setData(products);
        setSearchData(products);
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

  const handleSearch = (value) => {
    if (value === '') {
      getData();
    } else {
      setDataLoading(true);
      setSearching(true);
      setTimeout(() => {
        setDataLoading(false);
        setSearching(false);
        setSearchData(data.filter(val => val.P_id.toLowerCase().includes(value.toLowerCase()) || val.P_name.toLowerCase().includes(value.toLowerCase())));
      }, 1000);
    }
  }
  const handleAddNewStockClick = () => {
    setModalData({ title: 'Add New Stock', addMode: true, data: { products: data, stock: { St_productId: '', St_price: '', St_quantity: '' } } });
    setModalOpen(true);
  }
  const handleViewStockClick = (value) => {
    setModalData({ title: 'View Stock', addMode: false, data: { products: data, stock: { St_productId: value._id } } });
    setModalOpen(true);
  }
  const handleDataChange = (value) => {

    if (modalData.addMode) {
      setDataSaving(true);
      axios
        .post("http://localhost:3013/stock/add", value)
        .then(res => {
          setDataSaving(false);
          getData();
          setModalOpen(false);
          messageApi.open({
            type: 'success',
            content: 'The Stock has been added successfully.',
          });
        })
        .catch((err) => {
          setDataSaving(false);
          messageApi.open({
            type: 'error',
            content: err.message,
          });
        });
    } else {
      setModalOpen(false);
    }
  }
  const handlePrintClick = () => {
    const input = document.getElementById('StockListPrint');
    html2canvas(input)
      .then((canvas) => {
        const imageData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
        });
        const imgProps = pdf.getImageProperties(imageData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('download.pdf');
      });
  }
  return <>
    {contextHolder}
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
              <Button type="primary" shape="round" icon={<PrinterFilled />} size="middle" onClick={handlePrintClick}>
                Print
              </Button>
            </Space>
          </Col>
        </Row></Layout.Header>
      <Layout.Content >
        <div id="StockListPrint" className='StockList' ref={ref}>
          <Table columns={columns} dataSource={searchData} loading={dataLoading} scroll={{ y: tableHeight }} style={{ padding: "0px 50px" }} />
        </div>
      </Layout.Content>
    </Layout>
    <Modal
      title={modalData.title}
      centered
      width={700}
      open={modalOpen}
      okText={modalData.addMode ? "Save" : "Ok"}
      okButtonProps={{ loading: dataSaving, form: "AddEditStockForm", key: "submit", htmlType: "submit" }}
      cancelButtonProps={{ disabled: dataSaving, style: { display: modalData.addMode ? "inline-block" : "none" } }}
      onCancel={() => setModalOpen(false)}
    >
      <AddEditStock data={modalData.data} addMode={modalData.addMode} onDataChange={handleDataChange} />
    </Modal>
  </>
}
