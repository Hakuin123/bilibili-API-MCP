import { get } from '../utils/request.js';

export async function getNoteList(oid: number, type: number = 0) {
    // Note APIs often require authentication and specific endpoints.
    // Documentation might vary, using a common known one or placeholder.
    // 'https://api.bilibili.com/x/note/list' is a guess based on naming convention,
    // often these are on 'https://api.bilibili.com/x/note/...'
    return get('https://api.bilibili.com/x/note/list', { oid, type });
}

export async function getNoteDetail(note_id: string) {
    return get('https://api.bilibili.com/x/note/detail', { note_id });
}
