import LicenseForm from './components/LicenseForm';
import moment from 'moment';
import Main from './pages/Main';

moment.locale('ru');

function App() {
    return (
        <div className="app">
            <Main />
        </div>
    );
}

export default App;
