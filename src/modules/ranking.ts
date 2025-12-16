import { get } from '../utils/request.js';

export async function getRanking(rid: number = 0) {
    return get('https://api.bilibili.com/x/web-interface/ranking/v2', { rid });
}

export async function getPopular() {
    return get('https://api.bilibili.com/x/web-interface/popular');
}

export async function getLatest() {
    return get('https://api.bilibili.com/x/web-interface/dynamic/region', { ps: 20, rid: 1 }); // rid 1 = douga, example
}
