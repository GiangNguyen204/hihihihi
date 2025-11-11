import HttpService from './http.service';
import { BasePaginatedResponse } from '@base/models/basePaginated';

/**
 * Base Service class for CRUD operations
 */
export class BaseService<T, CreateRequest, UpdateRequest> {
  protected http: HttpService;
  protected resource: string;

  constructor(resource: string) {
    this.http = new HttpService();
    this.resource = resource;
  }

  /**
   * Get all records
   */
  async getAll(): Promise<T[]> {
    const response = await this.http.get<T[]>(`/${this.resource}/get-all`);
    return response.data;
  }

  /**
   * Get paginated list
   */
  async getList(
    params?: Record<string, string | number | boolean | null | undefined>,
  ): Promise<BasePaginatedResponse<T>> {
    const response = await this.http.getPaginated<T>(`/${this.resource}/get-list`, params ?? null);
    return response;
  }

  /**
   * Get single record by ID
   */
  async getById(id: number): Promise<T> {
    const response = await this.http.get<T>(`/${this.resource}/${id}`);
    return response.data;
  }

  /**
   * Create new record
   */
  async create(data: CreateRequest): Promise<T> {
    const response = await this.http.post<T>(
      `/${this.resource}`,
      data as unknown as Record<string, unknown>,
    );
    return response.data;
  }

  /**
   * Update existing record
   */
  async update(id: number, data: UpdateRequest): Promise<T> {
    const response = await this.http.put<T>(
      `/${this.resource}/${id}`,
      data as Record<string, unknown>,
    );
    return response.data;
  }

  /**
   * Delete single record
   */
  async delete(id: number): Promise<void> {
    await this.http.delete(`/${this.resource}/${id}`);
  }

  /**
   * Delete multiple records
   */
  async deleteMany(ids: number[]): Promise<void> {
    await this.http.delete(`/${this.resource}`, {
      config: {
        data: { ids },
      },
    });
  }

  /**
   * Search records
   */
  async search(params: Record<string, string | number | boolean | null | undefined>): Promise<T[]> {
    const response = await this.http.get<T[]>(`/${this.resource}/search`, params);
    return response.data;
  }

  /**
   * Get statistics
   */
  async getStatistics(): Promise<Record<string, unknown>> {
    const response = await this.http.get<Record<string, unknown>>(`/${this.resource}/statistics`);
    return response.data;
  }
}

export default BaseService;
