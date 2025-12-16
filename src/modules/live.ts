import { get } from '../utils/request.js';

export async function getRoomInfo(room_id: number) {
    return get('https://api.live.bilibili.com/room/v1/Room/get_info', { room_id });
}

export async function getLiveUser(id: number) {
    return get('https://api.live.bilibili.com/live_user/v1/Master/info', { uid: id });
}
