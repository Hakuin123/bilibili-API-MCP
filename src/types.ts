export interface BiliResponse<T = any> {
    code: number;
    message: string;
    ttl: number;
    data: T;
}

export interface BiliPage {
    count: number;
    num: number;
    size: number;
}
