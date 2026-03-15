import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = path.join(__dirname, "..", "public", "screenshots");
const BLOG_IMAGES_DIR = path.join(__dirname, "..", "public", "images", "blog");

const MAX_WIDTH = 1280;
const QUALITY = 82;

async function optimizeDirectory(dir, label) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".png"));
  console.log(`\n${label}: ${files.length} PNG files to optimize`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, file.replace(".png", ".webp"));
    const inputSize = fs.statSync(inputPath).size;
    totalBefore += inputSize;

    await sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const outputSize = fs.statSync(outputPath).size;
    totalAfter += outputSize;

    const savings = Math.round((1 - outputSize / inputSize) * 100);
    console.log(
      `  ${file} → ${file.replace(".png", ".webp")} (${Math.round(inputSize / 1024)}KB → ${Math.round(outputSize / 1024)}KB, -${savings}%)`
    );

    // Remove original PNG
    fs.unlinkSync(inputPath);
  }

  console.log(
    `  Total: ${Math.round(totalBefore / 1024)}KB → ${Math.round(totalAfter / 1024)}KB (-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`
  );
}

async function main() {
  console.log("Optimizing images with Sharp...");
  console.log(`Max width: ${MAX_WIDTH}px, WebP quality: ${QUALITY}`);

  await optimizeDirectory(SCREENSHOTS_DIR, "Screenshots");
  await optimizeDirectory(BLOG_IMAGES_DIR, "Blog featured images");

  console.log("\nDone! All PNGs converted to WebP and originals removed.");
}

main().catch(console.error);
