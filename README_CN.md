# Oh My OpenCode Dashboard

[English](./README.md) | 中文

本地只读仪表盘，用于查看 OpenCode 和 OhMyOpenCode 代理进度。

![Dashboard GUI](./gui.png)

## 目标

- 显示 `.sisyphus/boulder.json` 和活动计划 Markdown 的计划进度。
- 显示从持久化 OpenCode 会话工件推断的后台任务视图。
- 显示主会话活动和近期工具调用活动作为轻量级信号。
- 永不渲染提示词、工具参数或原始工具输出。

## 你可以看到什么

- 主会话：代理、当前工具/模型、会话标签/ID、最后更新、状态。
- 计划进度：复选框进度 + 可选步骤列表（从计划 Markdown 解析）。
- 主会话任务行：检测到的主会话的单行汇总。
- 数据源下拉（可选）：在注册的项目源之间切换；每个源显示其活动的主会话。
- 后台任务：从 `delegate_task` 工具部分推断；可展开。
- 工具调用（仅元数据）：每个会话的工具名称/状态/时间戳，为安全起见有上限。
- Token 使用：总量及可展开的每模型明细。
- 时序活动：最近 5 分钟的工具调用计数（主代理 + 后台总计）。
- 声音通知（可选）：进度推进/出现问题/等待用户时响铃。
- 原始 JSON（已脱敏）：复制 UI 正在渲染的 API 负载。

## 多语言支持

仪表盘支持英文和中文界面。点击右上角的语言切换按钮即可切换语言。

## 要求

- Bun

## 安装 (npm)

无需全局安装，直接在目标项目目录运行：

```bash
bunx oh-my-opencode-dashboard@latest
```

注册额外的项目源（可选；启用 UI 中的源下拉）：

```bash
bunx oh-my-opencode-dashboard@latest add --name "我的项目"
```

或为不同的项目路径运行仪表盘：

```bash
bunx oh-my-opencode-dashboard@latest add --name "我的项目" --project /absolute/path/to/your/project
```

默认值：

- `--project` 默认为当前工作目录
- `--name` 默认为 `basename(projectRoot)`

或明确指定项目路径：

```bash
bunx -p oh-my-opencode-dashboard oh-my-opencode-dashboard -- --project /absolute/path/to/your/project
```

或全局安装：

```bash
bun add -g oh-my-opencode-dashboard
```

然后：

```bash
oh-my-opencode-dashboard
```

选项：

- `--project <path>`（可选）：用于计划查找和会话过滤的项目根目录（默认为当前工作目录）
- `--port <number>`（可选）：默认 51234

## 从源码安装

```bash
bun install
```

## 运行

开发模式（API + UI 开发服务器）：

```bash
bun run dev -- --project /absolute/path/to/your/project
```

生产模式（单服务器提供 UI + API）：

```bash
bun run build
bun run start -- --project /absolute/path/to/your/project
```

## 读取的内容（基于文件）

- 项目（可选；OhMyOpenCode 计划追踪）：
  - `.sisyphus/boulder.json`
  - `boulder.active_plan` 处的计划文件
- OpenCode 存储：
  - `${XDG_DATA_HOME ?? ~/.local/share}/opencode/storage/{session,message,part}`

## 如何选择会话

- 如果 `.sisyphus/boulder.json` 存在，优先选择磁盘上存在的最近 `session_ids[]` 条目。
- 否则回退到 `meta.directory` 与你的 `--project` 路径（realpath 规范化）完全匹配的最近更新的 OpenCode 会话。

## 原生 OpenCode（无 OhMyOpenCode）

你可以在纯 OpenCode（无 `.sisyphus/`）中使用此仪表盘：

- 计划进度将显示为"未开始"，因为缺少 `.sisyphus/boulder.json`。
- UI 中显示的工具调用是针对所选源的（默认为你的 `--project`）。
- 工具调用视图仅显示元数据（如工具名称/状态/时间/计数）。它永不渲染提示词、工具参数、工具输出或工具错误。
- 会话发现使用精确目录匹配：你的 `--project` 路径被解析并 realpath 规范化，然后与每个会话的 `meta.directory`（也是 realpath 规范化）比较。不进行前缀/"包含"匹配。

## 隐私/脱敏

此仪表盘设计为避免敏感数据：

- 不显示提示词。
- 不显示工具参数（`state.input`）。
- 不显示原始工具输出或错误（`state.output`、`state.error`）。
- 后台任务仅提取允许列表（如 `description`、`subagent_type` / `category`）并派生计数/时间戳。
- 源切换使用你注册的标签；UI 不显示绝对项目根路径。

## 安全性

- 服务器仅绑定到 `127.0.0.1`。
- 路径访问基于允许列表和 realpath 以防止符号链接逃逸：
  - 项目根目录
  - OpenCode 存储根目录

## 限制

- 后台任务状态是从持久化工件推断的最佳努力结果。
- 如果 OpenCode 存储目录缺失或不可读，部分区域可能显示空/未知状态。

## 故障排除

- 如果仪表盘在开发模式下显示"已断开"，请确保 API 服务器正在运行且 UI 正在使用 Vite 代理。
- 如果计划进度保持为空，要么添加 `.sisyphus/boulder.json`（OhMyOpenCode），要么在原生 OpenCode 中视为预期行为。
- 如果未检测到会话，请在该确切项目目录中至少运行一次 OpenCode。
- 如果未检测到会话，请确保 `--project` 与会话元数据中存储的目录的真实（解析后）路径匹配（符号链接很重要）。
- 如果未检测到会话，请验证 OpenCode 存储存在于 `${XDG_DATA_HOME ?? ~/.local/share}/opencode/storage`（检查 `XDG_DATA_HOME`）。

## 发布（维护者）

此包通过 GitHub Actions 使用 npm 可信发布（OIDC）发布（无需 `NPM_TOKEN`）。

一次性设置（浏览器）：

1. 打开 npm 的 `oh-my-opencode-dashboard` -> `Settings` -> `Trusted Publisher` -> 选择 `GitHub Actions`。
2. 配置：
   - Workflow 文件名：`test-and-publish.yml`
   - Environment 名称：留空，除非你使用 GitHub Environments

OIDC 验证后，移除用于发布的任何 `NPM_TOKEN` secrets。
