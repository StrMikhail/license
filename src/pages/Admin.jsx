import React, { useEffect, useState } from 'react';
import TablePanel from '../components/TablePanel';
import HeaderLogo from '../components/HeaderLogo';
import { Button, Col, Layout, Row, Space } from 'antd';
import ModalComp from '../components/ModalComp';
import { Content, Footer, Header } from 'antd/es/layout/layout';

const Admin = () => {
    const [error, setError] = useState();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [addStatus, setAddStatus] = useState();

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetchData();
        setLoading(false);
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
        setError();
        setAddStatus();
    };
    const addNewUser = (data) => {
        addUsetToWhiteList(data);
    };

    const fetchData = async () => {
        await fetch(process.env.REACT_APP_BACKEND_API + 'adm', {
            method: 'GET',
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json; application/csv',
            },
        })
            .then((response) => response.json())
            .then((json) => setData(addKeyToArray(json)))
            .catch((error) => setError(error.message));
    };

    const addUsetToWhiteList = async (user) => {
        try {
            await fetch(process.env.REACT_APP_BACKEND_API + 'adm', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json; application/csv',
                },
            });
            setAddStatus(true);
        } catch (error) {
            setError(error);
        }
    };

    const getFileCSV = async () => {
        await fetch(process.env.REACT_APP_BACKEND_API + 'adm', {
            method: 'POST',
            body: JSON.stringify({ list: 'csv' }),
            headers: {
                'Content-Type': 'application/json; application/csv',
            },
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `licenses.csv`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch((error) => setError(error));
    };

    return (
        <Layout style={{ backgroundColor: 'transparent', height: '100%' }}>
            <Header style={{ height: 'auto', backgroundColor: 'transparent' }}>
                <Row align="middle" justify="start">
                    <Col flex={1} push={0}>
                        <Row align="bottom" justify="start" style={{ marginTop: '20px' }}>
                            <HeaderLogo />
                        </Row>
                    </Col>
                    <Col>
                        <Row align="middle" justify="end">
                            <Space wrap={true} align="center" size={'small'}>
                                <Button type="primary" onClick={toogleModal} size="large" block>
                                    Добавить нового пользователя
                                </Button>
                                <Button type="primary" onClick={getFileCSV} size="large" block>
                                    Загрузить CSV
                                </Button>
                            </Space>
                        </Row>
                    </Col>
                </Row>

                <ModalComp
                    onSubmit={addNewUser}
                    open={openModal}
                    handleClose={toogleModal}
                    status={addStatus}
                    onClear={handleClear}
                    error={error}
                />
            </Header>
            <Content
                align="middle"
                style={{
                    minHeight: '100%',
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
