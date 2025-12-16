import { get } from '../utils/request.js';

export async function search(keyword: string) {
    return get('https://api.bilibili.com/x/web-interface/search/all/v2', { keyword });
}

export async function getSearchHot() {
    return get('https://api.bilibili.com/x/web-interface/search/square', { limit: 10 });
}
