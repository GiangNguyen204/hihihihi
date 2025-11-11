import HttpService from './http.service';
import {
  Account,
  UpdateAccountProfileRequest,
  ChangePasswordRequest,
  UpdateAccountRoleRequest,
} from '../../types/account';

/**
 * Account Service
 */
class AccountService {
  private http = new HttpService();

  /**
   * Get all accounts
   */
  async getAll(): Promise<Account[]> {
    const response = await this.http.get<Account[]>('/account/get-all');
    return response.data;
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<Account> {
    const response = await this.http.get<Account>('/account/profile');
    return response.data;
  }

  /**
   * Update current user profile
   */
  async updateProfile(data: UpdateAccountProfileRequest): Promise<Account> {
    const response = await this.http.put<Account>(
      '/account/profile',
      data as Record<string, unknown>,
    );
    return response.data;
  }

  /**
   * Change password
   */
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await this.http.put<void>(
      '/account/change-password',
      data as unknown as Record<string, unknown>,
    );
  }

  /**
   * Update account role
   */
  async updateRole(accountId: number, data: UpdateAccountRoleRequest): Promise<Account> {
    const response = await this.http.put<Account>(
      `/account/${accountId}/role`,
      data as unknown as Record<string, unknown>,
    );
    return response.data;
  }
}

export default new AccountService();
