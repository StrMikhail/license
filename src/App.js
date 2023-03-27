import LicenseForm from './components/LicenseForm';
import moment from 'moment';
import { ConfigProvider } from 'antd';
import ru_RU from 'antd/lib/locale/ru_RU';

moment.locale('ru');

function App() {
    return (
        <div className="app">
            <LicenseForm />
        </div>
    );
}

export default App;
