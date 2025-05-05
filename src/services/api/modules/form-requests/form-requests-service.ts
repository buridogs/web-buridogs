import { BaseApiService } from "../../core/base-service-api";
import { PaginationParams } from "../../core/types";
import { CreateFormRequestDto, IFormRequest, UpdateFormRequestDto } from "./types";

class FormRequestsService extends BaseApiService {
    private basePath = "/form-requests";

    /**
     * Get all form-requests with optional pagination
     */
    async getFormRequests(params?: PaginationParams): Promise<IFormRequest[]> {
        return this.fetchWithAuth<IFormRequest[]>(this.basePath, {
            params,
        });
    }

    /**
     * Create a new form-requests
     */
    async createFormRequest(formRequestData: CreateFormRequestDto): Promise<IFormRequest> {
        return this.fetchWithAuth<IFormRequest>(
            this.basePath,
            {
                method: "POST",
                body: JSON.stringify(formRequestData),
            },
            false
        );
    }

    /**
     * Update an existing form-requests
     */
    async updateFormRequest(
        id: string,
        formRequestData: UpdateFormRequestDto
    ): Promise<IFormRequest> {
        return this.fetchWithAuth<IFormRequest>(`${this.basePath}/${id}/request-status`, {
            method: "PATCH",
            body: JSON.stringify(formRequestData),
        });
    }
}

export const formRequestsService = new FormRequestsService();
