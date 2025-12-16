import { get } from '../utils/request.js';

export async function getPgcView(ep_id: number) {
    return get('https://api.bilibili.com/pgc/view/web/season/user/status', { ep_id });
}

export async function getPgcPlayUrl(ep_id: number, cid: number) {
    return get('https://api.bilibili.com/pgc/player/web/playurl', { ep_id, cid, fnval: 16 });
}

export async function getMyBangumi() {
    return get('https://api.bilibili.com/x/space/bangumi/follow/list?type=1');
}

export async function getMyCinema() {
    return get('https://api.bilibili.com/x/space/bangumi/follow/list?type=2');
}
