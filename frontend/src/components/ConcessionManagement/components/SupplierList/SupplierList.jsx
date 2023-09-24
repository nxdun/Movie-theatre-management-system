import { EditOutlined, PlusOutlined, PrinterFilled } from '@ant-design/icons';
import { Button, Col, Input, Layout, Modal, Row, Space, Table, message } from 'antd';
import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import AddEditSupplier from '../AddEditSupplier/AddEditSupplier';
import './SupplierList.css';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

export default function SupplierList() {
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
      title: 'Supplier Code',
      dataIndex: 'S_id',
      key: 'S_id'
    },
    {
      title: 'Supplier Name',
      dataIndex: 'S_name',
      key: 'S_name'
    },
    {
      title: 'Status',
      dataIndex: 'S_status',
      key: 'S_status',
      render: (text, record, index) => (
        record?.S_status ? 'Active' : 'Inactive'
      ),
      width: 100
    },
    {
      title: 'Email',
      dataIndex: 'S_email',
      key: 'S_email'
    },
    {
      title: 'Contact No',
      dataIndex: 'S_contactNo',
      key: 'S_contactNo'
    },
    {
      title: 'Edit',
      key: 'action',
      render: (text, record, index) => (
        <Button type="primary" ghost icon={<EditOutlined />} size="middle" onClick={() => handleEditSupplierClick(record)}>
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
    getData()
    return function () {
      window.removeEventListener("resize", () => {
      });
    }
  }, []);

  const getData = () => {
    setDataLoading(true);
    axios
      .get("http://localhost:3013/supplier/")
      .then(res => {
        const suppliers = (res.data.suppliers || []).map(val => ({ ...val, key: val._id }))
        setData(suppliers);
        setSearchData(suppliers);
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
        setSearchData(data.filter(val => val.S_id.toLowerCase().includes(value.toLowerCase()) || val.S_name.toLowerCase().includes(value.toLowerCase())));
      }, 1000);
    }
  }
  const handleAddNewSupplierClick = () => {
    setDataSaving(false);
    setModalData({
      title: 'Add New Supplier', addMode: true,
      data: {
        S_id: '',
        S_name: '',
        S_address: '',
        S_email: '',
        S_contactNo: '',
        S_status: true,
        S_createDate: '',
      }
    });
    setModalOpen(true);
  }
  const handleEditSupplierClick = (data) => {
    setDataSaving(false);
    setModalData({ title: 'View & Edit Supplier', addMode: false, data: data });
    setModalOpen(true);
  }
  const handlePrintClick = () => {
    const input = document.getElementById('SupplierListPrint');
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
  const handleDataChange = (value) => {
    setDataSaving(true);
    if (modalData.addMode) {
      axios
        .post("http://localhost:3013/supplier/add", value)
        .then(res => {
          setDataSaving(false);
          getData();
          setModalOpen(false);
          messageApi.open({
            type: 'success',
            content: 'The Supplier has been added successfully.',
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
      axios
        .put(`http://localhost:3013/supplier/update/${modalData.data._id}`, value)
        .then(res => {
          setDataSaving(false);
          setModalOpen(false);
          getData();
          messageApi.open({
            type: 'success',
            content: 'The Supplier has been updated successfully.',
          });
        })
        .catch((err) => {
          setDataSaving(false);
          messageApi.open({
            type: 'error',
            content: err.message,
          });
        });
    }
  }

  return <>
    {contextHolder}
    <Layout className="SupplierList">
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
              <Button type="primary" shape="round" icon={<PlusOutlined />} size="middle" onClick={handleAddNewSupplierClick}>
                Add New Supplier
              </Button>
              <Button type="primary" shape="round" icon={<PrinterFilled />} size="middle" onClick={handlePrintClick}>
                Print
              </Button>
            </Space>
          </Col>
        </Row></Layout.Header>
      <Layout.Content >
        <div id="SupplierListPrint" className='SupplierList' ref={ref}>
          <Table columns={columns} dataSource={searchData} loading={dataLoading} scroll={{ y: tableHeight }} style={{ padding: "0px 50px" }} />
        </div>
      </Layout.Content>
    </Layout>
    <Modal
      title={modalData.title}
      centered
      width={700}
      open={modalOpen}
      okText={modalData.addMode ? "Save" : "Update"}
      okButtonProps={{ loading: dataSaving, form: "AddEditSupplierForm", key: "submit", htmlType: "submit" }}
      // onOk={handleModalOkClick}
      cancelButtonProps={{ disabled: dataSaving }}
      onCancel={() => { setModalOpen(false); setModalData({ title: '', addMode: false, data: null }); }}
    >
      <AddEditSupplier data={modalData.data} addMode={modalData.addMode} onDataChange={handleDataChange} />
    </Modal>
  </>

}

