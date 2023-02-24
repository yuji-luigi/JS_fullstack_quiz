import './App.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import HeaderNavbar from './HeaderNavbar';
import HomeHero from './HomeHero';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AccountsAndCardsPage from './AccountsAndCardsPage';
import { LocalizationProvider } from '@mui/x-date-pickers';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <HeaderNavbar />
        <Routes>
          <Route path="/" element={<HomeHero />} />
          <Route path="accounts-cards" element={<AccountsAndCardsPage />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
