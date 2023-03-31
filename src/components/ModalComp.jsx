import { Modal } from 'antd';
import React from 'react';
import AddUserForm from './AddUsetForm';
import Error from './Error';
import Success from './Success';

const ModalComp = ({ open, status, onClear, error, handleClose, onSubmit }) => {
    const handleSubmitForm = (values) => {
        onSubmit(values);
    };

    return (
        <Modal open={open} footer={null} centered={true} onCancel={handleClose}>
            {error && <Error onClick={onClear} />}
            {status && (
                <Success
                    title={'Пользователь добавлен в список'}
                    buttonText={'Выйти'}
                    onClick={handleClose}
                />
            )}
            {!error && !status && <AddUserForm onSubmit={handleSubmitForm} />}
        </Modal>
    );
};

export default ModalComp;
