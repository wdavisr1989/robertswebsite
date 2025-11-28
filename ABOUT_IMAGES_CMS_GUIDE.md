# About Me Images - CMS Management Guide

## Overview

The About Me section profile images are now fully manageable through the Netlify CMS admin panel. You can update both the foreground (main portrait) and background (logo/pattern) images independently.

## How to Access

1. Navigate to `/admin` on your website
2. Login with your credentials
3. Click on **"Site Settings"** → **"Homepage"**
4. Scroll to the About Me image fields

## Image Configuration

### Foreground Image

- **Field Name**: "About Me Foreground Image"
- **Purpose**: Main profile/portrait photo (appears in front)
- **Current**: Robert Davis profile photo
- **Recommended Size**: 800x1000px to 1200x1500px
- **Format**: JPG or PNG
- **Aspect Ratio**: Portrait orientation works best

### Background Image

- **Field Name**: "About Me Background Image"
- **Purpose**: Optional logo, pattern, or branding element (appears behind)
- **Current**: CustomFades logo (black)
- **Recommended**: Vector (SVG) for logos, or large images for patterns
- **Optional**: Can be left empty for solid color background

## How to Update Images

### Method 1: Via CMS (Recommended)

1. Go to `/admin` → **Site Settings** → **Homepage**
2. Find "About Me Foreground Image"
3. Click **"Choose an image"**
4. Upload new image or select from media library
5. Repeat for "About Me Background Image" if needed
6. Click **"Publish"** to save changes

### Method 2: Manual File Edit

Edit `content/settings/homepage.json`:

```json
{
  "about_image_foreground": "../../src/assets/robert-davis-profile.jpg",
  "about_image_background": "../../src/assets/icons/logo-black.svg"
}
```

## Image Display

The images are layered as follows:

1. **Background layer**: Logo/pattern (subtle, behind everything)
2. **Foreground layer**: Portrait/profile photo (main focus)

Both images are displayed within a container that:

- Has rounded corners
- Scales slightly on hover
- Maintains aspect ratio
- Is fully responsive

## Image Specifications

### Foreground Image (Portrait)

- **Ideal Size**: 1000x1200px
- **Min Size**: 800x1000px
- **Max File Size**: Under 500KB
- **Format**: JPG (photos), PNG (if transparency needed)
- **Orientation**: Portrait (vertical)
- **Subject**: Should be centered, good lighting

### Background Image (Logo/Pattern)

- **Size**: Flexible (vector preferred)
- **Format**: SVG (logos), JPG/PNG (patterns)
- **Style**: Should complement, not compete with foreground
- **Opacity**: Will show through/behind main image
- **Colors**: Works best with brand colors

## Best Practices

### For Foreground Images

✅ Use high-quality, well-lit photos
✅ Center the subject in the frame
✅ Use professional headshots or action shots
✅ Ensure good contrast with background
✅ Compress images before uploading

### For Background Images

✅ Use subtle patterns or semi-transparent logos
✅ Keep colors consistent with brand
✅ SVG format for logos (scales perfectly)
✅ Ensure it doesn't distract from foreground
✅ Test visibility on different screen sizes

## Image Positioning

The CSS automatically handles:

- **Foreground**: `background-size: cover` - fills container, maintains ratio
- **Background**: `background-size: contain` - fits within container
- **Both**: Centered positioning
- **Hover**: Slight zoom effect (1.05x scale)

## Troubleshooting

### Image Not Showing

1. Check file path is correct in `homepage.json`
2. Verify image exists in specified location
3. Clear browser cache (Ctrl+Shift+R)
4. Check browser console for errors

### Wrong Image Appearing

1. Ensure CMS changes were published
2. Refresh the page
3. Check the file path matches uploaded location

### Image Quality Issues

1. Upload higher resolution image
2. Ensure image is at least 800px wide
3. Use JPG for photos, SVG for logos
4. Compress large files before uploading

### Background Not Visible

1. Check if background image is set
2. Verify foreground image isn't completely opaque
3. Try using a lighter/darker background
4. Adjust opacity if using custom CSS

## Current Configuration

**Default Setup:**

- **Foreground**: `src/assets/robert-davis-profile.jpg`
- **Background**: `src/assets/icons/logo-black.svg`

**How it Works:**

1. Homepage loads settings from `homepage.json`
2. React component reads image paths
3. Images are applied via inline styles
4. Fallback to static imports if CMS unavailable

## Technical Details

### File Structure

```
content/settings/
  └── homepage.json          # Contains image paths

src/assets/
  ├── robert-davis-profile.jpg   # Default foreground
  └── icons/
      └── logo-black.svg         # Default background
```

### Implementation

The About section uses dynamic background-image styling:

```javascript
style={`background-image:
  url(${aboutImages.foreground}),
  url(${aboutImages.background})`}
```

### CSS Properties

```css
background-size: cover, contain;
background-position: center, center;
background-repeat: no-repeat, no-repeat;
```

## Examples

### Professional Headshot

```json
{
  "about_image_foreground": "../../src/assets/headshot-professional.jpg",
  "about_image_background": "../../src/assets/icons/logo-watermark.svg"
}
```

### Action Shot with Pattern

```json
{
  "about_image_foreground": "../../src/assets/barber-at-work.jpg",
  "about_image_background": "../../src/assets/patterns/clippers-pattern.png"
}
```

### Portrait Only (No Background)

```json
{
  "about_image_foreground": "../../src/assets/profile.jpg",
  "about_image_background": ""
}
```

## Need Help?

- Verify files are published in CMS
- Check browser console for errors
- Ensure image paths are correct
- Test with different image formats
- Contact developer if issues persist

---

**Quick Tip**: Always preview changes before publishing and test on mobile devices to ensure images look good at all screen sizes!
