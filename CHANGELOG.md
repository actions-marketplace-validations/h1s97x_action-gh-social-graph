# Changelog

All notable changes to this project will be documented in this file.

本文件记录项目的所有重要变更。

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-03-19

### Added / 新增

- Initial release of GitHub Social Graph Action / GitHub Social Graph Action 首次发布
- Analyze GitHub user social networks (followers, following, mutual connections) / 分析 GitHub 用户社交网络（关注者、关注列表、互相关注）
- Identify top collaborators across repositories / 识别跨仓库顶级协作者
- Recommend developers based on collaboration patterns / 基于协作模式推荐开发者
- Show programming language distribution / 展示编程语言分布
- Post bilingual (EN/ZH) Markdown report as PR comment, auto-updates on re-run / 将中英双语 Markdown 报告发布为 PR 评论，重新运行时自动更新
- Write summary to GitHub Actions Job Summary page / 将摘要写入 GitHub Actions Job Summary 页面
- Outputs: `report`, `total-nodes`, `total-links`, `user-nodes`, `repo-nodes`, `recommendations`
- Bilingual README (English + Chinese) / 中英双语 README
- Bilingual CONTRIBUTING guide / 中英双语贡献指南
- MIT License / MIT 许可证
- CI/CD workflow: auto-rebuild and commit `dist/` on push to `main` / CI/CD 工作流：推送到 main 时自动重新构建并提交 `dist/`

### Fixed / 修复

- TypeScript error: `HeadersInit` not available in Node20 target, replaced with `Record<string, string>` / 修复 Node20 目标下 `HeadersInit` 类型不可用的问题
- TypeScript error: unsafe cast of `ctx.payload.sender`, added `unknown` intermediate cast / 修复 `ctx.payload.sender` 不安全类型转换问题
