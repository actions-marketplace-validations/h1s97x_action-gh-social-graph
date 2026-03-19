import * as core from '@actions/core';
import * as github from '@actions/github';
import { createSocialGraphAnalyzer } from './lib/github/analyzer';
import { generateMarkdownReport } from './reporter';

async function run(): Promise<void> {
  try {
    const token = core.getInput('github-token', { required: true });
    const usernameInput = core.getInput('username');
    const maxFollowers = parseInt(core.getInput('max-followers') || '50');
    const maxRepos = parseInt(core.getInput('max-repos') || '15');
    const commentOnPR = core.getInput('comment-on-pr') === 'true';

    // 确定目标用户名：优先用输入，其次取 PR 作者，最后取事件触发者
    let targetUsername = usernameInput.trim();
    if (!targetUsername) {
      const ctx = github.context;
      if (ctx.payload.pull_request) {
        targetUsername = (ctx.payload.pull_request.user as { login: string }).login;
      } else if (ctx.payload.sender) {
        targetUsername = (ctx.payload.sender as unknown as { login: string }).login;
      }
    }

    if (!targetUsername) {
      core.setFailed('Could not determine the target username. Please specify it via the `username` input.');
      return;
    }

    core.info(`🌌 Analyzing social graph for @${targetUsername}...`);

    const analyzer = createSocialGraphAnalyzer(token);
    const result = await analyzer.analyzeUser(targetUsername, { maxFollowers, maxRepos });

    core.info(`✅ Analysis complete: ${result.graph.stats.totalNodes} nodes, ${result.graph.stats.totalLinks} links`);

    const report = generateMarkdownReport(targetUsername, result);

    // 设置 outputs
    core.setOutput('report', report);
    core.setOutput('total-nodes', String(result.graph.stats.totalNodes));
    core.setOutput('total-links', String(result.graph.stats.totalLinks));
    core.setOutput('user-nodes', String(result.graph.stats.userNodes));
    core.setOutput('repo-nodes', String(result.graph.stats.repoNodes));
    core.setOutput('recommendations', JSON.stringify(result.recommendations.map((r) => r.user.login)));

    // 写入 Job Summary
    await core.summary.addRaw(report).write();

    // PR 评论
    if (commentOnPR && github.context.payload.pull_request) {
      const octokit = github.getOctokit(token);
      const { owner, repo } = github.context.repo;
      const prNumber = github.context.payload.pull_request.number;

      const { data: comments } = await octokit.rest.issues.listComments({
        owner,
        repo,
        issue_number: prNumber,
      });

      const existing = comments.find(
        (c: { user?: { type?: string } | null; body?: string | null }) =>
          c.user?.type === 'Bot' && c.body?.includes('GitHub Social Graph')
      );

      if (existing) {
        await octokit.rest.issues.updateComment({ owner, repo, comment_id: existing.id, body: report });
        core.info('✅ PR comment updated');
      } else {
        await octokit.rest.issues.createComment({ owner, repo, issue_number: prNumber, body: report });
        core.info('✅ PR comment created');
      }
    }
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : String(error));
  }
}

run();
