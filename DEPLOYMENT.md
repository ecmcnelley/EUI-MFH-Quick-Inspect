# 🚀 Deployment Guide

This guide will help you deploy the Rent Inspect System to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed on your computer (optional - can use GitHub web interface)

## Method 1: Deploy via GitHub Web Interface (Easiest)

### Step 1: Create a New Repository

1. Go to https://github.com/new
2. Repository name: `rent-inspect-system`
3. Description: "Property inspection system with room-by-room templates and photo documentation"
4. Choose **Public** (required for free GitHub Pages)
5. ✅ Add a README file (uncheck this - we have our own)
6. Click **Create repository**

### Step 2: Upload Files

1. Click **Add file** → **Upload files**
2. Drag and drop ALL files from this folder:
   - `index.html`
   - `README.md`
   - `LICENSE`
   - `.gitignore`
3. Commit message: "Initial deployment with today's updates"
4. Click **Commit changes**

### Step 3: Enable GitHub Pages

1. Go to repository **Settings**
2. Scroll down to **Pages** (left sidebar)
3. Under **Source**:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 1-2 minutes

### Step 4: Access Your App

Your app will be available at:
```
https://YOUR-USERNAME.github.io/rent-inspect-system/
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## Method 2: Deploy via Command Line

### Step 1: Initialize Git Repository

```bash
# Navigate to the folder containing the files
cd /path/to/rent-inspect-system

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial deployment - includes Nov 13 room templates and date fixes"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Create repository named `rent-inspect-system`
3. **Don't** initialize with README

### Step 3: Push to GitHub

```bash
# Add remote
git remote add origin https://github.com/YOUR-USERNAME/rent-inspect-system.git

# Push
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

Follow **Step 3** from Method 1 above.

## Updating Your Deployment

### Via Web Interface

1. Go to your repository
2. Click on `index.html`
3. Click the pencil icon (Edit)
4. Make changes
5. Commit changes
6. Wait 1-2 minutes for deployment

### Via Command Line

```bash
# Make changes to files
git add .
git commit -m "Description of changes"
git push
```

## Troubleshooting

### Page Shows 404

**Problem**: GitHub Pages not enabled or wrong branch selected

**Solution**:
1. Check Settings → Pages
2. Verify branch is `main` and folder is `/ (root)`
3. Click Save again
4. Wait 2 minutes

### Changes Not Appearing

**Problem**: Browser cache or GitHub Pages build delay

**Solution**:
1. Wait 2-3 minutes after push
2. Hard refresh browser:
   - **Windows/Linux**: `Ctrl + Shift + R`
   - **Mac**: `Cmd + Shift + R`
3. Try incognito/private browsing mode

### Dropdowns Not Showing

**Problem**: Browser cache showing old version

**Solution**:
1. Clear browser cache
2. Hard refresh (see above)
3. Check browser console for JavaScript errors (F12)

## Custom Domain (Optional)

### Step 1: Add CNAME File

Create a file named `CNAME` (no extension) with your domain:

```
inspections.yourdomain.com
```

### Step 2: Update DNS

Add a CNAME record in your domain DNS:

```
Type: CNAME
Name: inspections (or @)
Value: YOUR-USERNAME.github.io
```

### Step 3: Configure GitHub Pages

1. Settings → Pages
2. Custom domain: `inspections.yourdomain.com`
3. Save
4. Wait for DNS propagation (up to 24 hours)

## Verification Checklist

After deployment, verify:

- [ ] Page loads at GitHub Pages URL
- [ ] Property dropdown shows all 16 properties
- [ ] Selecting property auto-populates address
- [ ] Date fields work correctly (no +1 day issue)
- [ ] Camera works on mobile (if applicable)
- [ ] Save Progress works
- [ ] Load Saved works
- [ ] Generate Report works
- [ ] Print Report works
- [ ] Room templates load correctly
- [ ] Photos upload successfully
- [ ] Report includes all data

## Performance Tips

### Optimize for Mobile

1. Test on actual mobile devices
2. Verify camera integration works
3. Check localStorage limits (5-10MB)
4. Test with 10+ photos

### Reduce Load Time

1. Consider compressing images if logo is large
2. Keep photo resolutions reasonable
3. Clear old localStorage data periodically

## Backup Strategy

### Export Method

Since data is stored locally:

1. Complete inspection
2. Click "Generate Report"
3. Click "Print Report"
4. Save as PDF
5. Store PDF in backup location

### Regular Backups

- Save reports after each inspection
- Don't rely solely on localStorage
- Export completed inspections to PDF

## Security Notes

### Data Privacy

- All data stored locally in browser
- No server-side transmission
- HTTPS automatically provided by GitHub Pages
- Clear browser data to remove all inspection data

### Access Control

- GitHub repository can be private (paid feature)
- Public repository means code is visible (data is not)
- Consider private repository if using custom property data

## Support

### Common Issues

1. **"Storage quota exceeded"**
   - Generate report and start new inspection
   - Reduce photo count/resolution
   - Clear old inspection data

2. **"Cannot read property..."**
   - Hard refresh browser
   - Clear cache
   - Check browser console (F12)

3. **Mobile camera not working**
   - Verify HTTPS (GitHub Pages provides this)
   - Check browser permissions
   - Test on different browsers

### Getting Help

1. Check browser console (F12) for errors
2. Test in incognito mode
3. Try different browser
4. Open GitHub Issue with:
   - Browser and version
   - Device type
   - Steps to reproduce
   - Screenshot if applicable

## Version Tracking

Keep track of updates in your repository:

```bash
# Tag major updates
git tag -a v2.0 -m "Room templates rebuild and date fix"
git push origin v2.0
```

## Updates from Today (Nov 13, 2025)

This deployment includes:

✅ **Room-by-Room Inspection Templates**
- Complete rebuild with dynamic generation
- Specialized sections for each room type
- Condition-based workflow (Fair/Poor → Comments → Photos)
- Proper data persistence across room navigation

✅ **Date Population Fix**
- Fixed timezone issue causing +1 day display
- Dates now show exactly as selected
- Applied to Inspection Date and Notice Served Date

Make sure your deployment includes the latest `index.html` file with these updates!

---

**Last Updated**: November 13, 2025
**Deployment Version**: 2.0
