// src/pages/user-account/mockData.ts
import { UserAccount } from './types';

export const MOCK_USERS: UserAccount[] = [
  {
    id: 1,
    fullName: 'Nguyễn Văn A',
    email: 'a.nguyen@dnu.edu.vn',
    studentCode: 'DNU2020001',
    role: 'admin',
    branch: '-',
    status: 'active',
  },
  {
    id: 2,
    fullName: 'Trần Thị B',
    email: 'b.tran@dnu.edu.vn',
    studentCode: 'DNU2020123',
    role: 'secretary',
    branch: 'CTK14A',
    status: 'active',
  },
  {
    id: 3,
    fullName: 'Lê Văn C',
    email: 'c.le@dnu.edu.vn',
    studentCode: 'DNU2020456',
    role: 'member',
    branch: 'CTK15B',
    status: 'locked',
  },
];
