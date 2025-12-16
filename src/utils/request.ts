import axios, { AxiosInstance } from 'axios';
import { CONFIG } from '../config.js';
import { BiliResponse } from '../types.js';

const apiClient: AxiosInstance = axios.create({
    baseURL: 'https://api.bilibili.com',
    headers: {
        'User-Agent': CONFIG.USER_AGENT,
        'Cookie': CONFIG.COOKIE,
        'Referer': 'https://www.bilibili.com/'
    }
});

apiClient.interceptors.response.use(response => {
    return response;
}, error => {
    console.error('API Request Error:', error.message);
    return Promise.reject(error);
});

export async function get<T>(url: string, params: any = {}): Promise<T> {
    try {
        const response = await apiClient.get<BiliResponse<T>>(url, { params });
        if (response.data.code !== 0) {
            // Some APIs return code != 0 for specific business logic logic status, effectively errors for us mostly
            console.error(`Bilibili API Error [${response.data.code}]: ${response.data.message}`);
            // We might want to throw here or return null, depending on resilience.
            // For MCP, throwing with a clear message is often better so the model knows it failed.
            throw new Error(`Bilibili API Error [${response.data.code}]: ${response.data.message}`);
        }
        return response.data.data;
    } catch (error: any) {
        throw new Error(`Request failed: ${error.message}`);
    }
}

export function getCsrfToken(): string {
    const match = CONFIG.COOKIE.match(/bili_jct=([^;]+)/);
    return match ? match[1] : '';
}

export async function post<T>(url: string, data: any = {}, config: any = {}): Promise<T> {
    try {
        // Auto-inject csrf if strictly needed by some APIs in body, 
        // though usually Bilibili expects it as 'csrf' or 'bili_jct' depending on endpoint.
        // We will let the caller handle the specific field name, but provide the token helper.

        const response = await apiClient.post<BiliResponse<T>>(url, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                ...config.headers
            },
            ...config
        });
        if (response.data.code !== 0) {
            throw new Error(`Bilibili API Error [${response.data.code}]: ${response.data.message}`);
        }
        return response.data.data;
    } catch (error: any) {
        throw new Error(`Request failed: ${error.message}`);
    }
}
