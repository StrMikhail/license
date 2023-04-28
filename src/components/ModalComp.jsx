import { Modal, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import AddUserForm from './addUser/AddUsetForm';
import axios from 'axios';
import RemoveUser from './removeUser/removeUser';
import ResultCard from './ResultCard';

const ModalComp = ({ open, handleClose }) => {
    const [users, setUsers] = useState();
    const [status, setStatus] = useState();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}/users`);
            setUsers(data);
        } catch (error) {
            setStatus(error.response.status);
        }
    };

    const addUser = async (user) => {
        try {
            const data = await axios.post(`${process.env.REACT_APP_BACKEND_API}/adm`, user);
            if (data.status > 299) throw new Error(data.status);
            setStatus(data.status);
            getUsers();
        } catch (error) {
            setStatus(error.response.status);
        }
    };

    const removeUsers = async (usersList) => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_API}/users`, usersList);
            getUsers();
        } catch (error) {
            setStatus(error.response.status);
        }
    };

    const items = [
        {
            key: '1',
            label: `Добавление пользователя`,
            children: <AddUserForm onSubmit={addUser} />,
        },
        {
            key: '2',
            label: `Удаление пользователя`,
            children: <RemoveUser userList={users} onDelete={removeUsers} />,
        },
    ];

    return (
        <Modal open={open} footer={null} centered={true} onCancel={handleClose}>
            {status ? (
                <ResultCard name={status} onClick={() => setStatus()} />
            ) : (
                <Tabs defaultActiveKey="1" items={items} />
            )}
        </Modal>
    );
};

export default ModalComp;
