import { BaseService } from './base.service';
import {
  YouthUnionMember,
  CreateMemberRequest,
  UpdateMemberRequest,
  UpdateMemberStatusRequest,
  MemberListParams,
  MemberStatistics,
} from '../../types/youth-union-member';

/**
 * Youth Union Member Service
 */
class MemberService extends BaseService<
  YouthUnionMember,
  CreateMemberRequest,
  UpdateMemberRequest
> {
  constructor() {
    super('youth-union-member');
  }

  /**
   * Get members by branch
   */
  async getByBranch(branchId: number, params?: MemberListParams): Promise<YouthUnionMember[]> {
    const response = await this.http.get<YouthUnionMember[]>(
      `/youth-union-member/branch/${branchId}`,
      params as Record<string, string | number | boolean | null | undefined>,
    );
    return response.data;
  }

  /**
   * Get members by cohort
   */
  async getByCohort(cohortId: number, params?: MemberListParams): Promise<YouthUnionMember[]> {
    const response = await this.http.get<YouthUnionMember[]>(
      `/youth-union-member/cohort/${cohortId}`,
      params as Record<string, string | number | boolean | null | undefined>,
    );
    return response.data;
  }

  /**
   * Update member status
   */
  async updateStatus(id: number, status: UpdateMemberStatusRequest): Promise<YouthUnionMember> {
    const response = await this.http.put<YouthUnionMember>(
      `/youth-union-member/${id}/status`,
      status as unknown as Record<string, unknown>,
    );
    return response.data;
  }

  /**
   * Get member statistics
   */
  async getMemberStatistics(): Promise<MemberStatistics> {
    const response = await this.http.get<MemberStatistics>('/youth-union-member/statistics');
    return response.data;
  }
}

export default new MemberService();
