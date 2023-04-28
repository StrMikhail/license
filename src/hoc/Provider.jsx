import React, { useContext, useState } from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import ru_RU from 'antd/lib/locale/ru_RU';

export const AdminProvider = React.createContext();

const Provider = ({ children }) => {
    const [admin, setAdmin] = useState(true);

    return (
        <AdminProvider.Provider value={{ admin, setAdmin }}>
            <BrowserRouter>
                <ConfigProvider
                    locale={ru_RU}
                    theme={{
                        token: {
                            colorPrimary: '#037394',
                        },
                    }}>
                    {children}
                </ConfigProvider>
            </BrowserRouter>
        </AdminProvider.Provider>
    );
};

export default Provider;
