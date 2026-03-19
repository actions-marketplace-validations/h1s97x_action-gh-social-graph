# 🌌 GitHub Social Graph Action

Analyze a GitHub user's social network and automatically post a report as a PR comment or Job Summary.

分析 GitHub 用户的社交网络，自动将报告发布为 PR 评论或 Job Summary。

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-GitHub%20Social%20Graph-blue?logo=github)](https://github.com/marketplace/actions/github-social-graph)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Features / 功能特性

- Analyzes followers, following, and mutual connections / 分析关注者、关注列表及互相关注关系
- Identifies top collaborators across repositories / 识别跨仓库的顶级协作者
- Recommends developers based on collaboration patterns / 基于协作模式推荐开发者
- Shows programming language distribution / 展示编程语言分布
- Posts a formatted Markdown report as a PR comment (auto-updates on re-run) / 将格式化 Markdown 报告发布为 PR 评论（重新运行时自动更新）
- Writes a summary to the GitHub Actions Job Summary page / 将摘要写入 GitHub Actions Job Summary 页面

---

## Usage / 使用方法

### Analyze PR author automatically / 自动分析 PR 作者

```yaml
name: Social Graph Analysis

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  analyze:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - uses: h1s97x/action-gh-social-graph@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

### Analyze a specific user manually / 手动分析指定用户

```yaml
name: Social Graph Analysis

on:
  workflow_dispatch:
    inputs:
      username:
        description: 'GitHub username to analyze'
        required: true

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: h1s97x/action-gh-social-graph@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          username: ${{ github.event.inputs.username }}
          comment-on-pr: 'false'
```

### Use outputs in subsequent steps / 在后续步骤中使用输出

```yaml
- uses: h1s97x/action-gh-social-graph@v1
  id: graph
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}

- run: |
    echo "Total nodes: ${{ steps.graph.outputs.total-nodes }}"
    echo "Recommendations: ${{ steps.graph.outputs.recommendations }}"
```

---

## Inputs / 输入参数

| Input | Description / 说明 | Required / 必填 | Default / 默认值 |
|-------|---------------------|-----------------|------------------|
| `github-token` | GitHub token for API calls and PR comments / 用于 API 调用和 PR 评论的 Token | Yes / 是 | `${{ github.token }}` |
| `username` | GitHub username to analyze. Defaults to PR author / 要分析的用户名，默认为 PR 作者 | No / 否 | `''` |
| `max-followers` | Maximum number of followers to analyze / 最多分析的关注者数量 | No / 否 | `50` |
| `max-repos` | Maximum number of repositories to analyze / 最多分析的仓库数量 | No / 否 | `15` |
| `comment-on-pr` | Post report as a PR comment / 将报告发布为 PR 评论 | No / 否 | `true` |

---

## Outputs / 输出参数

| Output | Description / 说明 |
|--------|--------------------|
| `report` | Generated Markdown report / 生成的 Markdown 报告 |
| `total-nodes` | Total number of graph nodes / 图谱总节点数 |
| `total-links` | Total number of graph links / 图谱总连接数 |
| `user-nodes` | Number of developer nodes / 开发者节点数 |
| `repo-nodes` | Number of repository nodes / 仓库节点数 |
| `recommendations` | Recommended developers (JSON array of logins) / 推荐开发者（JSON 数组） |

---

## Permissions / 权限

```yaml
permissions:
  pull-requests: write  # required for PR comments / PR 评论所需权限
```

---

## Example Report Output / 示例报告输出

When triggered on a pull request, the action posts a comment like this:

触发后，Action 会在 PR 下发布如下评论：

> ## 🌌 GitHub Social Graph — @octocat
>
> ### 📊 Overview / 概览
>
> | Metric / 指标 | Value / 数值 |
> |---|---|
> | 👥 Developers / 开发者节点 | 42 |
> | 📦 Repositories / 仓库节点 | 10 |
> | 🔗 Connections / 关系连接 | 87 |
>
> ### 💻 Languages / 编程语言
>
> `TypeScript` ×12  `Python` ×8  `Go` ×5
>
> ### 🎯 Recommended Developers / 推荐关注

---

## Rate Limits / 速率限制

The default `GITHUB_TOKEN` allows **5,000 API requests/hour**. For large networks, consider using a Personal Access Token with higher limits.

默认 `GITHUB_TOKEN` 每小时允许 **5,000 次** API 请求。对于大型网络，建议使用具有更高限额的 Personal Access Token。

```yaml
- uses: h1s97x/action-gh-social-graph@v1
  with:
    github-token: ${{ secrets.MY_GITHUB_TOKEN }}
```

---

## Contributing / 贡献

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and contribution guidelines.

请参阅 [CONTRIBUTING.md](CONTRIBUTING.md) 了解开发环境配置和贡献指南。

---

## License / 许可证

[MIT](LICENSE) © [h1s97x](https://github.com/h1s97x)
