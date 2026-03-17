#!/usr/bin/env bun
/**
 * 生成静态资源模块
 * 将 public 目录下的文件内容嵌入到 TypeScript 模块中，用于二进制打包
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const publicDir = join(import.meta.dir, '..', 'public');
const outputFile = join(import.meta.dir, '..', 'src', 'static-assets.ts');

const files = [
    'logs.html',
    'login.html',
    'logs.css',
    'logs.js',
];

let output = `/**
 * 静态资源模块（自动生成）
 * 此文件由 scripts/generate-assets.ts 生成，请勿手动编辑
 */

export const staticAssets: Record<string, string> = {
`;

for (const file of files) {
    const content = readFileSync(join(publicDir, file), 'utf-8');
    // 转义反引号和 ${} 以避免模板字符串问题
    const escaped = content
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$/g, '\\$');

    output += `    '${file}': \`${escaped}\`,\n`;
}

output += `};\n`;

writeFileSync(outputFile, output, 'utf-8');
console.log(`✓ 已生成 ${outputFile}`);
console.log(`  包含 ${files.length} 个文件`);
