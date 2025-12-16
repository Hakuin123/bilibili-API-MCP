import { get } from '../utils/request.js';

export async function getArticleRelates(id: number) {
    return get('https://api.bilibili.com/x/web-interface/view/detail/tag', { aid: id });
}

export async function getArticleDetail(id: number) {
    return get('https://api.bilibili.com/x/article/viewinfo', { id });
}

export async function getUpArticles(mid: number) {
    // This is often part of space info
    return get('https://api.bilibili.com/x/space/article', { mid });
}
