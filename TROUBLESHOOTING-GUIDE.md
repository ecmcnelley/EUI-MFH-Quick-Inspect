# 🔧 QUICK TROUBLESHOOTING GUIDE
## Park Village 1 & 2 Inspection System

---

## 🚨 BLANK PAGE ISSUE - **RESOLVED**

**Problem:** App opens to blank white page  
**Cause:** Incompatible styled-jsx syntax in React app  
**Status:** ✅ **FIXED** in current version

**If you're still seeing a blank page after this fix:**

### Step 1: Clear Browser Cache (CRITICAL)
```
Windows/Linux: Ctrl + Shift + Delete
Mac: Cmd + Shift + Delete
```
1. Select "Cached images and files"
2. Clear cache
3. Close ALL browser windows
4. Reopen browser
5. Hard refresh: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)

### Step 2: Check Console for Errors
1. Press `F12` to open Developer Tools
2. Click "Console" tab
3. Look for RED error messages
4. Take screenshot of any errors

### Common Console Errors & Solutions

#### Error: "Failed to load resource: net::ERR_INTERNET_DISCONNECTED"
**Cause:** No internet connection (CDN resources can't load)  
**Solution:** 
- Connect to internet
- App requires CDN access for React, Tailwind, Babel, Lucide

#### Error: "Uncaught SyntaxError: Unexpected token '<'"
**Cause:** Server returning HTML instead of JavaScript  
**Solution:**
- Ensure `app-complete-modified.jsx` is in same directory as `index.html`
- Check file wasn't corrupted during extraction
- Re-extract files from zip

#### Error: "React is not defined"
**Cause:** React CDN failed to load  
**Solution:**
- Check internet connection
- Try different network
- Clear cache and hard refresh

#### Error: "Cannot read property 'render' of undefined"
**Cause:** ReactDOM didn't load properly  
**Solution:**
- Clear cache
- Check console for CDN loading failures
- Wait for all resources to load before interacting

---

## 📱 MOBILE CAMERA ISSUES

### Camera Not Working on Mobile

#### Android Chrome
**Symptoms:** Camera button doesn't open camera  
**Solutions:**
1. **Grant Camera Permission:**
   - Settings → Apps → Chrome → Permissions → Camera → Allow
2. **Use HTTPS (Production):**
   - Camera requires secure context (https:// or localhost)
   - If testing locally, use `chrome://flags/#unsafely-treat-insecure-origin-as-secure`
3. **Check Camera Availability:**
   - Close other apps using camera
   - Restart browser
   - Restart phone if needed

#### iOS Safari
**Symptoms:** Camera prompt doesn't appear  
**Solutions:**
1. **Grant Camera Permission:**
   - Settings → Safari → Camera → Ask (or Allow)
2. **Use HTTPS:**
   - iOS Safari requires https:// for camera access
   - Deploy to GitHub Pages for https://
3. **Restart Safari:**
   - Close all Safari tabs
   - Force quit Safari
   - Reopen and try again

### Photos Not Uploading

**Symptom:** Selected photos don't appear in app  
**Common Causes & Solutions:**

1. **File Size Too Large**
   - Solution: Compress photos before upload
   - Max recommended: 5MB per photo
   - Use phone's "resize" feature when sharing

2. **Wrong File Format**
   - Solution: Use JPG or PNG only
   - Avoid HEIC (iPhone) - convert to JPG first

3. **Browser Storage Full**
   - Solution: Clear browser data
   - Restart inspection if needed

---

## 💻 DESKTOP UPLOAD ISSUES

### File Upload Button Not Working

**Symptom:** Click "Upload Photos" but nothing happens  
**Solutions:**
1. Check browser permissions:
   - Chrome: Settings → Privacy → Site Settings → Files
2. Try different browser (Chrome recommended)
3. Clear cache and cookies
4. Disable browser extensions temporarily

### Photos Appear Corrupted

**Symptom:** Photos display as broken images  
**Solutions:**
1. Check file format (JPG/PNG only)
2. Try smaller file sizes
3. Re-upload photos
4. Check if photos open in normal image viewer

---

## 📄 PDF GENERATION ISSUES

### PDF Not Downloading

**Symptom:** Click "Generate PDF" but nothing downloads  
**Solutions:**

1. **Check Browser Popup Blocker:**
   - Chrome: Allow popups for this site
   - Firefox: Allow downloads for this site
   - Edge: Check notification for blocked download

2. **Check Download Location:**
   - Browser may ask where to save
   - Check Downloads folder
   - Check browser's download tray (bottom)

3. **Wait for Generation:**
   - Large inspections take 5-10 seconds
   - Don't click button multiple times
   - Watch for loading indicator

### PDF Opens Blank

**Symptom:** PDF downloads but opens blank  
**Solutions:**
1. Use Adobe Acrobat Reader (not browser PDF viewer)
2. Download latest version of PDF viewer
3. Check PDF file size (should be >100KB if photos included)
4. Try regenerating PDF

### Photos Missing in PDF

**Symptom:** PDF generates but doesn't include photos  
**Solutions:**
1. Verify photos are visible in Step 5 before generating
2. Wait for all photos to fully load
3. Don't navigate away during PDF generation
4. If problem persists, reduce number of photos per inspection

---

## 🔄 FORM DATA NOT SAVING

### Data Disappears After Refresh

**Symptom:** Entered data lost when refreshing page  
**Expected Behavior:** This is normal - app uses browser session storage  
**Solutions:**
1. Complete inspection in one session
2. Don't refresh page during inspection
3. Generate PDF to save data permanently
4. Use browser's back button carefully

### Cannot Navigate Between Steps

**Symptom:** "Next" button disabled or doesn't work  
**Causes & Solutions:**

1. **Required Fields Not Filled:**
   - Check for red error messages
   - Fill all fields marked with *
   - Unit Number, Tenant Name, Inspector Name required

2. **Validation Errors:**
   - Room names cannot be empty
   - At least one room required
   - All rooms must be inspected before Step 4

3. **JavaScript Error:**
   - Check console (F12)
   - Clear cache and reload

---

## 🎨 STYLING/DISPLAY ISSUES

### Page Looks Broken (No Styling)

**Symptom:** Plain white page with unstyled text  
**Cause:** Tailwind CSS failed to load  
**Solutions:**
1. Check internet connection
2. Verify CDN access: https://cdn.tailwindcss.com
3. Clear cache and reload
4. Check browser console for network errors

### Responsive Layout Not Working

**Symptom:** Mobile layout looks like desktop  
**Solutions:**
1. Clear cache
2. Check viewport meta tag present
3. Rotate device (portrait vs landscape)
4. Try different mobile browser

### Company Logo Missing

**Symptom:** Logo placeholder but no image  
**Cause:** `company-logo.png` file missing or incorrect path  
**Solutions:**
1. Verify `company-logo.png` in same directory as `index.html`
2. Check file name spelling (case-sensitive on some systems)
3. Regenerate logo if corrupted

---

## ⚠️ COMPLIANCE VIOLATIONS NOT AUTO-DETECTED

### Critical Items Not Generating Work Orders

**Symptom:** Set smoke alarm to "Missing" but no auto-WO generated  
**THIS IS CRITICAL - System MUST auto-detect**

**Step-by-Step Verification:**
1. Go to Step 3 (Room Inspection)
2. For any room, set "Smoke Alarm" dropdown to "Missing"
3. Complete all room inspections
4. Navigate to Step 6 (Work Orders)
5. **VERIFY:** Auto-generated WO appears with "Smoke Alarm - Missing" description

**If auto-detection fails:**
1. Check console for JavaScript errors (F12)
2. Verify using the FIXED version of `app-complete-modified.jsx`
3. Clear cache completely
4. Try different browser
5. **DO NOT USE IN PRODUCTION** until fixed

**Critical Items That MUST Auto-Generate WOs:**
- ❌ Smoke Alarm - Missing or Not Working
- ❌ CO2 Alarm - Missing or Not Working  
- ❌ GFI Protection - Missing (Kitchen/Bathrooms)
- ❌ Stairway Railing - Missing or Damaged

---

## 🌐 DEPLOYMENT ISSUES

### GitHub Pages Shows 404 Error

**Symptom:** GitHub Pages URL shows "404 Not Found"  
**Solutions:**
1. Wait 5-10 minutes after first push (GitHub Pages build time)
2. Verify GitHub Actions workflow completed successfully
3. Check repository settings:
   - Settings → Pages → Source: GitHub Actions
4. Ensure all files committed and pushed
5. Check file names (case-sensitive)

### GitHub Pages Shows Blank Page

**Symptom:** GitHub Pages loads but shows blank page  
**This should be fixed now, but if it happens:**
1. Check that you deployed the FIXED version
2. View page source (Ctrl+U) - should see full HTML
3. Open browser console (F12) - check for errors
4. Clear CDN cache (can take 24 hours)
5. Try accessing from incognito/private window

### Changes Not Appearing After Push

**Symptom:** Updated files but GitHub Pages still shows old version  
**Solutions:**
1. Hard refresh: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache completely
3. Wait 5-10 minutes for GitHub Actions to rebuild
4. Check GitHub Actions tab for workflow status
5. Try different browser or incognito mode

---

## 🔍 BROWSER-SPECIFIC ISSUES

### Chrome
**Common Issue:** Slow performance with many photos  
**Solution:** Upgrade to latest Chrome, limit photos to 30 per inspection

### Firefox  
**Common Issue:** PDF downloads as .pdf.html  
**Solution:** Firefox → Settings → Applications → PDF → "Use Adobe Acrobat"

### Safari (Mac/iOS)
**Common Issue:** Camera permission prompt not appearing  
**Solution:** Safari → Preferences → Websites → Camera → Allow

### Edge
**Common Issue:** Download blocked by SmartScreen  
**Solution:** Click "..." → Keep → Keep anyway

---

## 📊 PERFORMANCE ISSUES

### App Slow or Laggy

**Symptoms:** Slow navigation, delayed photo uploads  
**Solutions:**

1. **Reduce Photo Sizes:**
   - Compress photos before upload
   - Use "medium" quality when capturing
   - Limit to 20-30 photos per inspection

2. **Close Other Browser Tabs:**
   - Each tab uses memory
   - Close unused tabs before inspection

3. **Clear Browser Data:**
   - History, cache, cookies
   - Restart browser after clearing

4. **Update Browser:**
   - Use latest version
   - Chrome/Edge recommended for best performance

### PDF Generation Takes Forever

**Symptom:** "Generating PDF..." spinning for 30+ seconds  
**Causes:**
1. Too many photos (50+)
2. Large photo file sizes
3. Slow computer/device

**Solutions:**
1. Reduce number of photos
2. Compress photos before upload
3. Wait patiently (can take 10-15 seconds with many photos)
4. Use desktop instead of mobile for large inspections

---

## 🆘 EMERGENCY TROUBLESHOOTING

### "Nothing Works" - Nuclear Option

**When all else fails:**

1. **Start Fresh:**
   ```
   1. Delete ALL files from previous version
   2. Clear browser cache completely
   3. Re-extract from zip file
   4. Place all files in NEW empty folder
   5. Open index.html from NEW folder
   ```

2. **Try Different Browser:**
   - Download Chrome if not installed
   - Test in incognito/private mode
   - Disable all extensions

3. **Try Different Device:**
   - Test on phone if failing on PC
   - Test on PC if failing on phone
   - Borrow colleague's device

4. **Check File Integrity:**
   ```
   Required files:
   ✅ index.html (should be 3KB+)
   ✅ app-complete-modified.jsx (should be 65KB+)
   ✅ company-logo.png (should be 20KB+)
   
   All files must be in SAME directory
   ```

5. **Verify Internet Connection:**
   - Open https://www.google.com to test
   - CDN resources required: unpkg.com, cdn.tailwindcss.com
   - Try different WiFi network

---

## 📝 ERROR MESSAGE DECODER

### "Failed to fetch"
**Meaning:** Network error, can't load external resource  
**Fix:** Check internet, try different network

### "Uncaught TypeError: Cannot read property..."
**Meaning:** JavaScript trying to access non-existent data  
**Fix:** Clear cache, reload page, check console

### "ReferenceError: React is not defined"
**Meaning:** React library didn't load from CDN  
**Fix:** Check internet, wait for page to fully load

### "QuotaExceededError"
**Meaning:** Browser storage full  
**Fix:** Clear browser data, reduce photos

### "SecurityError: Blocked a frame with origin"
**Meaning:** Browser security blocking action  
**Fix:** Use https:// (not file://) or deploy to GitHub Pages

---

## 📞 GETTING HELP

### Before Reporting Issue

Collect this information:
1. **Browser & Version:**  
   Chrome → ⋮ Menu → Help → About Google Chrome
2. **Operating System:**  
   Windows 10/11, macOS, Android, iOS version
3. **Console Errors:**  
   F12 → Console tab → Screenshot RED errors
4. **Steps to Reproduce:**  
   Exact steps that cause the problem
5. **What You've Tried:**  
   List troubleshooting steps already attempted

### Where to Get Help

1. **Check Documentation:**
   - README-DEPLOYMENT.md
   - QUICK-START.md
   - FIX-SUMMARY.md
   - COMPLIANCE-VERIFICATION-CHECKLIST.md

2. **Search Console Errors:**
   - Copy exact error message
   - Search online: "react [error message]"
   - Check Stack Overflow

3. **Report Compliance Issues:**
   - Federal compliance failures are **CRITICAL**
   - Document specific regulation violated
   - Include screenshots of failure

---

## ✅ HEALTH CHECK QUICK TEST

**Paste this checklist when helping someone troubleshoot:**

```
INSPECTION SYSTEM HEALTH CHECK

[ ] App loads without blank page
[ ] No red errors in console (F12)
[ ] Property dropdown shows Park Village 1 & 2
[ ] Can add custom room
[ ] Can navigate to Step 3 (Room Inspection)
[ ] Smoke Alarm dropdown appears
[ ] Can upload/capture photo
[ ] Photo appears with "Photo #1"
[ ] Can navigate to Step 6 (Work Orders)
[ ] Set Smoke Alarm to "Missing" in Step 3
[ ] Auto-generated WO appears in Step 6
[ ] Can generate PDF
[ ] PDF downloads successfully
[ ] PDF opens and shows data

If ALL checks pass: System is healthy ✅
If ANY check fails: See troubleshooting for that specific item
```

---

## 🎯 MOST COMMON FIXES (80% of Issues)

1. **Clear cache + hard refresh** - Fixes 40% of issues
2. **Wait for full page load** - Fixes 15% of issues
3. **Check internet connection** - Fixes 10% of issues
4. **Use Chrome browser** - Fixes 10% of issues
5. **Extract files to NEW folder** - Fixes 5% of issues

**Try these five things FIRST before diving into complex troubleshooting.**

---

## ⚖️ COMPLIANCE-RELATED ISSUES

**If any compliance feature is not working:**

🚨 **DO NOT USE IN PRODUCTION UNTIL FIXED** 🚨

**Compliance is non-negotiable.**

Critical compliance features:
- Smoke alarm auto-detection
- CO2 alarm auto-detection
- GFI protection auto-detection
- Railing auto-detection
- Work order priority levels
- Emergency response workflows

Report compliance failures immediately with:
1. Specific federal regulation affected
2. Expected behavior per regulation
3. Actual behavior observed
4. Screenshot/video evidence

---

**Remember: When in doubt, clear cache, hard refresh, and try Chrome browser. These three steps resolve most issues.**
