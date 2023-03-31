import React from 'react';
import ReactDOM from 'react-dom/client';

import 'dayjs/locale/ru';

import './styles/import.css';

import App from './App';
import Provider from './hoc/Provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider>
        <App />
    </Provider>,
);
