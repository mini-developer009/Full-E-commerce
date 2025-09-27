export function getAvailableLocales(): string[] {
  if (process.env.NODE_ENV === 'development') {
    const fs = require('fs');
    const path = require('path');
    const files = fs.readdirSync('src/messages');
    return files
      .filter((file: string) => file.endsWith('.json'))
      .map((file: string) => path.basename(file, '.json'));
  }

  // Fallback for production (Vercel)
  return ['en', 'bn', 'hi'];
}
