// lib/pipeline/image-generator.ts

const CATEGORY_STYLES: Record<string, string> = {
  tutorials: 'clean desk setup with laptop showing WordPress dashboard, modern workspace, soft lighting',
  hosting: 'server room with blue lighting, modern data center, cloud computing concept',
  plugins: 'puzzle pieces connecting together, WordPress plugin icons, modular design concept',
  themes: 'beautiful website designs on multiple screens, modern web design showcase',
  'beginners-guide': 'person starting their journey, laptop with blank website, fresh start concept',
};

export async function generateBlogImage(
  title: string,
  category: string,
  slug: string
): Promise<{ base64: string; mimeType: string } | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log('GEMINI_API_KEY not set, skipping image generation');
    return null;
  }

  const style = CATEGORY_STYLES[category] || CATEGORY_STYLES.tutorials;

  const prompt = `Professional blog header image for a WordPress tutorial website. Topic: "${title}". Style: ${style}. Clean, modern, professional. No text, no watermarks, no logos. Landscape 16:9 ratio. Photorealistic with slight tech/digital aesthetic.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
        }),
        signal: AbortSignal.timeout(30_000),
      }
    );

    if (!res.ok) {
      console.error(`Gemini API error: ${res.status}`);
      return null;
    }

    const data = await res.json();
    for (const candidate of data.candidates || []) {
      for (const part of candidate.content?.parts || []) {
        if (part.inlineData) {
          return {
            base64: part.inlineData.data,
            mimeType: part.inlineData.mimeType || 'image/webp',
          };
        }
      }
    }
    return null;
  } catch (err) {
    console.error('Image generation failed:', (err as Error).message);
    return null;
  }
}
