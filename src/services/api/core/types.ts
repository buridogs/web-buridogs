/**
 * Common request options that extend the native RequestInit
 */
export interface RequestOptions extends Omit<RequestInit, "body" | "method"> {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: any;
    params?: PaginationParams;
    headers?: Record<string, string>;
}

/**
 * Generic API response structure
 */
export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: "asc" | "desc";
}

/**
 * Paginated response structure
 */
export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
