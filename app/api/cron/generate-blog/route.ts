import { NextRequest, NextResponse } from 'next/server';
import { generateBlogPost } from '@/lib/pipeline/content-generator';
import { generateBlogImage } from '@/lib/pipeline/image-generator';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 1. Generate blog post content via AI
    const post = await generateBlogPost();
    if (!post) {
      return NextResponse.json({ message: 'No new topics available' }, { status: 200 });
    }

    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    // 2. Generate header image
    const image = await generateBlogImage(post.title, post.category, post.slug);

    let featuredImage: Id<'_storage'> | undefined;

    if (image) {
      try {
        // 3. Upload image to Convex storage
        const uploadUrl: string = await client.mutation(api.media.generateUploadUrl, {});
        const imageBuffer = Buffer.from(image.base64, 'base64');

        const uploadRes = await fetch(uploadUrl, {
          method: 'POST',
          headers: { 'Content-Type': image.mimeType },
          body: imageBuffer,
        });

        if (uploadRes.ok) {
          const { storageId } = (await uploadRes.json()) as { storageId: Id<'_storage'> };
          featuredImage = storageId;

          // 4. Save media record in Convex
          await client.mutation(api.media.saveMedia, {
            storageId,
            filename: `${post.slug}-header.${image.mimeType.split('/')[1] || 'webp'}`,
            mimeType: image.mimeType,
            alt: post.title,
          });
        }
      } catch (imgErr) {
        console.error('Image upload failed (continuing without image):', (imgErr as Error).message);
      }
    }

    // 5. Create post in Convex
    await client.mutation(api.posts.create, {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags,
      status: 'published',
      author: 'pipeline',
      authorName: 'ZeroToWP Team',
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      ...(featuredImage ? { featuredImage } : {}),
    });

    return NextResponse.json({
      success: true,
      title: post.title,
      slug: post.slug,
      category: post.category,
      hasImage: !!featuredImage,
    });
  } catch (error) {
    console.error('Blog generation failed:', error);
    return NextResponse.json(
      { error: 'Generation failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}
