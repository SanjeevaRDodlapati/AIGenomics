import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  const sortedPosts = posts.sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf());

  return rss({
    title: 'Dr. Sanjeeva Dodlapati - AI Research & Genomics',
    description: 'Insights and discoveries in AI, Machine Learning, Genomics, and Computational Biology',
    site: context.site || 'https://sanjeevardodlapati.github.io/AIGenomics/',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      author: post.data.author,
      link: `/blog/${post.id}/`,
      categories: post.data.tags || [],
    })),
    customData: `<language>en-us</language>`,
    stylesheet: '/rss/styles.xsl',
  });
}