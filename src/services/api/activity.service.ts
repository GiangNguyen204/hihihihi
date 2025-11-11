import { BaseService } from './base.service';
import {
  Activity,
  CreateActivityRequest,
  UpdateActivityRequest,
  ActivityRegistrationRequest,
  ActivityParticipant,
  UpdateAttendanceRequest,
  ActivityStatistics,
  ActivityListParams,
} from '../../types/activity';

/**
 * Activity Service
 */
class ActivityService extends BaseService<Activity, CreateActivityRequest, UpdateActivityRequest> {
  constructor() {
    super('activity');
  }

  /**
   * Register for activity
   */
  async register(
    activityId: number,
    data: ActivityRegistrationRequest,
  ): Promise<ActivityParticipant> {
    const response = await this.http.post<ActivityParticipant>(
      `/activity/${activityId}/register`,
      data as unknown as Record<string, unknown>,
    );
    return response.data;
  }

  /**
   * Get activity participants
   */
  async getParticipants(
    activityId: number,
    params?: ActivityListParams,
  ): Promise<ActivityParticipant[]> {
    const response = await this.http.get<ActivityParticipant[]>(
      `/activity/${activityId}/participants`,
      params as Record<string, string | number | boolean | null | undefined>,
    );
    return response.data;
  }

  /**
   * Update attendance status
   */
  async updateAttendance(activityId: number, data: UpdateAttendanceRequest): Promise<void> {
    await this.http.put<void>(
      `/activity/${activityId}/attendance`,
      data as unknown as Record<string, unknown>,
    );
  }

  /**
   * Get activity statistics
   */
  async getActivityStatistics(): Promise<ActivityStatistics> {
    const response = await this.http.get<ActivityStatistics>('/activity/statistics');
    return response.data;
  }
}

export default new ActivityService();
