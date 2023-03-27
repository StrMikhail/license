import React from 'react';
import ReactDOM from 'react-dom/client';
import ru_RU from 'antd/lib/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import './style.css';
import App from './App';
import { ConfigProvider } from 'antd';

dayjs.locale('ru');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider
        locale={ru_RU}
        theme={{
            token: {
                colorPrimary: '#037394',
            },
        }}>
        <App />
    </ConfigProvider>,
);
