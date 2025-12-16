import { get, post } from '../utils/request.js';

export async function getVideoInfo(bvid: string) {
    return get('https://api.bilibili.com/x/web-interface/view', { bvid });
}

export async function getVideoTags(bvid: string) {
    return get('https://api.bilibili.com/x/web-interface/view/detail/tag', { bvid });
}

export async function getVideoRelated(bvid: string) {
    return get('https://api.bilibili.com/x/web-interface/archive/related', { bvid });
}

export async function getVideoStream(bvid: string, cid: number) {
    // Note: fnval=80 for Dash, 16 for mp4 (limited)
    return get('https://api.bilibili.com/x/player/playurl', { bvid, cid, fnval: 16 });
}

// Actions
import { getCsrfToken } from '../utils/request.js';

// Actions
export async function likeVideo(bvid: string, like: boolean = true) {
    const csrf = getCsrfToken();
    if (!csrf) throw new Error("Missing bili_jct in cookies. Cannot perform write operations.");

    return post('https://api.bilibili.com/x/web-interface/archive/like', {
        bvid,
        like: like ? 1 : 2, // 1: like, 2: cancel
        csrf
    });
}

export async function coinVideo(bvid: string, multiply: number = 1) {
    const csrf = getCsrfToken();
    if (!csrf) throw new Error("Missing bili_jct in cookies.");

    return post('https://api.bilibili.com/x/web-interface/coin/add', {
        bvid,
        multiply, // 1 or 2
        csrf
    });
}

export async function favVideo(rid: number, add_media_ids: string = "") {
    // Fav API is complex (needs media_id aka folder id). 
    // Simplified stub or basic implementation if we knew default folder.
    // For now, let's just leave a note or minimal impl.
    // 'rid' here is usually the video aid, not bvid directly? 
    // Actually API uses aid. We need to convert bvid to aid first usually.
    return { error: "Favorite operation requires AID and Folder ID, more complex than basic implementation." };
}

export async function shareVideo(bvid: string) {
    const csrf = getCsrfToken();
    if (!csrf) throw new Error("Missing bili_jct.");
    return post('https://api.bilibili.com/x/web-interface/share/add', {
        bvid,
        csrf
    });
}
