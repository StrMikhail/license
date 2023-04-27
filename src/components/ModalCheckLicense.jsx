import { Modal, Row } from 'antd';
import React from 'react';
import FileLoader from './FileLoader';

const ModalCheckLicense = ({ open, handleClose }) => {
    return (
        <Modal open={open} footer={null} centered={true} onCancel={handleClose}>
            <Row style={{ padding: 20 }}>
                <FileLoader />
            </Row>
        </Modal>
    );
};

export default ModalCheckLicense;
