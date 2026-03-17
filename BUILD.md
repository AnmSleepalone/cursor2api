# 二进制打包指南

本项目使用 Bun 进行二进制打包，生成独立可执行文件。

## 前置要求

- 安装 [Bun](https://bun.sh) >= 1.0

## 打包命令

### Windows 平台

在 Windows 上打包 Windows 二进制：

```bash
bun run build:binary
# 或
bun run build:binary:windows
```

生成文件：`cursor2api.exe` (约 111MB)

### Linux 平台

在 Linux 上打包 Linux 二进制：

```bash
bun run build:binary:linux
```

生成文件：`cursor2api-linux`

**注意**：交叉编译（在 Windows 上打包 Linux 版本）可能失败，建议在目标平台上直接打包。

## 运行二进制

打包后的二进制文件包含所有依赖和静态资源，可以直接运行：

```bash
# Windows
./cursor2api.exe

# Linux
chmod +x cursor2api-linux
./cursor2api-linux
```

## 配置

二进制文件会读取以下配置：

1. 环境变量（推荐）
2. `.env` 文件（需要在运行目录创建）
3. `config.yaml` 文件（如果存在）

示例 `.env` 文件：

```env
PORT=3010
CURSOR_MODEL=anthropic/claude-sonnet-4.6
AUTH_TOKENS=your-secret-token
```

## 静态资源

打包时会自动将 `public/` 目录下的静态文件嵌入到二进制中：

- `logs.html` - 日志查看器页面
- `login.html` - 登录页面
- `logs.css` - 样式文件
- `logs.js` - 前端脚本

如果需要更新静态资源，修改 `public/` 目录后重新打包即可。

## 技术细节

打包流程：

1. `scripts/generate-assets.ts` - 将静态文件转换为 TypeScript 模块
2. `bun build --compile` - 编译并打包为二进制

生成的 `src/static-assets.ts` 文件会被自动生成，无需手动编辑。

## 故障排查

### 打包失败

- 确保已安装最新版本的 Bun
- 检查 `public/` 目录下的文件是否完整
- 尝试清理后重新打包：`rm -rf node_modules && bun install`

### 运行时错误

- 检查环境变量配置是否正确
- 确保端口未被占用
- 查看日志输出获取详细错误信息

### 静态资源加载失败

- 打包前确保 `public/` 目录存在且包含所有必需文件
- 检查 `src/static-assets.ts` 是否正确生成
- 重新运行 `bun scripts/generate-assets.ts` 后再打包
