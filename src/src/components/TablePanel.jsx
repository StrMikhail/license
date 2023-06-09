import React, { useState } from 'react';
import { Table } from 'antd';

const TablePanel = ({ data, loading }) => {
    const [sortedInfo, setSortedInfo] = useState({});

    const handleChange = (sorter) => {
        console.log(sorter);
        setSortedInfo(sorter);
    };

    const tableCols = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: '4%',
        },
        {
            title: 'Фамилия',
            dataIndex: 'fname',
            key: 'fname',
            width: '10%',

            sorter: (a, b) => a.fname - b.fname,
            sortOrder: sortedInfo.columnKey === 'fname' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Организация',
            dataIndex: 'orgname',
            key: 'orgname',

            sorter: (a, b) => a.orgname - b.orgname,
            sortOrder: sortedInfo.columnKey === 'orgname' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Дата генерации лицензии',
            dataIndex: 'sdate',
            key: 'sdate',
        },
        {
            title: 'Дата окончания лицензии',
            dataIndex: 'edate',
            key: 'edate',
        },
        {
            title: 'Список hwid',
            dataIndex: 'hwid',
            key: 'hwid',
        },
    ];

    return (
        <Table
            style={{ height: '300px' }}
            columns={tableCols}
            dataSource={data}
            loading={loading}
            pagination={false}
            scroll={{ y: '70vh' }}
            size="small"
            onChange={handleChange}
        />
    );
};

export default TablePanel;
