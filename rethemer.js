const fs = require('fs');
const path = require('path');

const directories = [
  './src/components',
  './src/app/homepage/components',
];

const replacements = [
  // Borders
  { regex: /border-\[rgba\(255,?255,?255,?0\.0[1-9]\)\]/g, replacement: 'border-border' },
  { regex: /border-t border-\[rgba\(255,?255,?255,?0\.0[1-9]\)\]/g, replacement: 'border-t border-border' },
  { regex: /border-b border-\[rgba\(255,?255,?255,?0\.0[1-9]\)\]/g, replacement: 'border-b border-border' },
  { regex: /border-y border-\[rgba\(255,?255,?255,?0\.0[1-9]\)\]/g, replacement: 'border-y border-border' },
  // Backgrounds
  { regex: /bg-\[rgba\(255,?255,?255,?0\.0[1-4]\)\]/g, replacement: 'bg-surface' },
  { regex: /bg-\[rgba\(255,?255,?255,?0\.0[5-9]\)\]/g, replacement: 'bg-surface-hover' },
  { regex: /hover:bg-\[rgba\(255,?255,?255,?0\.0[1-9]\)\]/g, replacement: 'hover:bg-surface-hover' },
  // Specific dark bg
  { regex: /bg-\[rgba\(13,?11,?8,?0\.4\)\]/g, replacement: 'bg-transparent' }, // or use inline style for header
  { regex: /bg-\[rgba\(18,?14,?10,?0\.98\)\]/g, replacement: 'bg-card' },
  { regex: /bg-\[rgba\(7,?5,?3,?0\.82\)\]/g, replacement: 'bg-bg-secondary/90' },
  { regex: /bg-\[rgba\(10,?8,?6,?0\.78\)\]/g, replacement: 'bg-bg' },
  { regex: /bg-\[rgba\(10,?8,?6,?0\.6\)\]/g, replacement: 'bg-bg/60' },
];

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      
      for (const r of replacements) {
        content = content.replace(r.regex, r.replacement);
      }
      
      // Also strictly replace rgba(255,255,255, X) inside inline styles or scripts if needed
      // Actually, arbitrary replacements:
      content = content.replace(/'rgba\(255,\s*255,\s*255,\s*0\.\d+\)'/g, "'var(--color-border)'");
      content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.0[1-9]\)/g, "var(--color-border)");
      content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.1[0-9]?\)/g, "var(--color-surface-hover)");
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

for (const dir of directories) {
  walkDir(path.resolve(dir));
}
