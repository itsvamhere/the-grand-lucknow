import fs from 'fs';

const lines = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.system_generated/logs/transcript.jsonl', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('it doesn\'t fade completely') || lines[i].includes('fade animation')) {
    console.log(`Line ${i}:`, lines[i]);
  }
}
