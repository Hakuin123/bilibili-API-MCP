import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { CONFIG } from './config.js';

// Import modules
import * as User from './modules/user.js';
import * as Video from './modules/video.js';
import * as Episode from './modules/episode.js';
import * as Danmaku from './modules/danmaku.js';
import * as Note from './modules/note.js';
import * as Article from './modules/article.js';
import * as Dynamic from './modules/dynamic.js';
import * as Ranking from './modules/ranking.js';
import * as Search from './modules/search.js';
import * as Comment from './modules/comment.js';
import * as Live from './modules/live.js';

const server = new Server(
    {
        name: 'bilibili-api-mcp',
        version: '1.0.0',
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            // User
            { name: 'get_user_info', description: 'Get user info. If mid is omitted, gets current user info.', inputSchema: { type: 'object', properties: { mid: { type: 'number' } } } },
            { name: 'get_user_stat', description: 'Get user statistics (following, followers)', inputSchema: { type: 'object', properties: { mid: { type: 'number' } }, required: ['mid'] } },
            { name: 'get_user_card', description: 'Get user card info', inputSchema: { type: 'object', properties: { mid: { type: 'number' } }, required: ['mid'] } },
            { name: 'get_user_relations', description: 'Get user followings', inputSchema: { type: 'object', properties: { mid: { type: 'number' } }, required: ['mid'] } },

            // Video
            { name: 'get_video_info', description: 'Get video details by BVID', inputSchema: { type: 'object', properties: { bvid: { type: 'string' } }, required: ['bvid'] } },
            { name: 'get_video_tags', description: 'Get video tags', inputSchema: { type: 'object', properties: { bvid: { type: 'string' } }, required: ['bvid'] } },
            { name: 'get_video_related', description: 'Get related videos', inputSchema: { type: 'object', properties: { bvid: { type: 'string' } }, required: ['bvid'] } },
            { name: 'get_video_stream', description: 'Get video play url', inputSchema: { type: 'object', properties: { bvid: { type: 'string' }, cid: { type: 'number' } }, required: ['bvid', 'cid'] } },
            { name: 'like_video', description: 'Like or unlike a video', inputSchema: { type: 'object', properties: { bvid: { type: 'string' }, like: { type: 'boolean' } }, required: ['bvid'] } },
            { name: 'coin_video', description: 'Coin a video', inputSchema: { type: 'object', properties: { bvid: { type: 'string' }, multiply: { type: 'number' } }, required: ['bvid'] } },
            { name: 'share_video', description: 'Share a video', inputSchema: { type: 'object', properties: { bvid: { type: 'string' } }, required: ['bvid'] } },
            { name: 'get_video_subtitle', description: 'Get video subtitle info', inputSchema: { type: 'object', properties: { bvid: { type: 'string' }, cid: { type: 'number' } }, required: ['bvid', 'cid'] } },

            // Episode
            { name: 'get_pgc_view', description: 'Get PGC (Anime/Movie) status/info', inputSchema: { type: 'object', properties: { ep_id: { type: 'number' } }, required: ['ep_id'] } },
            { name: 'get_pgc_playurl', description: 'Get PGC play url', inputSchema: { type: 'object', properties: { ep_id: { type: 'number' }, cid: { type: 'number' } }, required: ['ep_id', 'cid'] } },
            { name: 'get_my_bangumi', description: 'Get my followed bangumis', inputSchema: { type: 'object', properties: {} } },

            // Danmaku
            { name: 'get_danmaku_proto', description: 'Get danmaku protobuf (base64)', inputSchema: { type: 'object', properties: { oid: { type: 'number' } }, required: ['oid'] } },
            { name: 'get_danmaku_view', description: 'Get danmaku view metadata (base64)', inputSchema: { type: 'object', properties: { oid: { type: 'number' } }, required: ['oid'] } },

            // Search
            { name: 'search', description: 'Search Bilibili', inputSchema: { type: 'object', properties: { keyword: { type: 'string' } }, required: ['keyword'] } },
            { name: 'get_search_hot', description: 'Get hot search terms', inputSchema: { type: 'object', properties: {} } },

            // Ranking
            { name: 'get_ranking', description: 'Get rankings', inputSchema: { type: 'object', properties: { rid: { type: 'number' } } } },
            { name: 'get_popular', description: 'Get popular videos', inputSchema: { type: 'object', properties: {} } },

            // Dynamic
            { name: 'get_dynamic_new', description: 'Get new dynamics', inputSchema: { type: 'object', properties: {} } },
            { name: 'get_space_dynamic', description: 'Get user space dynamics', inputSchema: { type: 'object', properties: { host_mid: { type: 'number' } }, required: ['host_mid'] } },
            { name: 'publish_dynamic', description: 'Publish a text dynamic', inputSchema: { type: 'object', properties: { content: { type: 'string' } }, required: ['content'] } },
            { name: 'repost_dynamic', description: 'Repost a dynamic', inputSchema: { type: 'object', properties: { dynamic_id: { type: 'string' }, content: { type: 'string' } }, required: ['dynamic_id'] } },
            // Comments
            { name: 'get_comments', description: 'Get comments', inputSchema: { type: 'object', properties: { oid: { type: 'number' }, type: { type: 'number' } }, required: ['oid'] } },

            // Live
            { name: 'get_room_info', description: 'Get live room info', inputSchema: { type: 'object', properties: { room_id: { type: 'number' } }, required: ['room_id'] } }
        ],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
        const { name, arguments: args } = request.params;
        const _args = args as any;

        switch (name) {
            case 'get_user_info': return { content: [{ type: 'text', text: JSON.stringify(await User.getUserInfo(_args.mid)) }] };
            case 'get_user_stat': return { content: [{ type: 'text', text: JSON.stringify(await User.getUserStat(_args.mid)) }] };
            case 'get_user_card': return { content: [{ type: 'text', text: JSON.stringify(await User.getUserCard(_args.mid)) }] };
            case 'get_user_relations': return { content: [{ type: 'text', text: JSON.stringify(await User.getUserRelations(_args.mid)) }] };

            case 'get_video_info': return { content: [{ type: 'text', text: JSON.stringify(await Video.getVideoInfo(_args.bvid)) }] };
            case 'get_video_tags': return { content: [{ type: 'text', text: JSON.stringify(await Video.getVideoTags(_args.bvid)) }] };
            case 'get_video_related': return { content: [{ type: 'text', text: JSON.stringify(await Video.getVideoRelated(_args.bvid)) }] };
            case 'get_video_stream': return { content: [{ type: 'text', text: JSON.stringify(await Video.getVideoStream(_args.bvid, _args.cid)) }] };
            case 'like_video': return { content: [{ type: 'text', text: JSON.stringify(await Video.likeVideo(_args.bvid, _args.like)) }] };
            case 'coin_video': return { content: [{ type: 'text', text: JSON.stringify(await Video.coinVideo(_args.bvid, _args.multiply)) }] };
            case 'share_video': return { content: [{ type: 'text', text: JSON.stringify(await Video.shareVideo(_args.bvid)) }] };
            case 'get_video_subtitle': return { content: [{ type: 'text', text: JSON.stringify(await Video.getVideoSubtitle(_args.bvid, _args.cid)) }] };

            case 'get_pgc_view': return { content: [{ type: 'text', text: JSON.stringify(await Episode.getPgcView(_args.ep_id)) }] };
            case 'get_pgc_playurl': return { content: [{ type: 'text', text: JSON.stringify(await Episode.getPgcPlayUrl(_args.ep_id, _args.cid)) }] };
            case 'get_my_bangumi': return { content: [{ type: 'text', text: JSON.stringify(await Episode.getMyBangumi()) }] };

            case 'get_danmaku_proto': return { content: [{ type: 'text', text: JSON.stringify(await Danmaku.getDanmakuProto(_args.oid)) }] };
            case 'get_danmaku_view': return { content: [{ type: 'text', text: JSON.stringify(await Danmaku.getDanmakuView(_args.oid)) }] };

            case 'search': return { content: [{ type: 'text', text: JSON.stringify(await Search.search(_args.keyword)) }] };
            case 'get_search_hot': return { content: [{ type: 'text', text: JSON.stringify(await Search.getSearchHot()) }] };

            case 'get_ranking': return { content: [{ type: 'text', text: JSON.stringify(await Ranking.getRanking(_args.rid)) }] };
            case 'get_popular': return { content: [{ type: 'text', text: JSON.stringify(await Ranking.getPopular()) }] };

            case 'get_dynamic_new': return { content: [{ type: 'text', text: JSON.stringify(await Dynamic.getDynamicNew()) }] };
            case 'get_space_dynamic': return { content: [{ type: 'text', text: JSON.stringify(await Dynamic.getSpaceDynamic(_args.host_mid)) }] };
            case 'publish_dynamic': return { content: [{ type: 'text', text: JSON.stringify(await Dynamic.publishDynamic(_args.content)) }] };
            case 'repost_dynamic': return { content: [{ type: 'text', text: JSON.stringify(await Dynamic.repostDynamic(_args.dynamic_id, _args.content)) }] };

            case 'get_comments': return { content: [{ type: 'text', text: JSON.stringify(await Comment.getComments(_args.oid, _args.type)) }] };

            case 'get_room_info': return { content: [{ type: 'text', text: JSON.stringify(await Live.getRoomInfo(_args.room_id)) }] };

            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    } catch (error: any) {
        return {
            content: [{ type: 'text', text: `Error: ${error.message}` }],
            isError: true,
        };
    }
});

const transport = new StdioServerTransport();
await server.connect(transport);
