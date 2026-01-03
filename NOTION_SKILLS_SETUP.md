# Notion Skills & Technologies Setup Guide

This guide will walk you through setting up Notion databases for your Skills & Technologies section.

## Overview

You'll create **2 databases** in Notion:
1. **Skill Categories** - Core skill areas (Frontend, Backend, Database, DevOps)
2. **Technologies** - Individual technologies (React, Node.js, Docker, etc.)

---

## Step 1: Create the Skill Categories Database

### 1.1 Create a New Database

1. Open your Notion workspace
2. Create a new page called **"Skill Categories"**
3. Type `/database` and select **"Table - Full page"**

### 1.2 Configure Database Properties

Your database needs these **exact property names** (case-sensitive):

| Property Name | Type | Description |
|--------------|------|-------------|
| `Name` | Title | The skill category name (e.g., "Frontend Development") |
| `Description` | Text | Short description of what this skill area covers |
| `Icon` | Select | Icon name from Lucide React library |
| `Color` | Select | Gradient color classes for the icon background |
| `Order` | Number | Display order (1, 2, 3, 4...) |

### 1.3 Set Up the Icon Property (Select)

Click on the `Icon` property → Edit property → Add these options:

- `Code2`
- `Server`
- `Database`
- `Cloud`
- `Box`
- `Zap`
- `Palette`
- `Shield`

### 1.4 Set Up the Color Property (Select)

Click on the `Color` property → Edit property → Add these gradient options:

- `from-cyan-500 to-blue-500`
- `from-green-500 to-emerald-500`
- `from-blue-500 to-indigo-500`
- `from-orange-500 to-red-500`
- `from-purple-500 to-pink-500`
- `from-yellow-500 to-orange-500`
- `from-indigo-500 to-purple-500`
- `from-red-500 to-pink-500`

### 1.5 Add Sample Data

Add these example rows:

| Name | Description | Icon | Color | Order |
|------|-------------|------|-------|-------|
| Frontend Development | Building responsive and interactive user interfaces | Code2 | from-cyan-500 to-blue-500 | 1 |
| Backend Development | Developing robust server-side applications | Server | from-green-500 to-emerald-500 | 2 |
| Database & Storage | Designing and managing data solutions | Database | from-blue-500 to-indigo-500 | 3 |
| DevOps & Cloud | Deploying and scaling applications | Cloud | from-orange-500 to-red-500 | 4 |

---

## Step 2: Create the Technologies Database

### 2.1 Create a New Database

1. Create a new page called **"Technologies"**
2. Type `/database` and select **"Table - Full page"**

### 2.2 Configure Database Properties

Your database needs these **exact property names**:

| Property Name | Type | Description |
|--------------|------|-------------|
| `Name` | Title | Technology name (e.g., "React", "Node.js") |
| `Color` | Select | Badge color classes (background, text, border) |
| `Order` | Number | Display order (1, 2, 3...) |

### 2.3 Set Up the Color Property (Select)

Click on the `Color` property → Edit property → Add these color class options:

```
bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20
bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20
bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20
bg-gray-500/10 text-gray-700 dark:text-gray-300 border-gray-500/20
bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20
bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20
bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20
bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20
bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/20
bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20
bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20
bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20
```

### 2.4 Add Sample Technologies

Add your technologies (examples):

| Name | Color | Order |
|------|-------|-------|
| JavaScript | bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20 | 1 |
| TypeScript | bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20 | 2 |
| React | bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20 | 3 |
| Next.js | bg-gray-500/10 text-gray-700 dark:text-gray-300 border-gray-500/20 | 4 |
| Node.js | bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 | 5 |

---

## Step 3: Share Databases with Your Integration

### 3.1 Enable Integration Access

You need to give your Notion integration permission to access both databases:

**For Skill Categories Database:**
1. Open the **Skill Categories** database in Notion
2. Click the **"..."** (three dots) menu in the top right
3. Click **"Connections"** or **"Add connections"**
4. Select your integration from the list
5. Click **"Confirm"**

**For Technologies Database:**
1. Open the **Technologies** database in Notion
2. Click the **"..."** (three dots) menu in the top right
3. Click **"Connections"** or **"Add connections"**
4. Select your integration from the list
5. Click **"Confirm"**

### 3.2 Create Data Sources in Notion Developers Portal

1. Go to [Notion Developers Portal](https://developers.notion.com/)
2. Select your integration
3. Navigate to **Data Sources**
4. Click **"Create data source"** for your Skill Categories database
5. Select the **Skill Categories** database
6. Copy the **Data Source ID** (format: `2dd3324a-94d0-8066-adc3-000b087aedb0`)
7. Repeat for your **Technologies** database

---

## Step 4: Update Your Code

### 4.1 Add Data Source IDs

Open `lib/notion/content.ts` (line 28-29) and add your data source IDs:

```typescript
const NOTION_IDS = {
  HOME_HEADLINE: "02c78ac2798b4a5095299849ae322874",
  ABOUT_PAGE: "2923324a94d080188a8df932cba65334",
  ALL_BLOGS_DATASOURCE: "2543324a-94d0-800b-a6ce-000bcc893e63",
  RECENT_BLOGS_DATASOURCE: "2913324a-94d0-80bb-9527-000bf25b39a9",
  SKILL_CATEGORIES_DATASOURCE: "YOUR_DATA_SOURCE_ID_HERE", // ← Paste your data source ID
  TECHNOLOGIES_DATASOURCE: "YOUR_DATA_SOURCE_ID_HERE", // ← Paste your data source ID
} as const;
```

### 4.2 Test Your Setup

Run your development server:
```bash
npm run dev
```

Visit `/about` page to see your skills section populated from Notion!

---

## Step 5: Managing Your Skills

### Adding New Skill Categories

1. Open your "Skill Categories" database in Notion
2. Click **"+ New"**
3. Fill in all required fields:
   - **Name**: The category name
   - **Description**: Brief description
   - **Icon**: Choose from the dropdown (Code2, Server, Database, Cloud, etc.)
   - **Color**: Choose a gradient
   - **Order**: Number for sorting (higher = appears later)
4. Your website will automatically reflect changes on next build!

### Adding New Technologies

1. Open your "Technologies" database in Notion
2. Click **"+ New"**
3. Fill in:
   - **Name**: Technology name
   - **Color**: Choose a color scheme from dropdown
   - **Order**: Display order number
4. Changes appear automatically!

### Reordering Items

Simply change the **Order** number in either database. Lower numbers appear first.

---

## Troubleshooting

### Skills not showing up?

1. **Check Data Source IDs**: Ensure you've added the correct IDs in `lib/notion/content.ts`
2. **Check Integration Access**: Make sure your Notion integration has access to both databases
3. **Check Property Names**: Property names must match exactly (case-sensitive)
4. **Check Console**: Look for error messages in your browser console or terminal

### Fallback Data

If Notion is not configured, the website will use fallback data (the hardcoded skills). This ensures your site always works even if Notion has issues.

### Icon Not Showing?

Make sure you're using exactly one of these icon names in the Icon dropdown:
- Code2
- Server
- Database
- Cloud
- Box
- Zap
- Palette
- Shield

If you use a different name, it will default to `Code2`.

---

## Color Customization

### For Skill Categories (Gradient Backgrounds)

The color format is Tailwind CSS gradient classes:
```
from-{color}-500 to-{color2}-500
```

Available colors: cyan, blue, green, emerald, orange, red, purple, pink, yellow, indigo, teal

### For Technologies (Badge Colors)

The format includes background, text, and border:
```
bg-{color}-500/10 text-{color}-700 dark:text-{color}-400 border-{color}-500/20
```

This creates a subtle colored badge that works in both light and dark modes.

---

## Benefits of Notion Integration

✅ **Update without code changes** - Edit skills directly in Notion
✅ **No deployment needed** - Changes appear on next page load (in production after rebuild)
✅ **Easy reordering** - Just change the Order number
✅ **Consistent design** - Pre-defined color schemes ensure visual consistency
✅ **Fallback safety** - Site works even if Notion is down

---

## Need Help?

If you encounter issues:
1. Check that all property names match exactly (case-sensitive)
2. Verify your integration has access to both databases
3. Ensure Data Source IDs are correct
4. Check browser console for error messages
5. Review the TypeScript types in `types/global.types.ts`

---

**Next Steps**: Once configured, you can add, remove, or reorder skills anytime in Notion without touching code!
