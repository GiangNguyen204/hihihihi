import { BaseService } from './base.service';
import {
  MemberRole,
  Role,
  AssignRoleRequest,
  EndRoleRequest,
  MemberRoleListParams,
} from '../../types/member-role';

/**
 * Member Role Service
 */
class RoleService extends BaseService<MemberRole, AssignRoleRequest, Partial<AssignRoleRequest>> {
  constructor() {
    super('member-role');
  }

  /**
   * End role assignment
   */
  async endRole(id: number, data: EndRoleRequest): Promise<MemberRole> {
    const response = await this.http.put<MemberRole>(
      `/member-role/${id}/end`,
      data as Record<string, unknown>,
    );
    return response.data;
  }

  /**
   * Get active roles
   */
  async getActiveRoles(params?: MemberRoleListParams): Promise<MemberRole[]> {
    const response = await this.http.get<MemberRole[]>(
      '/member-role/active',
      params as Record<string, string | number | boolean | null | undefined>,
    );
    return response.data;
  }

  /**
   * Get role history for a member
   */
  async getMemberRoleHistory(memberId: number): Promise<MemberRole[]> {
    const response = await this.http.get<MemberRole[]>(`/member-role/member/${memberId}/history`);
    return response.data;
  }

  /**
   * Get all available roles
   */
  async getAllRoles(): Promise<Role[]> {
    const response = await this.http.get<Role[]>('/role/get-all');
    return response.data;
  }
}

export default new RoleService();
