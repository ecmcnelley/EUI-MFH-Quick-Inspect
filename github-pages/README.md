# EUI-MFG-Quick-Inspect

## NSPIRE-Compliant Rental Unit Inspection System
**Enhanced for Multifamily NW & Quantum Residential**

A comprehensive federal compliance inspection tool for rental housing units that follows HUD's National Standards for the Physical Inspection of Real Estate (NSPIRE).

### 🌐 Live Application
Access the live inspection system at: **https://ecmcnelley.github.io/EUI-MFG-Quick-Inspect/**

## Features

### ✅ Federal Compliance Standards
- **HUD NSPIRE** - National Standards for the Physical Inspection of Real Estate
- **HOME** - Investment Partnerships Program
- **LIHTC** - Low-Income Housing Tax Credit Requirements
- **USDA Rural Development** - Multifamily Housing with Rental Assistance
- **24 CFR Part 5** - Fair Housing and Equal Opportunity
- **24 CFR Part 8** - Accessibility (Section 504)
- **24 CFR Part 100** - Fair Housing
- State and Local Landlord-Tenant Laws

### 🏠 Property Configuration
- **Pre-configured Properties**: P56100
- **Pre-configured Addresses**: 502 South 5th Street, 554 South 5th Street
- **Pre-configured Inspectors**: Ellie McNelley, Julian Rubio
- Custom entry options for all fields

### 📝 Comprehensive Inspection
- Room-by-room inspection tracking
- Safety device verification (smoke alarms, CO2 alarms, GFI outlets)
- Appliance inspection with detailed checks
- Photo documentation with comments (3 photos per row in reports)
- Automatic photo comment summarization
- Work order generation
- NSPIRE violation flagging

### 📄 Professional Reports
- One-click PDF generation with company logo
- Comprehensive tabular data presentation
- Photo documentation with inline display
- Work order summaries
- Compliance statements
- Digital signatures
- Email-ready format

## Quick Start

### For Users
1. Visit: https://ecmcnelley.github.io/EUI-MFG-Quick-Inspect/
2. Start a new inspection
3. Fill in property and tenant information
4. Configure room layout
5. Set up global systems
6. Conduct room-by-room inspections
7. Generate and print your NSPIRE-compliant report

### For Developers

#### GitHub Pages Deployment

1. **Create a new repository on GitHub**:
   ```
   Repository name: EUI-MFG-Quick-Inspect
   Description: NSPIRE-Compliant Rental Unit Inspection System
   Public repository
   ```

2. **Upload files**:
   - index.html
   - rental-inspection-app-complete.jsx
   - README.md

3. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main (or master)
   - Folder: / (root)
   - Save

4. **Access your deployed app**:
   - URL: https://ecmcnelley.github.io/EUI-MFG-Quick-Inspect/

## File Structure

```
EUI-MFG-Quick-Inspect/
├── index.html                           # Main HTML file that loads React app
├── rental-inspection-app-complete.jsx   # Complete React inspection application
└── README.md                            # This file
```

## System Requirements

### Minimum Requirements
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Internet connection (for initial load)
- Screen resolution: 1280x720 or higher
- 4GB RAM

### Recommended
- Chrome or Edge (latest version)
- Screen resolution: 1920x1080 or higher
- 8GB RAM

## Usage Guide

### Step 1: Property & Tenant Information
- Select property from dropdown (P56100) or enter custom
- Select address (502 or 554 South 5th Street) or enter custom
- Enter unit number and tenant information
- Select inspector (Ellie McNelley, Julian Rubio) or enter custom
- Choose inspection type (Annual, Move-in, Move-out, Special, Complaint)
- Select applicable federal programs

### Step 2: Room Configuration
- Specify number of bedrooms and bathrooms
- Add common rooms (kitchen, living room, etc.)
- Add transitional spaces (hallways, stairways)
- Include outdoor areas if applicable

### Step 3: Global Features
- Configure heating and cooling systems
- Set up water heater information
- Add laundry appliances

### Step 4: Room Inspections
- Navigate through each room
- Document housekeeping status
- Verify safety devices (NSPIRE required)
- Inspect flooring, walls, ceiling, and paint
- Check electrical outlets and GFI protection
- Examine doors, windows, and storage
- Test plumbing fixtures
- Inspect heating systems
- Verify stairway railings
- Document appliances
- Add photos and comments
- Create work orders as needed

### Step 5: Generate Report
- Review inspection summary
- Check work order list
- Confirm NSPIRE compliance
- Add additional notes
- Preview and print to PDF
- Email report to stakeholders

## Photo Management

- **Upload**: Click camera icons to add photos
- **Comments**: Add descriptions to each photo
- **Organization**: Photos display inline with relevant sections
- **Print Format**: 3 photos per row, automatically resized
- **Summarization**: Photo comments automatically summarized in report

## Work Order System

Work orders are automatically generated for:
- Items marked as "Fair" or "Poor" condition
- Non-functional systems
- Missing required safety devices
- NSPIRE violations
- Any item flagged for repair or replacement

## NSPIRE Compliance Checks

The system automatically flags violations for:
- Missing smoke alarms in bedrooms/hallways
- Missing CO2 alarms (with fuel-burning appliances)
- Missing GFI protection in kitchens/bathrooms
- Missing bathroom ventilation
- Missing stairway railings (3+ rises)
- Missing water heater TPR valves
- Other federal requirement violations

## Report Features

- **Header**: Company logo (Multifamily NW & Quantum Residential)
- **Property Info**: Complete property and tenant details
- **Unit Configuration**: Room layout and systems
- **Room Details**: Comprehensive room-by-room findings
- **Photos**: Embedded photos with captions (3 per row)
- **Work Orders**: Prioritized action items
- **Compliance**: NSPIRE certification statement
- **Signatures**: Inspector and tenant signature lines
- **Legal Disclaimer**: Federal compliance notice

## Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Opera | 76+ | ✅ Supported |
| IE | Any | ❌ Not Supported |

## Troubleshooting

### App Won't Load
- Clear browser cache
- Disable ad blockers
- Check internet connection
- Try a different browser

### Photos Not Uploading
- Check file size (< 5MB recommended)
- Use supported formats (JPG, PNG, WEBP)
- Ensure sufficient browser storage

### Print/PDF Issues
- Use Chrome or Edge for best results
- Check printer settings
- Ensure pop-ups are allowed
- Try "Print to PDF" option

### Data Loss Prevention
- Complete inspections in one session
- Don't refresh the browser during inspection
- Use "Print to PDF" to save backups
- Browser storage resets between sessions

## Support

For technical support or questions:
- **GitHub Issues**: https://github.com/ecmcnelley/EUI-MFG-Quick-Inspect/issues
- **Email**: support@multifamilynw.org (replace with actual support email)

## Legal Notice

This inspection tool is designed to assist in compliance with federal regulations. Property owners and managers are solely responsible for ensuring full compliance with all applicable federal, state, and local regulations including but not limited to: HUD regulations, HOME program requirements, LIHTC compliance, USDA Rural Development standards, Fair Housing Act, Section 504 accessibility requirements, and all applicable landlord-tenant laws.

**This tool does not constitute legal advice** and should be used in conjunction with qualified legal counsel and compliance professionals.

## Version History

### Version 2.0 (Current)
- Added pre-configured property options (P56100)
- Added pre-configured addresses (502 & 554 South 5th Street)
- Added pre-configured inspectors (Ellie McNelley, Julian Rubio)
- Enhanced report generation with embedded logo
- Improved photo layout (3 per row, reduced size)
- Added automatic photo comment summarization
- Added back button on final page
- Improved PDF print formatting
- Enhanced work order tracking
- Fixed email functionality

### Version 1.0
- Initial release
- Basic NSPIRE compliance checks
- Room-by-room inspection
- Photo documentation
- Report generation

## Credits

**Developed for**: Multifamily NW & Quantum Residential  
**Standards Compliance**: HUD NSPIRE, HOME, LIHTC, USDA Rural Development  
**Framework**: React 18  
**Icons**: Lucide React  
**Styling**: Tailwind CSS  

## License

© 2025 Multifamily NW & Quantum Residential. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, distribution, or use of this software, via any medium, is strictly prohibited.

---

**Repository**: https://github.com/ecmcnelley/EUI-MFG-Quick-Inspect  
**Live Application**: https://ecmcnelley.github.io/EUI-MFG-Quick-Inspect/  
**Last Updated**: November 2025
