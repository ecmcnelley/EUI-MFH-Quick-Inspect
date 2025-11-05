# Quick Deployment Guide

## Deploy to GitHub Pages in 5 Minutes

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `EUI-MFG-Quick-Inspect`
3. Description: `NSPIRE-Compliant Rental Unit Inspection System`
4. Make it **Public**
5. Click "Create repository"

### Step 2: Upload Files
1. On your new repository page, click "uploading an existing file"
2. Drag and drop these files:
   - `index.html`
   - `rental-inspection-app-complete.jsx`
   - `README.md`
3. Commit message: "Initial commit - NSPIRE Inspection System v2.0"
4. Click "Commit changes"

### Step 3: Enable GitHub Pages
1. Go to your repository's **Settings** tab
2. Scroll down to "Pages" in the left sidebar
3. Under "Source":
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
4. Click "Save"
5. Wait 1-2 minutes for deployment

### Step 4: Access Your App
Your app will be live at:
```
https://ecmcnelley.github.io/EUI-MFG-Quick-Inspect/
```

## Verification Checklist

✅ Repository created  
✅ Files uploaded (3 files)  
✅ GitHub Pages enabled  
✅ App accessible at URL  
✅ Inspection system loads  
✅ Can generate reports  
✅ PDF printing works  

## Troubleshooting

### Issue: 404 Error
- **Solution**: Wait 2-3 minutes after enabling Pages, then refresh

### Issue: Blank Page
- **Solution**: Check browser console (F12) for errors
- Ensure files are in root directory, not a subfolder

### Issue: App Won't Load
- **Solution**: 
  1. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
  2. Clear browser cache
  3. Try incognito/private mode

### Issue: Wrong URL
- **Solution**: URL format is `https://[username].github.io/[repo-name]/`
- For this project: `https://ecmcnelley.github.io/EUI-MFG-Quick-Inspect/`

## Updating the App

To update the application after deployment:
1. Go to your repository on GitHub
2. Click on the file you want to update
3. Click the pencil icon (Edit)
4. Make your changes
5. Commit changes
6. Wait 1-2 minutes for redeployment

## Custom Domain (Optional)

To use a custom domain:
1. Go to Settings → Pages
2. Add your custom domain
3. Configure DNS with your domain provider:
   - Create CNAME record pointing to `ecmcnelley.github.io`
   - Or A records pointing to GitHub Pages IPs

## Need Help?

- **GitHub Pages Documentation**: https://docs.github.com/en/pages
- **Repository Issues**: https://github.com/ecmcnelley/EUI-MFG-Quick-Inspect/issues
- **Support**: Create an issue on GitHub

---

**That's it! Your NSPIRE-compliant inspection system is now live and accessible worldwide.**
