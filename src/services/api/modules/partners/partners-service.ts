import { BaseApiService } from "../../core/base-service-api";
import { PaginationParams } from "../../core/types";
import { CreatePartnerDto, IPartner, UpdatePartnetDto } from "./types";

class PartnerService extends BaseApiService {
    readonly basePath = "/partners";
    /**
     * Get all partners with optional pagination
     */
    async getPartners(params?: PaginationParams): Promise<IPartner[]> {
        return this.fetchWithAuth<IPartner[]>(this.basePath, {
            params,
        });
    }

    /**
     * Get a single partner by ID
     */
    async getPartnerById(id: string): Promise<IPartner> {
        return this.fetchWithAuth<IPartner>(`${this.basePath}/${id}`);
    }

    /**
     * Create a new partner
     */
    async createPartner(partnerData: CreatePartnerDto): Promise<IPartner> {
        return this.fetchWithAuth<IPartner>(this.basePath, {
            method: "POST",
            body: JSON.stringify(partnerData),
        });
    }

    /**
     * Update an existing partner
     */
    async updatePartner(id: string, partnerData: UpdatePartnetDto): Promise<IPartner> {
        return this.fetchWithAuth<IPartner>(`${this.basePath}/${id}`, {
            method: "PATCH",
            body: JSON.stringify(partnerData),
        });
    }

    /**
     * Delete a partner
     */
    async deletePartner(id: string): Promise<void> {
        await this.fetchWithAuth<void>(`${this.basePath}/${id}`, {
            method: "DELETE",
        });
    }
}

// Export a singleton instance
export const partnerService = new PartnerService();
