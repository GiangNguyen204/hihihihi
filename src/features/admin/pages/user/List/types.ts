// src/pages/user-account/types.ts
export type UserStatus = 'active' | 'locked';

export interface UserAccount {
  id: number;
  fullName: string;
  email: string;
  studentCode?: string; // MSSV (nếu là sinh viên)
  role: 'admin' | 'secretary' | 'member';
  branch: string; // Chi đoàn
  status: UserStatus;
}
