import { UploadOutlined } from '@ant-design/icons';
import { Button, Descriptions, Space, Typography, Upload } from 'antd';
import axios from 'axios';
import { useState } from 'react';
const FileLoader = () => {
    const [info, setInfo] = useState();

    const handleRequest = async (options) => {
        const { onSuccess, onError, file } = options;
        const fmData = new FormData();
        fmData.append('file', file);
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_API}/check`,
                fmData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            onSuccess('Ok');
            setInfo(data);
        } catch (error) {
            onError({ error });
        }
    };

    return (
        <Space
            direction="vertical"
            style={{
                width: '100%',
            }}
            size="large">
            {info ? (
                <>
                    <Typography.Title level={3}>Результаты проверки</Typography.Title>
                    <Descriptions bordered size="small">
                        <Descriptions.Item span={3} label="Название организации">
                            {info.org_name}
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label="Дата окончания лицензии">
                            {info.l_date}
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label="Список hdiw">
                            {info.hwid.map((hwid) => (
                                <p>{hwid}</p>
                            ))}
                        </Descriptions.Item>
                    </Descriptions>
                    <Button block type="primary" size="large" onClick={() => setInfo()}>
                        Проверить еще
                    </Button>
                </>
            ) : (
                <>
                    <Typography.Title level={3}>Проверка лицензии</Typography.Title>
                    <Upload
                        listType="picture"
                        name="license"
                        defaultFileList={[]}
                        customRequest={handleRequest}
                        maxCount={1}>
                        <Button block icon={<UploadOutlined />}>
                            Выбрать файл
                        </Button>
                    </Upload>
                </>
            )}
        </Space>
    );
};
export default FileLoader;
