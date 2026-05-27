import { type ApiResponse } from "../data/apiResponse";

interface ShortenResponse {
    shortUrl: string;
    urlCode: string;
}

export async function shortenUrl(
    longUrl: string,
    alias: string,
): Promise<ApiResponse<ShortenResponse>> {
    const response = await fetch("/api/v1/link/shorten", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl, alias }),
    });

    const data = await response.json();
    console.log("API Response:", data);

    return {
        message: data.message,
        data: {
            shortUrl: data.data.shortUrl,
            urlCode: data.data.urlCode,
        },
    };
}
