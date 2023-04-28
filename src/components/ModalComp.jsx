import { Modal, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import AddUserForm from './addUser/AddUsetForm';
import axios from 'axios';
import RemoveUser from './removeUser/removeUser';
import ResultCard from './ResultCard';

const ModalComp = ({ open, handleClose, onSubmit }) => {
    const [users, setUsers] = useState();
    const [status, setStatus] = useState();

    useEffect(() => {
        getUsers();
    }, []);

    const addUser = async (user) => {
        try {
            const data = await axios.post(`${process.env.REACT_APP_BACKEND_API}/adm`, user);
            if (data.status > 299) throw new Error(data.status);
            setStatus(data.status);
            setUsers((prev) => prev.push(user));
        } catch (error) {
            setStatus(typeof error.message === 'number' ? error.message : 404);
        }
    };

    const getUsers = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}/users`);
            setUsers(data);
        } catch (error) {
            setStatus(typeof error.message === 'number' ? error.message : 404);
        }
    };

    const removeUsers = async (usersList) => {
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_API}/users`,
                usersList,
            );
            setUsers((prev) => prev.filter((user) => !usersList.includes(user)));
        } catch (error) {
            setStatus(typeof error.message === 'number' ? error.message : 404);
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
