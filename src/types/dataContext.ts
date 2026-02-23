import type { ShiftType } from "./shifts";
import type { UserType } from "./users";

export type DataContextType = {
  users: UserType[];
  shifts: ShiftType[];
  addShift: (shift: Omit<ShiftType, 'id'>) => void;
  isUserIdValid: (userId: string) => boolean;
  isUserQualifiedForRole: (userId: string, role: string) => boolean;
  getUserById: (userId: string) => UserType | null;
  removeAssignmentById: (shiftId: string) => void;
  assignShiftByIdName: (shiftId: string, userId: string, userName: string) => void;
  getShiftById: (shiftId: string) => ShiftType | null;
  filterShiftsByName: (name: string) => ShiftType[];
  filterShiftsByRole: (role: string) => ShiftType[];
  shiftSearchQuery: string;
  setShiftSearchQuery: (query: string) => void;
  shiftFilterType: 'assignedUserName' | 'role';
  setShiftFilterType: (type: 'assignedUserName' | 'role') => void;
}