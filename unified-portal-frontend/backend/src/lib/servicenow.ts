import axios from 'axios';

/**
 * ServiceNow API Integration Service
 * Handles ticket synchronization between Unified Portal and ServiceNow
 */
class ServiceNowService {
  private baseUrl: string;
  private username: string;
  private password: string;
  private enabled: boolean;

  constructor() {
    this.baseUrl = process.env.SERVICENOW_URL || '';
    this.username = process.env.SERVICENOW_USERNAME || '';
    this.password = process.env.SERVICENOW_PASSWORD || '';
    this.enabled = !!(this.baseUrl && this.username && this.password);
  }

  /**
   * Check if ServiceNow integration is configured
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Get authentication headers for ServiceNow API
   */
  private getAuthHeaders() {
    const credentials = Buffer.from(`${this.username}:${this.password}`).toString('base64');
    return {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  /**
   * Map internal ticket status to ServiceNow state values
   */
  private mapStatusToServiceNow(status: string): number {
    const statusMap: Record<string, number> = {
      'OPEN': 1,        // New
      'IN_PROGRESS': 2, // In Progress
      'RESOLVED': 6,    // Resolved
      'CLOSED': 7,      // Closed
      'ESCALATED': 2    // In Progress
    };
    return statusMap[status] || 1;
  }

  /**
   * Map internal priority to ServiceNow priority values
   */
  private mapPriorityToServiceNow(priority: string): number {
    const priorityMap: Record<string, number> = {
      'LOW': 4,
      'MEDIUM': 3,
      'HIGH': 2,
      'CRITICAL': 1
    };
    return priorityMap[priority] || 3;
  }

  /**
   * Create a new incident in ServiceNow
   */
  async createIncident(ticket: any): Promise<string | null> {
    if (!this.enabled) {
      console.log('ServiceNow integration disabled - skipping ticket creation');
      return null;
    }

    try {
      const payload = {
        short_description: ticket.title,
        description: ticket.description,
        priority: this.mapPriorityToServiceNow(ticket.priority),
        state: this.mapStatusToServiceNow(ticket.status),
        caller_id: ticket.createdBy?.email || this.username,
        assignment_group: process.env.SERVICENOW_ASSIGNMENT_GROUP || '',
        u_source_system: 'Unified Agent Portal',
        u_external_ticket_id: ticket.id
      };

      const response = await axios.post(
        `${this.baseUrl}/api/now/table/incident`,
        payload,
        { headers: this.getAuthHeaders() }
      );

      const sysId = response.data.result.sys_id;
      console.log(`Created ServiceNow incident: ${sysId} for local ticket: ${ticket.id}`);
      return sysId;

    } catch (error: any) {
      console.error('Failed to create ServiceNow incident:', error.response?.data || error.message);
      return null;
    }
  }

  /**
   * Update existing incident in ServiceNow
   */
  async updateIncident(serviceNowId: string, updates: any): Promise<boolean> {
    if (!this.enabled || !serviceNowId) {
      return false;
    }

    try {
      const payload: any = {};

      if (updates.status) {
        payload.state = this.mapStatusToServiceNow(updates.status);
      }
      if (updates.title) {
        payload.short_description = updates.title;
      }
      if (updates.description) {
        payload.description = updates.description;
      }
      if (updates.priority) {
        payload.priority = this.mapPriorityToServiceNow(updates.priority);
      }
      if (updates.assignedTo?.email) {
        payload.assigned_to = updates.assignedTo.email;
      }

      if (Object.keys(payload).length === 0) {
        return true; // Nothing to update
      }

      await axios.patch(
        `${this.baseUrl}/api/now/table/incident/${serviceNowId}`,
        payload,
        { headers: this.getAuthHeaders() }
      );

      console.log(`Updated ServiceNow incident: ${serviceNowId}`);
      return true;

    } catch (error: any) {
      console.error('Failed to update ServiceNow incident:', error.response?.data || error.message);
      return false;
    }
  }

  /**
   * Get incident details from ServiceNow
   */
  async getIncident(serviceNowId: string): Promise<any | null> {
    if (!this.enabled) return null;

    try {
      const response = await axios.get(
        `${this.baseUrl}/api/now/table/incident/${serviceNowId}`,
        { headers: this.getAuthHeaders() }
      );
      return response.data.result;
    } catch (error) {
      console.error('Failed to fetch ServiceNow incident:', error);
      return null;
    }
  }
}

export const serviceNow = new ServiceNowService();