import { get } from '../utils/request.js';

export async function getComments(oid: number, type: number = 1) { // type 1 for video, 11 for picture, 12 for article
    return get('https://api.bilibili.com/x/v2/reply', { oid, type });
}
