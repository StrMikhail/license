import { Modal } from 'antd';
import React from 'react';
import AddUserForm from './forms/AddUsetForm';
import ResultCard from './ResultCard';

const ModalComp = ({ open, status, handleClose, onSubmit }) => {
    const handleSubmitForm = (values) => {
        onSubmit(values);
    };
    return (
        <Modal open={open} footer={null} centered={true} onCancel={handleClose}>
            {!status ? (
                <AddUserForm onSubmit={handleSubmitForm} />
            ) : (
                <ResultCard name={status} onClick={handleClose} />
            )}
        </Modal>
    );
};

export default ModalComp;
