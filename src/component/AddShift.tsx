import { useState } from "react";
import { type SyntheticEvent } from "react";

export default function AddShift() {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [role, setRole] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    console.log(date, startTime, endTime, role, assignedUserId);
  };

  return (
    <div>
      <h1>Add Shift</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" onChange={(e) => setDate(e.target.value)} />

        <label htmlFor="startTime">Start Time</label>
        <input type="time" id="startTime" name="startTime" onChange={(e) => setStartTime(e.target.value)} />

        <label htmlFor="endTime">End Time</label>
        <input type="time" id="endTime" name="endTime" onChange={(e) => setEndTime(e.target.value)} />

        <label htmlFor="role">Role</label>
        <input type="text" id="role" name="role" onChange={(e) => setRole(e.target.value)} />

        <label htmlFor="assignedUserId">Assigned User (Optional)</label>
        <input type="text" id="assignedUserId" name="assignedUserId" onChange={(e) => setAssignedUserId(e.target.value)} />

        <button type="submit">Add Shift</button>
      </form>

    </div>
  )
}