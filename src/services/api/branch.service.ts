import { BaseService } from './base.service';
import {
  YouthUnionBranch,
  CreateBranchRequest,
  UpdateBranchRequest,
  BranchStatistics,
} from '../../types/youth-union-branch';

/**
 * Youth Union Branch Service
 */
class BranchService extends BaseService<
  YouthUnionBranch,
  CreateBranchRequest,
  UpdateBranchRequest
> {
  constructor() {
    super('youth-union-branch');
  }

  /**
   * Get branch statistics
   */
  async getBranchStatistics(): Promise<BranchStatistics> {
    const response = await this.http.get<BranchStatistics>('/youth-union-branch/statistics');
    return response.data;
  }
}

export default new BranchService();
