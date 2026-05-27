interface ApiResponse<T> {
    message: string;
    data: T;
    error?: ApiErrorResponse;
}

interface ApiErrorResponse {
    statusCode: number;
    message: string;
    errorCode: string;
}

export type { ApiResponse, ApiErrorResponse };
