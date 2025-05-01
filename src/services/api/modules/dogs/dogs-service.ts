import { BaseApiService } from "../../core/base-service-api";
import { PaginationParams } from "../../core/types";
import { CreateDogDto, IDog, UpdateDogDto } from "./types";

class DogService extends BaseApiService {
    readonly basePath = "/dogs";
    /**
     * Get all dogs with optional pagination
     */
    async getDogs(params?: PaginationParams): Promise<IDog[]> {
        return this.fetchWithAuth<IDog[]>(this.basePath, {
            params,
        });
    }

    /**
     * Get a single dog by ID
     */
    async getDogById(id: string): Promise<IDog> {
        return this.fetchWithAuth<IDog>(`${this.basePath}/${id}`);
    }

    /**
     * Create a new dog
     */
    async createDog(dogData: CreateDogDto): Promise<IDog> {
        return this.fetchWithAuth<IDog>(this.basePath, {
            method: "POST",
            body: JSON.stringify(dogData),
        });
    }

    /**
     * Update an existing dog
     */
    async updateDog(id: string, dogData: UpdateDogDto): Promise<IDog> {
        return this.fetchWithAuth<IDog>(`${this.basePath}/${id}`, {
            method: "PATCH",
            body: JSON.stringify(dogData),
        });
    }

    /**
     * Delete a dog
     */
    async deleteDog(id: string): Promise<void> {
        await this.fetchWithAuth<void>(`${this.basePath}/${id}`, {
            method: "DELETE",
        });
    }
}

// Export a singleton instance
export const dogService = new DogService();
