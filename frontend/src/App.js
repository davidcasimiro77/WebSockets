import {
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main/:username" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
