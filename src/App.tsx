
import Shifts from './pages/Shifts';
import Users from './pages/Users';
import { BrowserRouter, Routes, Route, Link } from 'react-router'
import { DataProvider } from './context';
import './App.css';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <nav>
          <Link to="/">Shifts</Link>
          <Link to="/users">Users</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Shifts rowsPerPage={12} minWidth={650} />} />
          <Route path="/users" element={<Users rowsPerPage={12} minWidth={650} />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
