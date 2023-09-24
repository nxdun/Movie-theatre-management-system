import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Divider, Row, Col, Form, Input, Select, Button, DatePicker, Modal } from 'antd';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import axios from 'axios';
import Sidebar from '../components/sidebar/sidebar';
import AppHeader from '../components/hedder/Header';
import './common.css';
import movieSheduler from './movieSheduler.module.css';
import { EditFilled } from '@ant-design/icons';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const { Option } = Select;
const { Item } = Form;
const { Header, Content } = Layout;

function MovieShedularCalPrevPage(props) {
    const screenWidth = window.innerHeight;
    const [AllMovieShedulers, setAllMovieShedulars] = useState([]);
    const [selectedEventDetails, setSelectedEventDetails] = useState(null);
    const [isEventModalVisible, setIsEventModalVisible] = useState(false);


    // Function to generate a different color based on the event index
    const getColor = (index) => {
        const colors = ['red', 'blue', 'green', 'purple', 'orange']; // Add more colors as needed
        return colors[index % colors.length];
    }



    const getallMovieShedularDetails = () => {
        axios.get('/admin/getallMovieShedularDetails')
            .then((res) => {
                setAllMovieShedulars(res.data.data);
            })
            .catch((error) => {
                console.error("Error", error);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Network Error',
                    showConfirmButton: false,
                    timer: 1500,
                    width: 10
                });
            });
    }

    useEffect(() => {
        getallMovieShedularDetails();
    }, []);

    // Create events based on AllMovieShedulers data with different colors
    const events = AllMovieShedulers.map((scheduler, index) => ({
        id: scheduler._id, // Add an ID for each event
        title: scheduler.MovieName,
        start: dayjs(scheduler.StartDate).format('YYYY-MM-DD'), // Format the date as 'YYYY-MM-DD'
        end: dayjs(scheduler.EndDate).format('YYYY-MM-DD'),     // Format the date as 'YYYY-MM-DD'
        color: getColor(index), // Get a color based on the event index
        showTime: scheduler.ShowTime,
        theaterName: scheduler.TheaterName,
    }));

    
    // Event click handler to show event details in a modal
    const handleEventClick = (eventInfo) => {
        const event = events.find((e) => e.id === eventInfo.event.id);
        if (event) {
            setSelectedEventDetails(event);
            setIsEventModalVisible(true);
        }
    };

    // Close the event modal
    const handleCloseEventModal = () => {
        setIsEventModalVisible(false);
    };

    return (
        <Layout>
            <Sidebar />
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <AppHeader />
                <div style={{ margin: '5px 16px', overflow: 'initial' }}>
                    
                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={24}>
                            <Content
                                className="common-cotent-container"
                                style={{
                                    background: 'white',
                                }}
                            >
                                <Divider orientation="left" orientationMargin="0">
                                    Schedules Calendar
                                </Divider>
                                <FullCalendar
                                    plugins={[dayGridPlugin]}
                                    initialView="dayGridMonth"
                                    events={events} // Use the events created with different colors
                                    eventClick={handleEventClick} // Event click handler
                                />
                                <Modal
                                    title={selectedEventDetails ? selectedEventDetails.title : ''}
                                    visible={isEventModalVisible}
                                    onCancel={handleCloseEventModal}
                                    footer={null}
                                >
                                    {selectedEventDetails && (
                                        <div>
                                            <p>Show Time: {selectedEventDetails.showTime}</p>
                                            <p>Theater: {selectedEventDetails.theaterName}</p>
                                        </div>
                                    )}
                                </Modal>
                            </Content>
                        </Col>
                    </Row>
                </div>
            </Layout>
        </Layout>
    );
}

export default MovieShedularCalPrevPage;
