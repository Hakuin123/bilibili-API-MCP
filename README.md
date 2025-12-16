# Bilibili API MCP Server / 哔哩哔哩 API MCP 服务器

A Model Context Protocol (MCP) server that provides access to Bilibili APIs for AI agents.
这是一个为 AI Agent 提供哔哩哔哩 API 访问能力的 Model Context Protocol (MCP) 服务器。

## Features / 功能

This server provides the following tools to MCP-compatible clients:
本服务器为支持 MCP 的客户端提供以下工具：

- **User Info**: Get user details, stats, relations.
  **用户信息**: 获取用户详情、统计、关系。
- **Video**: Get video info, tags, stream URLs (playurl), related videos.
  **视频**: 获取视频信息、标签、播放地址、相关视频。
- **Bangumi/PGC**: Get episode info, stream URLs, user's follow list.
  **番剧/影视**: 获取剧集信息、播放地址、追番列表。
- **Danmaku**: Retrieve real-time danmaku (protobuf encoded) and metadata.
  **弹幕**: 获取实时弹幕（Protobuf 编码）及元数据。
- **Search**: Search videos, users, and get hot search terms.
  **搜索**: 搜索视频、用户，获取热搜词。
- **Ranking**: Get video rankings and popular videos.
  **排行榜**: 获取视频排行榜及热门视频。
- **Dynamics**: Get user dynamics and new feeds.
  **动态**: 获取用户动态及最新动态。
- **Comments**: Get video/article comments.
  **评论**: 获取视频/专栏评论。
- **Live**: Get live room information.
  **直播**: 获取直播间信息。

## Installation / 安装

1. **Clone the repository / 克隆仓库**
   ```bash
   git clone https://github.com/your-repo/bilibili-api-mcp.git
   cd bilibili-api-mcp
   ```

2. **Install dependencies / 安装依赖**
   ```bash
   npm install
   ```

3. **Build the project / 构建项目**
   ```bash
   npm run build
   ```

## Configuration / 配置

You need to provide your Bilibili Authentication Cookies via environment variables.
您需要通过环境变量提供哔哩哔哩的身份验证 Cookie。

### Environment Variables / 环境变量

- `BILIBILI_COOKIE`: **(Required)** Your full Bilibili cookie string (e.g., `SESSDATA=...; bili_jct=...;`).
  **(必填)** 您的完整 Bilibili Cookie 字符串。
- `PORT`: (Optional) Server port if running in HTTP mode (Standard MCP uses stdio).
  (可选) HTTP 模式下的端口（标准 MCP 使用 stdio）。

**How to get cookies / 如何获取 Cookie:**
1. Log in to [bilibili.com](https://www.bilibili.com).
2. Open Developer Tools (F12) -> Application -> Cookies.
3. Copy the cookie string.
1. 登录 [bilibili.com](https://www.bilibili.com)。
2. 打开开发者工具 (F12) -> Application -> Cookies。
3. 复制 Cookie 字符串。

## Usage / 使用方法

Run the server using Node.js. This server implementation uses `stdio` transport, suitable for integration with Claude Desktop or other MCP clients.
使用 Node.js 运行服务器。本服务器实现使用 `stdio` 传输协议，适合集成到 Claude Desktop 或其他 MCP 客户端。

```bash
# Set cookie and run / 设置 Cookie 并运行
# Windows (PowerShell)
$env:BILIBILI_COOKIE='your_cookie_here'; node build/index.js

# Linux/macOS
export BILIBILI_COOKIE='your_cookie_here'
node build/index.js
```

### Configure in Claude Desktop / 在 Claude Desktop 中配置

Add this to your `claude_desktop_config.json`:
将以下内容添加到您的 `claude_desktop_config.json`：

```json
{
  "mcpServers": {
    "bilibili": {
      "command": "node",
      "args": ["/path/to/bilibili-api-mcp/build/index.js"],
      "env": {
        "BILIBILI_COOKIE": "your_cookie_string_here"
      }
    }
  }
}
```

## License

ISC
