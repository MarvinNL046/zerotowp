import fs from 'fs';
import path from 'path';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

interface Topic {
  topic: string;
  category: string;
  targetKeyword: string;
  searchVolume: number;
  priority: number;
}

const STOP_WORDS = new Set([
  'in', 'the', 'a', 'an', 'of', 'for', 'to', 'and', 'is', 'vs',
  'best', 'guide', 'how', 'your', 'you', 'with', 'from', 'what',
  '2026', '2025', 'top', 'complete', 'ultimate',
]);

function getSignificantWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 1 && !STOP_WORDS.has(w))
    .map(w => w.replace(/s$/, '')); // basic stemming
}

function isDuplicate(keyword: string, existingSlugs: string[]): boolean {
  const topicWords = getSignificantWords(keyword);
  if (topicWords.length === 0) return false;

  for (const slug of existingSlugs) {
    const slugSegments = slug.split('-').filter(s => s.length > 1 && !STOP_WORDS.has(s));
    const matches = topicWords.filter(w =>
      slugSegments.some(s => s === w || s.startsWith(w) || w.startsWith(s))
    );
    const ratio = matches.length / topicWords.length;

    if (topicWords.length <= 2 && ratio === 1) return true;
    if (topicWords.length >= 3 && ratio >= 0.85) return true;
    if (topicWords.length >= 4 && matches.length >= 4 && ratio >= 0.5) return true;
  }
  return false;
}

export async function pickNextTopic(): Promise<Topic | null> {
  // Read topic queue
  const queuePath = path.join(process.cwd(), 'content', 'topic-queue.json');
  const queue: { topics: Topic[] } = JSON.parse(fs.readFileSync(queuePath, 'utf8'));

  // Get existing slugs from Convex
  const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const existingPosts = await client.query(api.posts.listPublished, {});
  const existingSlugs = existingPosts.map((p: { slug: string }) => p.slug);

  // Sort by priority (asc) then search volume (desc)
  const sorted = [...queue.topics].sort((a, b) =>
    a.priority !== b.priority ? a.priority - b.priority : b.searchVolume - a.searchVolume
  );

  // Find first non-duplicate topic
  for (const topic of sorted) {
    if (!isDuplicate(topic.targetKeyword, existingSlugs)) {
      return topic;
    }
  }

  return null; // All topics published
}
