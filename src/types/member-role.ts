// Member Role Types

export interface Role {
  id: number;
  code: string;
  name: string;
  description?: string;
  level?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface MemberRole {
  id: number;
  memberId: number;
  roleId: number;
  branchId?: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  assignedBy?: number;
  endReason?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  member?: {
    id: number;
    code: string;
    fullName: string;
    email: string;
  };
  role?: Role;
  branch?: {
    id: number;
    code: string;
    name: string;
  };
}

export interface AssignRoleRequest {
  memberId: number;
  roleId: number;
  branchId?: number;
  startDate?: string;
  assignedBy?: number;
  notes?: string;
}

export interface EndRoleRequest {
  endDate?: string;
  endReason?: string;
}

export interface MemberRoleListParams {
  page?: number;
  limit?: number;
  memberId?: number;
  roleId?: number;
  branchId?: number;
  isActive?: boolean;
}

export interface RoleListParams {
  page?: number;
  limit?: number;
  search?: string;
}
