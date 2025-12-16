import { get } from '../utils/request.js';

export async function getUserInfo(mid?: number) {
    // If mid is not provided, it gets the logged-in user's info if cookie is present,
    // but the API endpoint for "my info" is different from "some user's info".
    // 'https://api.bilibili.com/x/space/wbi/acc/info?mid=xxx' is for space info.
    // 'https://api.bilibili.com/x/web-interface/nav' is for logged in user basic info.

    if (mid) {
        return get('https://api.bilibili.com/x/space/wbi/acc/info', { mid });
    } else {
        return get('https://api.bilibili.com/x/web-interface/nav');
    }
}

export async function getUserStat(mid: number) {
    return get('https://api.bilibili.com/x/relation/stat', { vmid: mid });
}

export async function getUserCard(mid: number) {
    return get('https://api.bilibili.com/x/web-interface/card', { mid });
}

export async function getUserRelations(mid: number) {
    // Followers? Followings?
    // Using standard followings for now: https://api.bilibili.com/x/relation/followings
    return get('https://api.bilibili.com/x/relation/followings', { vmid: mid });
}
