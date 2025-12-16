import { get, post, getCsrfToken } from '../utils/request.js';

export async function getDynamicNew() {
    return get('https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/all');
}

export async function getSpaceDynamic(host_mid: number) {
    return get('https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space', { host_mid });
}

export async function getDynamicDetail(id: string) {
    return get('https://api.bilibili.com/x/polymer/web-dynamic/v1/detail', { id });
}

export async function publishDynamic(content: string) {
    const csrf = getCsrfToken();
    if (!csrf) throw new Error("Missing bili_jct.");

    // https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/create
    return post('https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/create', {
        dynamic_id: 0,
        type: 4, // Text dynamic
        rid: 0,
        content: content,
        up_choose_comment: 0,
        up_close_comment: 0,
        extension: '{"emoji_type":1}',
        at_uids: '',
        ctrl: '[]',
        csrf_token: csrf,
        csrf: csrf
    });
}

export async function repostDynamic(dynamic_id: string, content: string = "转发动态") {
    const csrf = getCsrfToken();
    if (!csrf) throw new Error("Missing bili_jct.");

    return post('https://api.bilibili.com/x/dynamic/feed/repost/create', {
        dyn_req_id: dynamic_id,
        content,
        csrf
    });
}
