# Security Policy / 安全策略

## Supported Versions / 支持的版本

We actively support the latest release and the `main` branch. Security fixes are backported to the latest release when feasible.

我们积极维护最新发布版本和 `main` 分支。可行时会将安全修复回移植到最新发布版本。

| Version | Supported / 是否支持 |
|---------|----------------------|
| latest  | ✅ |
| main    | ✅ |
| < 1.0.0 | ❌ |

## Reporting a Vulnerability / 报告安全漏洞

We take security seriously. Please **do not** open a public issue for security vulnerabilities.

我们非常重视安全问题。请**不要**为安全漏洞公开提交 Issue。

To report a vulnerability, please email the maintainer directly at:

请通过以下邮箱直接联系维护者报告漏洞：

**[h1s97x@outlook.com](mailto:h1s97x@outlook.com)**

Please include the following information in your report / 请在报告中包含以下信息：

- Affected version / 受影响的版本
- A description of the vulnerability / 漏洞描述
- Steps to reproduce / 复现步骤
- Impact and suggested mitigation (if known) / 影响范围及建议的缓解措施（如已知）

### Response Timeline / 响应时间线

- **Acknowledgment**: within 48 hours / 确认：48 小时内
- **Initial triage**: within 5 business days / 初步评估：5 个工作日内
- **Fix / mitigation**: as soon as possible, depending on severity / 修复/缓解：视严重程度尽快

### Disclosure / 披露

We follow responsible disclosure. After a fix is released, we will publish an advisory with details.

我们遵循负责任披露原则。修复发布后，将发布包含详细信息的安全公告。

## Security Considerations for Users / 用户注意事项

This action makes GitHub API calls using the provided token. To stay secure:

本 Action 使用所提供的 Token 调用 GitHub API。为确保安全，请注意：

- Use the minimal permissions required; prefer the auto-generated `GITHUB_TOKEN` over a personal token / 使用最小所需权限；优先使用自动生成的 `GITHUB_TOKEN` 而非个人 Token
- Treat the action output as untrusted data and sanitize it before rendering / 将 Action 输出视为不可信数据，渲染前进行清洗
- Keep your token secret and never commit it to the repository / 妥善保管 Token，切勿将其提交到仓库
- The action may expose follower/collaborator data; review privacy implications before enabling it on public repositories / Action 可能暴露关注者/协作者数据；在公开仓库启用前请评估隐私影响
