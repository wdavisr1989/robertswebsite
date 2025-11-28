const { generateFileList } = require('./src/crawler');
const { join } = require('path');
const fs = require('fs');

// Fallback if parse-md fails
let parseMD;
try {
  parseMD = require('parse-md').default || require('parse-md');
} catch (e) {
  console.warn('parse-md not available, using fallback');
  parseMD = (content) => {
    // Simple fallback parser
    const lines = content.split('\n');
    const metadataEnd = lines.findIndex((line, index) => index > 0 && line === '---');
    return {
      content: lines.slice(metadataEnd + 1).join('\n'),
      metadata: {}
    };
  };
}

const [blogs] = generateFileList(join(__dirname, 'content')).nodes;
module.exports = () => {
	const pages = [
		{
			url: '/',
			seo: {
				cover: '/assets/profile.jpg',
				title: 'CustomFades Photography - Professional Photography Portfolio',
				description: 'CustomFades specializes in creative portraits, lifestyle photography, and artistic compositions. Professional quality with creative vision.'
			}
		},
		{ url: '/contact/' },
		{ url: '/contact/success' }
	];

	// adding blogs list posts page
	pages.push({
		url: '/blogs/',
		data: blogs
	});

	// adding all blog pages
	pages.push(...blogs.edges.map(blog => {
		let data;
		if (blog.format === 'md') {
			const { content } = parseMD(fs.readFileSync(join('content', 'blog', blog.id), 'utf-8'));
			data = content;
		} else {
			data = fs.readFileSync(join('content', 'blog', blog.id), 'utf-8').replace(/---(.*(\r)?\n)*---/, '');
		}
		return {
			url: `/blog/${blog.id}`,
			seo: blog.details,
			data: {
				details: blog.details,
				content: data
			}
		};
	}));

	return pages;
};
