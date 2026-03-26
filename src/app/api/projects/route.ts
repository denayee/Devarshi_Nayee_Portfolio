import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = { Accept: 'application/vnd.github.mercy-preview+json' };
  
  if (token) {
    headers.Authorization = `token ${token}`;
  }

  try {
    // 1. Fetch repos with Next.js Cache tagging (caches for 5 minutes)
    const githubApiUrl = process.env.GITHUB_API_URL || 'https://api.github.com/users/denayee/repos?sort=updated&per_page=12';
    const res = await fetch(githubApiUrl, {
      headers,
      next: { tags: ['github-projects'], revalidate: 300 } // fallback revalidation of 5 minutes
    });

    if (!res.ok) {
        if (res.status === 403) {
            return NextResponse.json({ error: 'GitHub API rate limit exceeded. Please add a GitHub Token to your environment variables.' }, { status: 503 });
        }
        return NextResponse.json({ error: 'GitHub API failed', status: res.status }, { status: res.status });
    }

    const data = await res.json();
    let filtered = data
      .filter((repo: any) => !repo.name.startsWith('.') && repo.description)
      .slice(0, 9);
      
    // 2. Hydrate language tags for each repo
    filtered = await Promise.all(
      filtered.map(async (repo: any) => {
        try {
          const langUrl = repo.languages_url || `https://api.github.com/repos/denayee/${repo.name}/languages`;
          const langRes = await fetch(langUrl, { 
             headers,
             next: { tags: ['github-projects'], revalidate: 300 }
          });
          
          if (langRes.ok) {
            const langData = await langRes.json();
            repo.all_languages = Object.keys(langData);
          }
        } catch (e) {
          console.error('Language fetch error:', e);
        }
        return repo;
      })
    );
    
    return NextResponse.json(filtered);

  } catch (error) {
    console.error('Failed to load GitHub data:', error);
    return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 });
  }
}
