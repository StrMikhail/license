import React, { useEffect, useState } from 'react';
import TablePanel from '../components/TablePanel';
import HeaderLogo from '../components/HeaderLogo';
import { Button, Col, Layout, Row, Space } from 'antd';
import ModalComp from '../components/ModalComp';
import { Content, Header } from 'antd/es/layout/layout';
import { downloadFile } from '../utils/downloadFile';

const Admin = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState();

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const addKeyToArray = (array) => {
        let num = 1;
        array.map((item) => {
            item['key'] = num;
            num++;
        });
        return array;
    };

    const toogleModal = () => {
        setOpenModal(!openModal);
        handleClear();
    };

    const handleClear = () => {
        setStatus();
    };

    const addNewUser = (data) => {
        addUsetToWhiteList(data);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_API + '/adm', {
                method: 'GET',
                body: JSON.stringify(),
                headers: {
                    'Content-Type': 'application/json; application/csv',
                },
            });
            if (response.status > 299) throw new Error(response.status);
            setStatus(response.status);
            setData(addKeyToArray(await response.json()));
            setLoading(false);
        } catch (error) {
            setStatus(typeof +error.message === 'number' ? error.message : 404);
            setLoading(false);
        }
    };

    const addUsetToWhiteList = async (user) => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_API + '/adm', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json; application/csv',
                },
            });
            if (response.status > 299) throw new Error(response.status);
            setStatus(201);
        } catch (error) {
            setStatus(typeof +error.message === 'number' ? error.message : 404);
        }
    };

    const getFileCSV = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_API + '/adm', {
                method: 'POST',
                body: JSON.stringify({ list: 'csv' }),
                headers: {
                    'Content-Type': 'application/json; application/csv',
                },
            });
            if (response.status > 299) throw new Error(response.status);
            const blob = await response.blob();
            downloadFile(blob, `licenses.csv`);
        } catch (error) {
            setStatus(typeof +error.message === 'number' ? error.message : 404);
        }
    };

    return (
        <Layout style={{ backgroundColor: 'transparent', height: '100vh' }}>
            <Header
                style={{
                    height: 'var(--header_height)',
                    backgroundColor: 'transparent',
                    padding: '10px 20px',
                }}>
                <Row justify="space-between" align="middle">
                    <HeaderLogo />
                    <Space wrap={true}>
                        <Button type="primary" onClick={toogleModal}>
                            Добавить нового пользователя
                        </Button>
                        <Button type="primary" onClick={getFileCSV}>
                            Загрузить список в CSV
                        </Button>
                        <Button type="default" onClick={fetchData}>
                            Обновить таблицу
                        </Button>
                    </Space>
                </Row>

                <ModalComp
                    onSubmit={addNewUser}
                    open={openModal}
                    handleClose={toogleModal}
                    status={status}
                    onClear={handleClear}
                />
            </Header>
            <Content
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                <Row justify="center" style={{ width: '95%', height: '100%' }}>
                    <TablePanel data={data} loading={loading} />
                </Row>
            </Content>
        </Layout>
    );
};

export default Admin;
