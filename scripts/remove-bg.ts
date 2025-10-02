import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';
import path from 'path';

async function processImage(inputPath: string, outputPath: string) {
  console.log(`Processing ${inputPath}...`);
  
  const imageBuffer = fs.readFileSync(inputPath);
  const blob = new Blob([imageBuffer]);
  
  const result = await removeBackground(blob);
  const buffer = Buffer.from(await result.arrayBuffer());
  
  fs.writeFileSync(outputPath, buffer);
  console.log(`Saved to ${outputPath}`);
}

async function main() {
  const images = [
    {
      input: 'attached_assets/2025-10-03 06.41.12_1759441906042.jpg',
      output: 'attached_assets/hoodie-black-nobg.png'
    },
    {
      input: 'attached_assets/2025-10-03 06.41.20_1759441909342.jpg',
      output: 'attached_assets/hoodie-white-nobg.png'
    }
  ];

  for (const img of images) {
    await processImage(img.input, img.output);
  }
  
  console.log('All images processed successfully!');
}

main().catch(console.error);
