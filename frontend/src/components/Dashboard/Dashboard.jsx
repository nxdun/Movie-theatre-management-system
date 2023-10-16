import React from 'react';
import { Image, Flex } from 'antd';
import './Dashboard.css';
import { ReorderList } from '../ConcessionManagement/components/ReorderList/ReorderList';


export default function Dashboard() {
  return <div className="Dashboard">
    <div className="DashboardBackground">

      <div className="Logo">
        <Image src="https://raw.githubusercontent.com/nxdun/BlaBla/main/2.png" preview={false} height="200px" width="200px" />
      </div>

    </div>
    <div className="Dashboard">
      <Flex wrap="wrap" gap="large" style={{padding:20}}>
        <ReorderList />
      </Flex>
    </div>
  </div>;
}
