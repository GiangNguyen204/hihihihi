import { BaseService } from './base.service';
import {
  MemberTransfer,
  CreateTransferRequest,
  ApproveTransferRequest,
  RejectTransferRequest,
  TransferStatistics,
} from '../../types/member-transfer';

/**
 * Member Transfer Service
 */
class TransferService extends BaseService<
  MemberTransfer,
  CreateTransferRequest,
  Partial<CreateTransferRequest>
> {
  constructor() {
    super('member-transfer');
  }

  /**
   * Approve transfer request
   */
  async approve(id: number, data: ApproveTransferRequest): Promise<MemberTransfer> {
    const response = await this.http.put<MemberTransfer>(
      `/member-transfer/${id}/approve`,
      data as unknown as Record<string, unknown>,
    );
    return response.data;
  }

  /**
   * Reject transfer request
   */
  async reject(id: number, data: RejectTransferRequest): Promise<MemberTransfer> {
    const response = await this.http.put<MemberTransfer>(
      `/member-transfer/${id}/reject`,
      data as unknown as Record<string, unknown>,
    );
    return response.data;
  }

  /**
   * Get transfer statistics
   */
  async getTransferStatistics(): Promise<TransferStatistics> {
    const response = await this.http.get<TransferStatistics>('/member-transfer/statistics');
    return response.data;
  }
}

export default new TransferService();
