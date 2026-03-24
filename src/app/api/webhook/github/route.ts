import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const secret = searchParams.get('secret');
    const configuredSecret = process.env.GITHUB_WEBHOOK_SECRET;
    
    // Add optional validation so rogue actors can't repeatedly wipe your cache
    if (configuredSecret && secret !== configuredSecret) {
      return NextResponse.json({ message: 'Invalid or missing secret' }, { status: 401 });
    }

    // Tells Next.js to purge the edge cache globally for all internal API requests sporting this tag
    revalidateTag('github-projects');
    
    return NextResponse.json({ revalidated: true, message: 'Cache successfully purged. Next visitor will trigger a fresh GitHub fetch.' });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ message: 'Error revalidating cache' }, { status: 500 });
  }
}
