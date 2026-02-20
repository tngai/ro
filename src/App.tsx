
import Shifts from './pages/Shifts'
import { BrowserRouter, Routes, Route, Link } from 'react-router'
import './App.css'
import { useState } from 'react';
import Users from './pages/Users';
import Modal from 'react-modal';
import AddShift from './component/AddShift';

type UserType = {
  id: string;
  name: string;
  role: string;
}

type ShiftType = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  role: string;
  assignedUserId?: string;
}


export const usersData: UserType[] = [
  { id: "u1", name: "Alice Johnson", role: "Cashier" },
  { id: "u2", name: "Bob Smith", role: "Cook" },
  { id: "u3", name: "Charlie Brown", role: "Manager" },
  { id: "u4", name: "Charlie Brown1", role: "Cook" },
  { id: "u5", name: "Charlie Brown2", role: "Cashier" },
  { id: "u6", name: "Charlie Brown3", role: "Manager" },
  { id: "u7", name: "Charlie Brown4", role: "Manager" },
  { id: "u8", name: "Charlie Brown5", role: "Manager" },
  { id: "u9", name: "Charlie Brown6", role: "Manager" },
  { id: "u10", name: "Charlie Brown7", role: "Manager" },
];

export const shiftsData: ShiftType[] = [
  {
    id: "s1",
    date: "2026-02-20",
    startTime: "09:00",
    endTime: "17:00",
    role: "Cashier",
  },
  {
    id: "s2",
    date: "2026-02-20",
    startTime: "10:00",
    endTime: "18:00",
    role: "Cook",
    assignedUserId: "u2",
  },
];

Modal.setAppElement('#root');

function App() {
  const [users, setUsers] = useState(usersData)
  const [shifts, setShifts] = useState(shiftsData)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addShift = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/">Shifts</Link>
          <Link to="/users">Users</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Shifts shifts={shifts} />} />
          <Route path="/users" element={<Users users={users} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
