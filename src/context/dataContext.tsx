import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { UserType } from '../types';
import type { ShiftType } from '../types';
import type { DataContextType } from '../types/dataContext';

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [shifts, setShifts] = useState<ShiftType[]>([]);
  const [shiftSearchQuery, setShiftSearchQuery] = useState('');
  const [shiftFilterType, setShiftFilterType] = useState<'assignedUserName' | 'role'>('assignedUserName');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch('/models/users.json');
        const usersData = await usersResponse.json();
        setUsers(usersData);

        const shiftsResponse = await fetch('/models/shifts.json');
        let shiftsData = await shiftsResponse.json();
        shiftsData = shiftsData.map((shift: ShiftType) => addUserNameToShift(shift, usersData));

        setShifts(shiftsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function addUserNameToShift(shift: ShiftType, usersList: UserType[]) {
    const username = usersList.find(user => user.id === shift.assignedUserId)?.name;
    return username ? { ...shift, assignedUserName: username } : shift;
  };

  function addShift(shift: Omit<ShiftType, 'id'>) {
    const newShift = {
      ...shift,
      id: uuidv4()
    };
    setShifts(prev => [...prev, newShift]);
  };

  function isUserIdValid(userId: string,) {
    return users.some(user => user.id === userId);
  };

  function isUserQualifiedForRole(userId: string, role: string) {
    const user = users.find(user => user.id === userId);
    if (!user) {
      return false;
    }

    return user.role === role;
  };

  function removeAssignmentById(shiftId: string) {
    setShifts(prev => prev.map(shift => {
      if (shift.id === shiftId) {
        const { assignedUserId, assignedUserName, ...rest } = shift;
        return rest;
      }
      return shift;
    }));
  };

  function assignShiftByIdName(shiftId: string, userId: string, userName: string) {
    setShifts(prev => prev.map(shift => {
      if (shift.id === shiftId) {
        return { ...shift, assignedUserId: userId, assignedUserName: userName };
      }
      return shift;
    }));
  };

  function getShiftById(shiftId: string): ShiftType | null {
    const shift = shifts.find(s => s.id === shiftId);
    return shift ? { ...shift } : null;
  };

  function getUserById(userId: string): UserType | null {
    const user = users.find(u => u.id === userId);
    return user ? { ...user } : null;
  };

  function filterShiftsByName(query: string): ShiftType[] {
    return shifts.filter(shift => {
      const shiftName = shift.assignedUserName?.toLowerCase() || '';
      return shiftName.startsWith(query.toLowerCase());
    });
  };

  function filterShiftsByRole(query: string): ShiftType[] {
    return shifts.filter(shift => {
      const shiftRole = shift.role?.toLowerCase() || '';
      return shiftRole.startsWith(query.toLowerCase());
    });
  };

  return (
    <DataContext.Provider
      value={{
        users,
        shifts,
        addShift,
        isUserIdValid,
        isUserQualifiedForRole,
        removeAssignmentById,
        assignShiftByIdName,
        getShiftById,
        getUserById,
        filterShiftsByName,
        filterShiftsByRole,
        shiftSearchQuery,
        setShiftSearchQuery,
        shiftFilterType,
        setShiftFilterType
      }}>
      {children}
    </DataContext.Provider>
  );
};
