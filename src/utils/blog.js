// Utility function to calculate reading time
export function calculateReadingTime(content) {
  // Average reading speed is 200 words per minute
  const wordsPerMinute = 200;
  
  // Remove markdown syntax and HTML tags for accurate word count
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[#*_~\[\]()]/g, '') // Remove markdown syntax
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  const wordCount = cleanContent.split(' ').filter(word => word.length > 0).length;
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  
  return {
    wordCount,
    readingTime: readingTimeMinutes,
    readingTimeText: `${readingTimeMinutes} min read`
  };
}

// Format date consistently
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

// Create excerpt from content
export function createExcerpt(content, maxLength = 160) {
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '[code]') // Replace code blocks
    .replace(/`[^`]*`/g, '[code]') // Replace inline code
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[#*_~\[\]()]/g, '') // Remove markdown syntax
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  if (cleanContent.length <= maxLength) return cleanContent;
  
  // Find the last complete sentence within the limit
  const excerpt = cleanContent.substring(0, maxLength);
  const lastPeriod = excerpt.lastIndexOf('.');
  const lastQuestion = excerpt.lastIndexOf('?');
  const lastExclamation = excerpt.lastIndexOf('!');
  
  const lastSentenceEnd = Math.max(lastPeriod, lastQuestion, lastExclamation);
  
  if (lastSentenceEnd > maxLength * 0.5) {
    return cleanContent.substring(0, lastSentenceEnd + 1);
  }
  
  // If no good sentence break, just truncate at word boundary
  const lastSpace = excerpt.lastIndexOf(' ');
  return cleanContent.substring(0, lastSpace > 0 ? lastSpace : maxLength) + '...';
}