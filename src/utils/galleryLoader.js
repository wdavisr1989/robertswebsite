/**
 * Gallery Loader Utility
 * Loads and parses gallery images from content/gallery folder
 */

/**
 * Load all gallery images from the content/gallery folder
 * @returns {Array} Array of gallery items sorted by order
 */
export const loadGalleryImages = () => {
  try {
    // Use Vite's import.meta.glob to load all markdown files from content/gallery
    const galleryFiles = import.meta.glob('/content/gallery/*.md', {
      eager: true,
      as: 'raw',
    });

    const galleryItems = Object.entries(galleryFiles).map(([path, content]) => {
      const parsed = parseMarkdownFrontmatter(content);
      return {
        ...parsed.data,
        path,
        content: parsed.content,
      };
    });

    // Filter: only published and featured items
    const filteredItems = galleryItems.filter(
      (item) => item.published !== false && item.featured !== false
    );

    // Sort by order (ascending), then by date (descending)
    const sortedItems = filteredItems.sort((a, b) => {
      if (a.order !== b.order) {
        return (a.order || 0) - (b.order || 0);
      }
      return new Date(b.date || 0) - new Date(a.date || 0);
    });

    return sortedItems;
  } catch (error) {
    console.error('Error loading gallery images:', error);
    return [];
  }
};

/**
 * Parse markdown frontmatter
 * @param {string} markdown - Markdown content with frontmatter
 * @returns {Object} Parsed frontmatter data and content
 */
export const parseMarkdownFrontmatter = (markdown) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: markdown };
  }

  const [, frontmatter, content] = match;
  const data = {};

  // Parse YAML-like frontmatter
  frontmatter.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Remove quotes
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      // Convert boolean strings
      if (value === 'true') value = true;
      if (value === 'false') value = false;

      // Convert numbers
      if (!isNaN(value) && value !== '') {
        value = Number(value);
      }

      data[key] = value;
    }
  });

  return { data, content: content.trim() };
};

/**
 * Get image URL from path
 * In production, this handles various image path formats
 * @param {string} imagePath - Image path from frontmatter
 * @returns {string} Processed image URL
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';

  // If it's already a full URL, return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Handle /assets/images/ paths
  if (imagePath.startsWith('/assets/images/')) {
    // Try to import from src/assets
    const filename = imagePath.split('/').pop();
    try {
      return new URL(`../../assets/${filename}`, import.meta.url).href;
    } catch (e) {
      return imagePath;
    }
  }

  return imagePath;
};
