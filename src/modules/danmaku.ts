import { get } from '../utils/request.js';
import axios from 'axios';
import { CONFIG } from '../config.js';

// Get Danmaku Protobuf (Real-time / Seg.so)
export async function getDanmakuProto(oid: number, type: number = 1) {
    // This usually returns a binary stream (protobuf).
    // MCP tools return text/json usually. We might need to decode it or return base64.
    // returning base64 for now as safe default for binary.
    try {
        const response = await axios.get('https://api.bilibili.com/x/v2/dm/web/seg.so', {
            params: { type, oid, segment_index: 1 },
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': CONFIG.USER_AGENT,
                'Cookie': CONFIG.COOKIE
            }
        });
        return {
            format: 'protobuf (base64)',
            data: Buffer.from(response.data).toString('base64'),
            note: 'You need to decode this using the corresponding .proto definition (dm.proto).'
        };
    } catch (error: any) {
        throw new Error(`Failed to fetch danmaku: ${error.message}`);
    }
}

// Get Danmaku Metadata (View)
export async function getDanmakuView(oid: number, type: number = 1) {
    // https://api.bilibili.com/x/v2/dm/web/view
    // Returns protobuf data about the dm configuration/metadata
    try {
        const response = await axios.get('https://api.bilibili.com/x/v2/dm/web/view', {
            params: { type, oid },
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': CONFIG.USER_AGENT,
                'Cookie': CONFIG.COOKIE
            }
        });
        return {
            format: 'protobuf (base64)',
            data: Buffer.from(response.data).toString('base64'),
            note: 'You need to decode this using the corresponding .proto definition (dm_view.proto).'
        };
    } catch (error: any) {
        throw new Error(`Failed to fetch danmaku view: ${error.message}`);
    }
}
