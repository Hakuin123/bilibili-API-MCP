import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load env vars
dotenv.config();

export const CONFIG = {
    COOKIE: process.env.BILIBILI_COOKIE || process.env.COOKIE || '',
    PORT: process.env.PORT || 3000, // Though MCP mostly uses stdio, good to have config
    USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

if (!CONFIG.COOKIE) {
    console.warn('WARNING: No BILIBILI_COOKIE found in environment variables. Some APIs may fail.');
}
