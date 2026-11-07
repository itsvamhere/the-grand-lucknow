import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const rawDir = path.join(process.cwd(), 'raw_photos');
const files = fs.readdirSync(rawDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

for (const f of files) {
  const fullPath = path.join(rawDir, f);
  const { data, info } = await sharp(fullPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Let's check if the top 50 rows or bottom 50 rows or left 50 cols or right 50 cols are very uniform or white
  // Calculate average luminance and variance of top 10 rows vs middle
  function getBandStats(x1, y1, x2, y2) {
    let sumR = 0, sumG = 0, sumB = 0, count = 0;
    for (let y = y1; y < y2; y += 2) {
      for (let x = x1; x < x2; x += 2) {
        const idx = (y * width + x) * channels;
        sumR += data[idx];
        sumG += data[idx+1];
        sumB += data[idx+2];
        count++;
      }
    }
    const avgR = sumR / count, avgG = sumG / count, avgB = sumB / count;
    let varSum = 0;
    for (let y = y1; y < y2; y += 2) {
      for (let x = x1; x < x2; x += 2) {
        const idx = (y * width + x) * channels;
        const diff = (data[idx] - avgR) ** 2 + (data[idx+1] - avgG) ** 2 + (data[idx+2] - avgB) ** 2;
        varSum += diff;
      }
    }
    return { avg: [Math.round(avgR), Math.round(avgG), Math.round(avgB)], stdDev: Math.sqrt(varSum / count) };
  }

  const topStats = getBandStats(0, 0, width, Math.min(20, height));
  const bottomStats = getBandStats(0, Math.max(0, height - 20), width, height);
  const leftStats = getBandStats(0, 0, Math.min(20, width), height);
  const rightStats = getBandStats(Math.max(0, width - 20), 0, width, height);

  // If variance is low (< 10) and average is high (> 230), it's a white border!
  const hasWhiteBorder = [
    topStats.avg[0] > 230 && topStats.stdDev < 15 ? 'TOP' : null,
    bottomStats.avg[0] > 230 && bottomStats.stdDev < 15 ? 'BOTTOM' : null,
    leftStats.avg[0] > 230 && leftStats.stdDev < 15 ? 'LEFT' : null,
    rightStats.avg[0] > 230 && rightStats.stdDev < 15 ? 'RIGHT' : null,
  ].filter(Boolean);

  if (hasWhiteBorder.length > 0) {
    console.log(`[BORDER DETECTED] ${f}: ${hasWhiteBorder.join(', ')}`);
  } else {
    // Also check if any side has low stdDev (e.g. solid color border of any kind)
    const solidEdges = [
      topStats.stdDev < 5 ? `TOP(avg=${topStats.avg})` : null,
      bottomStats.stdDev < 5 ? `BOTTOM(avg=${bottomStats.avg})` : null,
      leftStats.stdDev < 5 ? `LEFT(avg=${leftStats.avg})` : null,
      rightStats.stdDev < 5 ? `RIGHT(avg=${rightStats.avg})` : null,
    ].filter(Boolean);
    if (solidEdges.length > 0) {
      console.log(`[SOLID EDGE DETECTED] ${f}: ${solidEdges.join(', ')}`);
    }
  }
}
