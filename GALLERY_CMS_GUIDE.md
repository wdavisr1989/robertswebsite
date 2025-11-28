# Wall of Fades Gallery - CMS Management Guide

## Overview

The Wall of Fades gallery section is now fully manageable through the Netlify CMS admin panel. You can add, edit, remove, and reorder gallery images without touching any code.

## How to Access

1. Navigate to `/admin` on your website
2. Login with your credentials
3. Click on **"Wall of Fades"** in the sidebar

## Managing Gallery Images

### Adding a New Image

1. Click **"New Gallery Image"** button
2. Fill in the fields:
   - **Title**: Descriptive name (e.g., "Client Haircut 15")
   - **Image**: Click to upload a new photo
   - **Caption**: Optional description (e.g., "Fresh fade with clean lineup")
   - **Category**: Select from:
     - Haircuts
     - Beards
     - Styles
     - Other
   - **Featured on Homepage**: Toggle ON to show in gallery (default: ON)
   - **Display Order**: Number for sorting (1, 2, 3... lower numbers appear first)
   - **Published**: Toggle ON to make visible (default: ON)
   - **Date Added**: When this image was added
3. Click **"Publish"** to save

### Editing an Existing Image

1. Click on the image you want to edit from the list
2. Update any fields (title, caption, order, etc.)
3. Click **"Publish"** to save changes

### Reordering Gallery Images

To change the display order:

1. Edit each image
2. Change the **Display Order** number
3. Lower numbers appear first (e.g., order 1 shows before order 5)
4. Save your changes

### Hiding an Image

To temporarily hide an image without deleting:

1. Edit the image
2. Toggle **"Published"** to OFF or **"Featured on Homepage"** to OFF
3. Save - the image won't appear on the homepage

### Deleting an Image

1. Edit the image you want to remove
2. Click **"Delete"** button at the top
3. Confirm deletion

## Field Descriptions

| Field                    | Purpose                     | Required |
| ------------------------ | --------------------------- | -------- |
| **Title**                | Internal name for the image | Yes      |
| **Image**                | The actual photo to display | Yes      |
| **Caption**              | Hover text/description      | No       |
| **Category**             | Type of service (filtering) | Yes      |
| **Featured on Homepage** | Show in Wall of Fades       | Yes      |
| **Display Order**        | Position in gallery (1-100) | Yes      |
| **Published**            | Visible on website          | Yes      |
| **Date Added**           | For tracking/sorting        | Yes      |

## Best Practices

### Image Requirements

- **Format**: JPG or PNG recommended
- **Size**: Optimally 800x800px to 1200x1200px
- **File Size**: Under 500KB for best performance
- **Orientation**: Square or portrait works best

### Naming Convention

- Use descriptive titles: "Client Haircut 15" not "IMG_1234"
- Add helpful captions: "Low fade with lineup and beard trim"

### Display Order Tips

- Use increments of 10: 10, 20, 30... (easier to insert new images between)
- Or simple sequence: 1, 2, 3, 4...
- Want to feature a specific cut? Give it order 1

### Categories Guide

- **Haircuts**: Standard cuts, fades, tapers
- **Beards**: Beard trims, lineups, beard styling
- **Styles**: Creative designs, waves, special styles
- **Other**: Anything that doesn't fit above

## Gallery Display Logic

The gallery automatically:

- ✅ Shows only images marked as **Published** AND **Featured**
- ✅ Sorts by **Display Order** (ascending)
- ✅ Falls back to **Date** if orders are the same
- ✅ Displays images in a responsive grid
- ✅ Includes captions as hover tooltips

## Current Gallery

Your gallery currently displays 10 images. To maintain the clean grid look:

- **Ideal**: 6, 8, 9, 10, or 12 images
- **Avoid**: Odd numbers like 5, 7, 11 (unless intentional)

## Troubleshooting

### Image Not Showing

1. Check **Published** is toggled ON
2. Check **Featured on Homepage** is toggled ON
3. Verify image uploaded successfully
4. Clear browser cache and refresh

### Wrong Order

1. Check **Display Order** numbers
2. Lower numbers appear first
3. Make sure no duplicate order numbers

### Image Quality Issues

1. Upload higher resolution image
2. Ensure image is at least 800px wide
3. Use JPG format for photos

## Technical Details

### File Structure

```
content/gallery/
  ├── client-01.md
  ├── client-02.md
  └── ...
```

Each `.md` file contains:

```yaml
---
title: 'Client Haircut 1'
image: '../../src/assets/client-01.jpg'
caption: 'Fresh fade with clean lineup'
category: 'Haircuts'
featured: true
order: 1
published: true
date: 2024-01-15
---
```

### How It Works

1. CMS creates/edits `.md` files in `content/gallery/`
2. `galleryLoader.js` reads these files on page load
3. Home page displays images in the Wall of Fades section
4. Images are sorted and filtered automatically

## Need Help?

- Check that file is saved/published in CMS
- Verify image paths are correct
- Review browser console for errors
- Contact your developer if issues persist
