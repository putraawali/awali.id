interface ApiResponse<T> {
    message: "success" | "error";
    data: T;
    error?: ApiErrorResponse;
}

interface ApiErrorResponse {
    statusCode: number;
    message: string;
    errorCode: string;
}

export type { ApiResponse, ApiErrorResponse };
