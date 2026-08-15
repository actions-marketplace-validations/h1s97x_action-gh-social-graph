import { describe, it, expect } from 'vitest';
import { generateMarkdownReport } from '../src/reporter';
import { AnalysisResult } from '../src/lib/github/types';

// ── 构造一个最小可用的 AnalysisResult ────────────────────

function makeResult(overrides: Partial<AnalysisResult> = {}): AnalysisResult {
  return {
    graph: {
      nodes: [
        {
          id: 'alice',
          label: 'Alice',
          type: 'user',
          data: {} as never,
          connections: 2,
          color: '#00d4ff',
        },
        {
          id: 'repo:alice/repo-a',
          label: 'repo-a',
          type: 'repo',
          data: {} as never,
          connections: 1,
          color: '#48bb78',
        },
      ],
      links: [{ source: 'alice', target: 'repo:alice/repo-a', type: 'stars', weight: 1 }],
      stats: {
        totalNodes: 2,
        totalLinks: 1,
        userNodes: 1,
        repoNodes: 1,
      },
    },
    recommendations: [
      {
        user: {
          login: 'carol',
          html_url: 'https://github.com/carol',
          avatar_url: 'https://avatars.githubusercontent.com/carol',
        } as never,
        score: 17,
        reasons: ['在 alice/repo-a 中有 17 次贡献'],
      },
    ],
    insights: {
      topCollaborators: [
        {
          user: {
            login: 'bob',
            avatar_url: 'https://avatars.githubusercontent.com/bob',
            html_url: 'https://github.com/bob',
          } as never,
          collaborations: 12,
        },
      ],
      topStarredRepos: [
        {
          repo: {
            full_name: 'alice/repo-a',
            html_url: 'https://github.com/alice/repo-a',
            description: 'a demo repo',
            stargazers_count: 100,
          } as never,
          stargazers: 100,
        },
      ],
      languageDistribution: { TypeScript: 2, JavaScript: 1 },
    },
    ...overrides,
  };
}

describe('generateMarkdownReport', () => {
  it('应包含标题与用户名', () => {
    const report = generateMarkdownReport('alice', makeResult());
    expect(report).toContain('GitHub Social Graph');
    expect(report).toContain('@alice');
  });

  it('应输出概览统计表格', () => {
    const report = generateMarkdownReport('alice', makeResult());
    expect(report).toContain('| 👥 Developers / 开发者节点 | 1 |');
    expect(report).toContain('| 📦 Repositories / 仓库节点 | 1 |');
    expect(report).toContain('| 🔗 Connections / 关系连接 | 1 |');
    expect(report).toContain('| 🌐 Total Nodes / 总节点数 | 2 |');
  });

  it('应输出编程语言分布', () => {
    const report = generateMarkdownReport('alice', makeResult());
    expect(report).toContain('Languages / 编程语言分布');
    expect(report).toContain('`TypeScript` ×2');
    expect(report).toContain('`JavaScript` ×1');
  });

  it('应输出顶级协作者与推荐开发者', () => {
    const report = generateMarkdownReport('alice', makeResult());
    expect(report).toContain('Top Collaborators');
    expect(report).toContain('@bob');
    expect(report).toContain('Recommended Developers');
    expect(report).toContain('@carol');
  });

  it('应输出最受欢迎的仓库', () => {
    const report = generateMarkdownReport('alice', makeResult());
    expect(report).toContain('Top Repositories');
    expect(report).toContain('alice/repo-a');
    expect(report).toContain('⭐ 100');
  });

  it('无推荐/协作者/语言数据时对应区块不输出', () => {
    const empty = makeResult({
      recommendations: [],
      insights: {
        topCollaborators: [],
        topStarredRepos: [],
        languageDistribution: {},
      },
    });
    const report = generateMarkdownReport('alice', empty);
    expect(report).not.toContain('Recommended Developers');
    expect(report).not.toContain('Top Collaborators');
    expect(report).not.toContain('Top Repositories');
    expect(report).not.toContain('Languages / 编程语言分布');
  });

  it('应输出 rate limit 信息', () => {
    const result = makeResult({
      rateLimit: { limit: 5000, remaining: 4000, reset: new Date('2026-01-01T00:00:00Z') },
    });
    const report = generateMarkdownReport('alice', result);
    expect(report).toContain('4000/5000');
    expect(report).toContain('80%');
  });
});
