import {
  GitHubUser,
  GitHubRepository,
  GitHubContributor,
  GitHubFollower,
} from './types';

const GITHUB_API_BASE = 'https://api.github.com';

export class GitHubAPIError extends Error {
  constructor(
    message: string,
    public status: number,
    public rateLimit?: {
      limit: number;
      remaining: number;
      reset: Date;
    }
  ) {
    super(message);
    this.name = 'GitHubAPIError';
  }
}

export class GitHubAPIService {
  private token?: string;
  private baseUrl: string;

  constructor(token?: string) {
    this.token = token;
    this.baseUrl = GITHUB_API_BASE;
  }

  private async fetch<T>(endpoint: string): Promise<T> {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'GitHub-Social-Graph-Action',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, { headers });

    const rateLimit = {
      limit: parseInt(response.headers.get('X-RateLimit-Limit') || '0'),
      remaining: parseInt(response.headers.get('X-RateLimit-Remaining') || '0'),
      reset: new Date(
        parseInt(response.headers.get('X-RateLimit-Reset') || '0') * 1000
      ),
    };

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new GitHubAPIError(
        (error as { message?: string }).message || `GitHub API error: ${response.status}`,
        response.status,
        rateLimit
      );
    }

    return response.json() as Promise<T>;
  }

  async getUser(username: string): Promise<GitHubUser> {
    return this.fetch<GitHubUser>(`/users/${username}`);
  }

  async getFollowers(username: string, page = 1, perPage = 100): Promise<GitHubFollower[]> {
    return this.fetch<GitHubFollower[]>(
      `/users/${username}/followers?page=${page}&per_page=${perPage}`
    );
  }

  async getFollowing(username: string, page = 1, perPage = 100): Promise<GitHubFollower[]> {
    return this.fetch<GitHubFollower[]>(
      `/users/${username}/following?page=${page}&per_page=${perPage}`
    );
  }

  async getRepositories(
    username: string,
    page = 1,
    perPage = 100,
    type: 'all' | 'owner' | 'member' = 'owner'
  ): Promise<GitHubRepository[]> {
    return this.fetch<GitHubRepository[]>(
      `/users/${username}/repos?page=${page}&per_page=${perPage}&type=${type}&sort=updated`
    );
  }

  async getContributors(owner: string, repo: string, page = 1, perPage = 100): Promise<GitHubContributor[]> {
    return this.fetch<GitHubContributor[]>(
      `/repos/${owner}/${repo}/contributors?page=${page}&per_page=${perPage}`
    );
  }

  async getStargazers(
    owner: string,
    repo: string,
    page = 1,
    perPage = 100
  ): Promise<Array<{ user: GitHubUser; starred_at: string }>> {
    return this.fetch(`/repos/${owner}/${repo}/stargazers?page=${page}&per_page=${perPage}`);
  }

  async getAllFollowers(username: string, maxPages = 5): Promise<GitHubFollower[]> {
    const all: GitHubFollower[] = [];
    for (let page = 1; page <= maxPages; page++) {
      const batch = await this.getFollowers(username, page);
      all.push(...batch);
      if (batch.length < 100) break;
    }
    return all;
  }

  async getAllFollowing(username: string, maxPages = 5): Promise<GitHubFollower[]> {
    const all: GitHubFollower[] = [];
    for (let page = 1; page <= maxPages; page++) {
      const batch = await this.getFollowing(username, page);
      all.push(...batch);
      if (batch.length < 100) break;
    }
    return all;
  }

  async getAllRepositories(username: string, maxPages = 5): Promise<GitHubRepository[]> {
    const all: GitHubRepository[] = [];
    for (let page = 1; page <= maxPages; page++) {
      const batch = await this.getRepositories(username, page);
      all.push(...batch);
      if (batch.length < 100) break;
    }
    return all;
  }
}

export function createGitHubAPI(token?: string): GitHubAPIService {
  return new GitHubAPIService(token ?? process.env['GITHUB_TOKEN']);
}
