'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useAppSelector } from '@/store/store';
import { Github, Star, GitFork, BookOpen, Users, ExternalLink, RefreshCw } from 'lucide-react';

const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then((mod) => mod.GitHubCalendar),
  {
    ssr: false,
    loading: () => <div className="h-32 w-full bg-black/5 dark:bg-white/5 animate-pulse rounded-xl" />,
  }
);

const githubTheme = {
  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#0f172a', '#0d324d', '#006699', '#00b4d8', '#00f2fe'],
};

interface GitHubUser {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  bio: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

const fetchGitHubUserData = async (): Promise<GitHubUser> => {
  const res = await fetch('https://api.github.com/users/arefinMilen');
  if (!res.ok) throw new Error('Failed to fetch GitHub user data');
  return res.json();
};

const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  const res = await fetch('https://api.github.com/users/arefinMilen/repos?sort=updated&per_page=4');
  if (!res.ok) throw new Error('Failed to fetch GitHub repositories');
  return res.json();
};

export const GithubStatsSection: React.FC = () => {
  const theme = useAppSelector((state) => state.ui.theme);
  const isDark = theme === 'dark';

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ['githubUser'],
    queryFn: fetchGitHubUserData,
  });

  const {
    data: repos,
    isLoading: isReposLoading,
  } = useQuery({
    queryKey: ['githubRepos'],
    queryFn: fetchGitHubRepos,
  });

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="glass-panel rounded-3xl p-8 border border-black/10 dark:border-white/10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 border-b border-black/10 dark:border-white/10 pb-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-brand-cyan shadow-md">
                <Github className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-300 uppercase tracking-wider font-semibold">
                  TANSTACK QUERY LIVE API DATA
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">GitHub Activity & Repositories</h3>
              </div>
            </div>

            <a
              href="https://github.com/arefinMilen"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 text-xs font-mono text-slate-800 dark:text-slate-200 flex items-center gap-2 transition-colors shadow-sm"
            >
              <span>@arefinMilen on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-brand-cyan" />
            </a>
          </div>

          {/* Stats Bar */}
          {isUserLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-black/5 dark:bg-white/5 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : isUserError ? (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-300 text-xs flex items-center justify-between mb-8">
              <span>Could not fetch live GitHub stats right now.</span>
              <button onClick={() => refetchUser()} className="flex items-center gap-1 font-bold">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-black/10 dark:border-white/5 text-center shadow-sm">
                <div className="text-2xl font-extrabold text-gradient-cyan">{user?.public_repos ?? 0}</div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-1 flex items-center justify-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Public Repos</span>
                </div>
              </div>

              <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-black/10 dark:border-white/5 text-center shadow-sm">
                <div className="text-2xl font-extrabold text-gradient-violet">{user?.followers ?? 0}</div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-1 flex items-center justify-center gap-1">
                  <Users className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Followers</span>
                </div>
              </div>

              <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-black/10 dark:border-white/5 text-center shadow-sm">
                <div className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-300">100%</div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-1 flex items-center justify-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  <span>Open Source</span>
                </div>
              </div>

              <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-black/10 dark:border-white/5 text-center shadow-sm">
                <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">Active</div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-1 flex items-center justify-center gap-1">
                  <Github className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Commits 2026</span>
                </div>
              </div>
            </div>
          )}

          {/* GitHub Contribution Graph */}
          <div className="mb-10 p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col items-center justify-center overflow-hidden shadow-sm">
            <div className="flex items-center justify-between w-full mb-4">
              <h4 className="text-xs font-mono text-cyan-600 dark:text-cyan-300 uppercase tracking-widest flex items-center gap-2 font-semibold">
                <Github className="w-4 h-4 text-brand-cyan" />
                <span>GitHub Contribution Calendar</span>
              </h4>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
                Yearly Contributions for @arefinMilen
              </span>
            </div>
            <div className="w-full flex justify-center overflow-x-auto py-2 text-slate-800 dark:text-slate-300 text-xs">
              <GitHubCalendar
                username="arefinMilen"
                theme={githubTheme}
                colorScheme={isDark ? 'dark' : 'light'}
                fontSize={12}
                blockSize={13}
                blockMargin={4}
              />
            </div>
          </div>

          {/* Repositories Cards Grid */}
          <div>
            <h4 className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 font-semibold">
              Recently Updated Repositories
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isReposLoading
                ? [1, 2, 3, 4].map((i) => <div key={i} className="h-28 bg-black/5 dark:bg-white/5 rounded-2xl animate-pulse" />)
                : repos?.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card rounded-2xl p-5 border border-black/10 dark:border-white/10 hover:border-brand-cyan/40 transition-all flex flex-col justify-between group shadow-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-brand-cyan transition-colors flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-brand-cyan" />
                            <span>{repo.name}</span>
                          </h5>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                          {repo.description || 'No description provided.'}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pt-3 border-t border-black/5 dark:border-white/5">
                        <span className="px-2.5 py-0.5 rounded bg-black/5 dark:bg-white/5 text-cyan-700 dark:text-cyan-300 border border-black/5 dark:border-white/5">
                          {repo.language || 'TypeScript'}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-500" />
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="w-3.5 h-3.5 text-purple-500" />
                            {repo.forks_count}
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
