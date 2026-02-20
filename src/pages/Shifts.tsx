import Modal from 'react-modal';
import AddShift from '../component/AddShift';

type ShiftType = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  role: string;
  assignedUserId?: string;
}

interface ShiftProps {
  shifts: ShiftType[];
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


const roles = ['Cashier', 'Cook', 'Manager'];

export default function Shifts({ shifts }: ShiftProps) {
  // const [addShiftOn, setAddShiftOn] = useState(false);
  return (
    <div>
      <Modal
        isOpen={true}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <AddShift />
      </Modal>
      <h1>Shifts</h1>
      <ul>
        {shifts.map((shift) => (
          <li
            key={shift.id}
          >
            {shift.date} - {shift.startTime} - {shift.endTime} - {shift.role} {shift.assignedUserId ? ` - ${shift.assignedUserId}` : ''}
            <button>Edit</button>
          </li>
        ))}
      </ul>
      <button onClick={() => { setAddShiftOn(true) }}>Add Shift</button>



      {/* <div>
        <label>Filter</div>
      <select>
        <option value="">All</option>
        <option value="Cashier">Cashier</option>
        <option value="Cook">Cook</option>
        <option value="Manager">Manager</option>
      </select>
    </div> */}
    </div >
  )
}