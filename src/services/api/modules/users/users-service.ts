import { BaseApiService } from "../../core/base-service-api";
import { PaginationParams } from "../../core/types";
import { IVolunteer, CreateVolunteerDto, UpdateVolunteerDto } from "./types";

class VolunteerService extends BaseApiService {
    /**
     * Get all volunteers with optional pagination
     */
    async getVolunteers(params?: PaginationParams): Promise<IVolunteer[]> {
        return this.fetchWithAuth<IVolunteer[]>("/volunteers", {
            params,
        });
    }

    /**
     * Get a single volunteer by ID
     */
    async getVolunteerById(id: string): Promise<IVolunteer> {
        return this.fetchWithAuth<IVolunteer>(`/volunteers/${id}`);
    }

    /**
     * Create a new volunteer
     */
    async createVolunteer(volunteerData: CreateVolunteerDto): Promise<IVolunteer> {
        return this.fetchWithAuth<IVolunteer>("/volunteers", {
            method: "POST",
            body: JSON.stringify(volunteerData),
        });
    }

    /**
     * Update an existing volunteer
     */
    async updateVolunteer(id: string, volunteerData: UpdateVolunteerDto): Promise<IVolunteer> {
        return this.fetchWithAuth<IVolunteer>(`/volunteers/${id}`, {
            method: "PUT",
            body: JSON.stringify(volunteerData),
        });
    }

    /**
     * Delete a volunteer
     */
    async deleteVolunteer(id: string): Promise<void> {
        await this.fetchWithAuth<void>(`/volunteers/${id}`, {
            method: "DELETE",
        });
    }
}

// Export a singleton instance
export const volunteerService = new VolunteerService();
