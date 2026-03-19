# Contributing Guide / 贡献指南

Thank you for considering contributing to GitHub Social Graph Action! 🎉

感谢你考虑为 GitHub Social Graph Action 做出贡献！🎉

## Table of Contents / 目录

- [Code of Conduct / 行为准则](#code-of-conduct--行为准则)
- [How to Contribute / 如何贡献](#how-to-contribute--如何贡献)
- [Development Setup / 开发环境](#development-setup--开发环境)
- [Code Style / 代码规范](#code-style--代码规范)
- [Commit Convention / 提交规范](#commit-convention--提交规范)
- [Pull Request Process / PR 流程](#pull-request-process--pr-流程)

---

## Code of Conduct / 行为准则

This project follows the Contributor Covenant. By participating, you agree to uphold its terms.

本项目采用贡献者公约作为行为准则，参与即表示你同意遵守其条款。

---

## How to Contribute / 如何贡献

### Reporting Bugs / 报告 Bug

Before submitting a bug report, please:

提交 Bug 报告前，请先：

1. Check [Issues](https://github.com/h1s97x/action-gh-social-graph/issues) for existing reports / 检查是否已有相同问题
2. Confirm you are on the latest version / 确认使用的是最新版本
3. Collect the following info / 收集以下信息：
   - Reproduction steps / 复现步骤
   - Expected vs actual behavior / 预期行为与实际行为
   - Workflow YAML and error logs / Workflow 配置和错误日志

### Suggesting Features / 建议新功能

We welcome improvement ideas! Please:

我们欢迎任何改进建议！请：

1. Open a [Feature Request](https://github.com/h1s97x/action-gh-social-graph/issues/new) / 提交功能请求 Issue
2. Describe the feature and use case in detail / 详细描述功能和使用场景

### Improving Documentation / 改进文档

Documentation improvements include:

文档改进包括：

- Fixing typos or grammar / 修正拼写或语法错误
- Adding missing documentation / 添加缺失的文档
- Improving clarity / 改进现有文档的清晰度
- Translating content / 翻译内容

---

## Development Setup / 开发环境

### 1. Fork and clone / Fork 并克隆

```bash
git clone https://github.com/h1s97x/action-gh-social-graph.git
cd action-gh-social-graph
git remote add upstream https://github.com/h1s97x/action-gh-social-graph.git
```

### 2. Create a branch / 创建分支

```bash
# New feature / 新功能
git checkout -b feature/amazing-feature

# Bug fix / Bug 修复
git checkout -b fix/bug-description
```

Branch naming / 分支命名规范：

- `feature/` — new features / 新功能
- `fix/` — bug fixes / Bug 修复
- `docs/` — documentation / 文档改进
- `refactor/` — refactoring / 代码重构

### 3. Install dependencies / 安装依赖

```bash
npm install
```

### 4. Build and type-check / 构建与类型检查

```bash
# Type check / 类型检查
npm run typecheck

# Build dist / 构建
npm run build
```

---

## Code Style / 代码规范

- Use TypeScript for all code / 所有代码使用 TypeScript
- Add type annotations to all functions / 为所有函数添加类型注解
- Avoid `any`; prefer `unknown` or specific types / 避免 `any`，使用 `unknown` 或具体类型

---

## Commit Convention / 提交规范

We follow [Conventional Commits](https://www.conventionalcommits.org/):

我们遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>
```

Types / 类型：

- `feat` — new feature / 新功能
- `fix` — bug fix / Bug 修复
- `docs` — documentation / 文档更新
- `refactor` — refactoring / 代码重构
- `chore` — build/tooling / 构建或工具相关

Examples / 示例：

```bash
feat: add language distribution chart
fix: handle missing PR author gracefully
docs: update usage examples in README
refactor(analyzer): simplify recommendation scoring
```

---

## Pull Request Process / PR 流程

### Before submitting / 提交前检查

- [ ] Code compiles without errors / 代码无编译错误
- [ ] No TypeScript errors / 无 TypeScript 错误
- [ ] `dist/` is rebuilt / 已重新构建 `dist/`
- [ ] Documentation updated if needed / 文档已按需更新

### Steps / 步骤

1. Push to your fork / Push 到你的 fork
2. Open a Pull Request against `main` / 向 `main` 分支提交 PR
3. Fill in the PR template / 填写 PR 模板
4. Wait for review / 等待审查

---

## Questions? / 有问题？

Open a [Discussion](https://github.com/h1s97x/action-gh-social-graph/discussions) or file an Issue.

欢迎在 [Discussions](https://github.com/h1s97x/action-gh-social-graph/discussions) 提问或提交 Issue。

Thank you for your contribution! ❤️ / 再次感谢你的贡献！❤️
