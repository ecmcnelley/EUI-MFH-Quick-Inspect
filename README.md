# NSPIRE-Compliant Rental Unit Inspection System

## 🏠 Federal Housing Compliance Inspection Tool

A comprehensive NSPIRE-compliant inspection application for rental housing units, enforcing strict federal compliance with HUD, HOME, LIHTC, USDA Rural Development, and Section 8 standards.

---

## ✨ Features

### Federal Compliance
- ✅ **HUD NSPIRE Standards** - Primary compliance framework
- ✅ **HOME Investment Partnerships** (24 CFR Part 92)
- ✅ **LIHTC Requirements** (26 USC § 42)
- ✅ **USDA Rural Development** (7 CFR Part 3560)
- ✅ **Section 8 HQS** (24 CFR Part 982)
- ✅ **Fair Housing Act** (24 CFR Part 100)
- ✅ **Section 504 Accessibility** (24 CFR Part 8)

### Automatic Violation Detection
- 🚨 Missing smoke alarms in bedrooms/hallways
- 🚨 Missing CO2 alarms (with fuel-burning heat)
- 🚨 Missing GFI protection (kitchens/bathrooms)
- 🚨 Missing bathroom ventilation
- 🚨 Missing stairway railings (3+ rises)
- 🚨 Missing water heater safety devices

### Complete 7-Step Inspection Process
1. **Property & Tenant Information** - Federal compliance fields
2. **Unit Layout Configuration** - Dynamic room generation
3. **Global Features & Systems** - Heating, cooling, water
4. **Room-by-Room Inspections** - Type-specific requirements
5. **Water Heater Safety** - Critical NSPIRE checks
6. **General Safety & Final Checks** - Unit-wide verification
7. **Generate Report** - Compliance verification & PDF export

---

## 🚀 Quick Start

### Access the Live App
**This application is live at:** https://[your-username].github.io/[repo-name]

### Local Testing
1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. Start inspecting!

**Note:** Requires internet connection for React CDN libraries.

---

## 📋 Usage

### For Inspectors:
1. **Step 1:** Enter property and tenant information
2. **Step 2:** Configure unit layout (bedrooms, bathrooms, etc.)
3. **Step 3:** Set global systems (heating, water, etc.)
4. **Step 4:** Conduct room-by-room inspections
5. **Step 5:** Complete water heater safety checks
6. **Step 6:** Perform general safety verification
7. **Step 7:** Review compliance and generate report

### For Property Managers:
- Review reports for NSPIRE violations
- Create work orders for flagged items
- Track compliance and violation resolution
- Use data for federal program reporting

---

## 🔧 Customization

To update property names, addresses, or inspectors:

1. Open `app.jsx` in a text editor
2. Find the constants section (around line 20)
3. Update the arrays:

```javascript
const PROPERTY_NAMES = [
    'Your Property Name Here',
    'Another Property',
    // Add more...
];

const PROPERTY_ADDRESSES = [
    'Your Address Here',
    // Add more...
];

const INSPECTORS = [
    'Your Name Here',
    // Add more...
];
```

4. Save and refresh

---

## 📱 Browser Support

- ✅ Chrome 90+ (Recommended)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+ (Recommended)
- ✅ Mobile/Tablet optimized
- ❌ Internet Explorer (Not supported)

---

## ⚖️ Legal & Compliance Notice

**This tool assists with federal compliance but does not replace professional legal counsel or certified inspections.**

Property owners and managers are **solely responsible** for:
- Final compliance verification with applicable federal, state, and local regulations
- Consultation with qualified legal counsel
- Staff training and certification
- HUD reporting requirements
- Program-specific documentation requirements
- Addressing all identified violations

**This tool does not constitute legal advice.**

---

## 🎯 Technical Details

- **Framework:** React 18 (via CDN)
- **Transpiler:** Babel Standalone
- **Dependencies:** Zero (all via CDN)
- **Deployment:** Static hosting (GitHub Pages, Netlify, etc.)
- **Browser-based:** No build tools required

---

## 📞 Support

For technical issues:
1. Check browser console (F12) for errors
2. Verify internet connection (CDN requires it)
3. Try a different modern browser
4. Clear browser cache

For compliance questions:
- Consult HUD NSPIRE standards documentation
- Contact qualified legal counsel
- Review federal program requirements

---

## 📄 License

This inspection tool is provided for use by property management professionals conducting federal housing compliance inspections.

**Compliance Standards:** HUD NSPIRE 2025

---

## 🔄 Updates

To update this application:
1. Make changes to files
2. Commit and push to GitHub
3. GitHub Pages will automatically redeploy
4. Changes live in 1-2 minutes

---

## ✅ Inspection Checklist

Before conducting inspections, ensure:
- [ ] 24-hour notice provided to tenant
- [ ] Inspector trained on NSPIRE standards
- [ ] Camera/device ready for photos
- [ ] Understanding of critical safety requirements
- [ ] Knowledge of program-specific requirements

---

**Priority: Federal Law and Regulation Compliance Over All Else**

*Version 1.0 - Production Release*  
*Last Updated: November 2025*
