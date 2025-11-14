# 📋 Rent Inspect System

A comprehensive, mobile-friendly property inspection system for conducting detailed unit inspections with photo documentation and professional reporting.

## 🌟 Features

### Core Functionality
- ✅ **6-Step Workflow** - Streamlined inspection process
- 📝 **Property Information Management** - Pre-configured property database with 16 locations
- 🏠 **Room-by-Room Templates** - Dynamic templates for Entry, Kitchen, Dining, Living, Bedrooms, Bathrooms, Laundry, Hallways, and Outdoor areas
- ⚠️ **Safety Compliance** - Comprehensive smoke alarm tracking with type, power, alert, and interconnection details
- 🔌 **Appliance Documentation** - Track all appliances with model/serial numbers and photos
- 📸 **Photo Documentation** - Mobile camera integration for iOS/Android with automatic photo numbering
- 💾 **Auto-Save & Recovery** - Automatic progress saving with localStorage
- 📄 **Professional Reports** - Generate print-ready inspection reports

### Customization
- 🎨 **Brand Customization** - Custom colors and company logo support
- 🔒 **Logo Lock** - Save logo across inspections on the same device
- 📅 **Multiple Inspection Types** - Bi-Annual, Move-In/Out, Annual, Quarterly, Maintenance, Pre-Lease

### Updates From Today's Conversations

#### 1. Room-by-Room Inspection Templates (Nov 13, 2025)
- ✅ Complete rebuild of room templates with dynamic generation system
- ✅ Specialized sections for each room type:
  - **Entry**: Door, Threshold, Flooring, Closet (optional), Walls, Bullnose, Outlets, Lighting
  - **Kitchen**: All Entry features + GFI, Sink, Cabinets, Shelves, Drawers, Mold check
  - **Dining/Living Rooms**: Windows, Heaters with thermostat subsections
  - **Bedrooms**: Closets, Windows, Heaters
  - **Bathrooms**: Tub/Shower, Toilet, Sink, Exhaust Fan, Medicine Cabinet
  - **Hallways**: Heaters, basic inspections
  - **Outdoor Deck/Patio**: Surface and railing inspections
- ✅ Condition-based workflow: Fair/Poor conditions trigger comment fields
- ✅ Comment-based photos: Comments automatically trigger photo upload buttons
- ✅ Photo numbering system with section titles and automatic incrementing

#### 2. Fix Date Population in Header (Nov 13, 2025)
- ✅ Fixed timezone issue causing dates to display +1 day
- ✅ Implemented `formatDateWithoutTimezone()` function
- ✅ Dates now display exactly as selected without timezone conversion
- ✅ Applied to both Inspection Date and Notice Served Date fields

## 🚀 Live Demo

Visit the live application: [https://YOUR-USERNAME.github.io/rent-inspect-system/](https://YOUR-USERNAME.github.io/rent-inspect-system/)

*(Replace YOUR-USERNAME with your actual GitHub username)*

## 📦 Installation & Deployment

### Quick Deploy to GitHub Pages

1. **Fork or Clone this Repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/rent-inspect-system.git
   cd rent-inspect-system
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** → **/ (root)**
   - Click **Save**

4. **Access Your App**
   - Your app will be live at: `https://YOUR-USERNAME.github.io/rent-inspect-system/`
   - Changes take 1-2 minutes to deploy

### Local Development

Simply open `index.html` in your browser:

```bash
# Option 1: Direct open
open index.html  # Mac
start index.html # Windows
xdg-open index.html # Linux

# Option 2: Local server (recommended)
python -m http.server 8000
# Then visit: http://localhost:8000
```

## 📱 Mobile Usage

### Camera Integration
The app automatically integrates with device cameras:
- **iOS**: Uses native camera app
- **Android**: Uses native camera or gallery picker
- **Desktop**: Standard file upload

### Photo Features
- Multiple photos per issue
- Automatic photo numbering (Issue #1, Issue #2, etc.)
- Photo captions with section title and comment
- Thumbnail preview with delete option
- Photos included in final report

## 💾 Data Persistence

### Auto-Save System
- Detects unsaved changes automatically
- Warns before page refresh
- Saves progress automatically on refresh attempts

### Manual Save/Load
- **Save Progress**: Button on Step 1 (Property Information)
- **Load Saved**: Restores all data from last save
- **Storage**: Uses browser localStorage (5-10MB limit)

### Storage Management
If you encounter storage errors:
1. Generate and save your report
2. Print or export as PDF
3. Start a new inspection
4. Consider taking fewer or lower-resolution photos

## 🏢 Pre-Configured Properties

The system includes 16 Quantum Residential properties across Washington State:

### Central Washington
- Park Village 1 & 2 (Selah)
- Huntington Court 1 & 2 (Ellensburg)
- Windsor Park (Ellensburg)
- Hampton Court (Ellensburg)
- Spurling Court (Ellensburg)

### Mountain Region
- Berg Rose (Leavenworth)
- Cashmere Park (Cashmere)
- Pennsylvania Place (Roslyn)
- Westview Villa (Cle Elum)

### Eastern Washington
- Chestnut Grove (Moses Lake)
- Vineyard Apartments (Grandview)
- Vineyard 2 Apartments (Grandview)

### Sunnyside Area
- Edison Park (Sunnyside)
- Paragon Apartments (Sunnyside)
- Valley Commons 1 Apartments (Sunnyside)
- Valley Commons 2 Apartments (Sunnyside)

**Custom Properties**: Select "Enter Custom" to add properties not in the database

## 🎯 Workflow

### Step 1: Property Information
- Select property (auto-populates address, inspector, email)
- Enter unit number
- Set inspection and notice dates
- Choose inspection type

### Step 2: Unit Layout
- Configure which rooms to inspect
- Set number of bedrooms/bathrooms
- Specify appliance count
- Define smoke alarm count

### Step 3: General Safety
- Pets indicated checkbox with details
- Bug/Pest infestation tracking
- Comprehensive smoke alarm documentation
- Safety photos

### Step 4: Appliances
- Location, type, brand, model, serial tracking
- Condition assessment
- Water heater details (temperature, plumbing, TPM valve)
- AC type specifications
- Appliance photos

### Step 5: Room-by-Room Inspection
- Navigate through each configured room
- Complete room-specific templates
- Condition ratings trigger comments
- Comments trigger photo uploads
- Automatic data persistence between rooms

### Step 6: Generate Report
- Comprehensive report with all data
- Professional formatting
- All photos embedded
- Print to PDF capability
- Email functionality

## 🖨️ Report Generation

### Print to PDF
1. Click "Print Report"
2. Browser print dialog opens
3. Select "Save as PDF"
4. Professional formatting applied automatically

### Email Report
1. Click "Email Report"
2. Default email client opens with pre-filled subject
3. Save report as PDF
4. Attach PDF to email

### Report Includes
- Property information header
- Safety compliance data
- Appliance inventory
- Room-by-room findings
- All photos with captions
- Condition summaries

## 🔧 Customization

### Brand Colors
Click color pickers in Settings Panel to customize:
- Primary color (default: #f97316 orange)
- Secondary color (default: #6b7280 gray)
- Dark color (default: #1f2937 dark gray)

### Company Logo
1. Upload logo in Settings Panel
2. Logo appears in report header
3. Optional: Lock logo for device (persists across inspections)

### Company Name
- Enter in Settings Panel
- Appears in report footer

## ⚠️ Browser Compatibility

### Fully Supported
- ✅ Chrome/Edge 90+
- ✅ Safari 14+
- ✅ Firefox 88+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android 8+)

### localStorage Requirements
- Enabled by default in all modern browsers
- Required for save/load functionality
- 5-10MB typical storage limit

### Camera Access
- Requires HTTPS for camera API (GitHub Pages provides this)
- Falls back to file upload if camera unavailable

## 📊 Technical Stack

- **Pure HTML/CSS/JavaScript** - No frameworks or dependencies
- **Responsive Design** - Mobile-first approach
- **localStorage API** - Client-side data persistence
- **FileReader API** - Photo handling
- **Print CSS** - Professional report formatting
- **Media Queries** - Adaptive layouts

## 🐛 Troubleshooting

### Photos Not Appearing
- Check browser localStorage isn't full
- Reduce photo resolution
- Take fewer photos per inspection

### Dates Showing Wrong Day
- ✅ **FIXED** as of Nov 13, 2025
- Ensure you're using the latest version
- Dates now display exactly as selected

### Rooms Not Loading Correctly
- ✅ **FIXED** as of Nov 13, 2025
- Complete room template rebuild implemented
- Verify Step 2 (Layout) is completed correctly

### Data Not Saving
- Check browser allows localStorage
- Try manual "Save Progress" button
- Check browser console for errors

### Print Formatting Issues
- Use "Print Report" button (not browser print)
- Save as PDF for best results
- Check print preview before saving

## 📝 Changelog

### Version 2.0 (November 13, 2025)
**Major Updates**
- ✅ Complete rebuild of room-by-room inspection templates
- ✅ Fixed date timezone issue (dates no longer show +1 day)
- ✅ Added pets indicated checkbox with comments
- ✅ Added bug/pest infestation tracking
- ✅ Enhanced room templates with specialized sections
- ✅ Improved photo trigger workflow
- ✅ Added exhaust fan condition to bathrooms
- ✅ Added closet subsections to entry/bedroom templates
- ✅ Added thermostat subsections to heater sections
- ✅ Improved data persistence across room navigation

### Version 1.5 (November 12, 2025)
- Added inspection notice served date field
- Enhanced smoke alarm tracking system
- Improved property database structure
- Added logo lock functionality

### Version 1.0 (November 11, 2025)
- Initial release
- 6-step inspection workflow
- Property database with 16 locations
- Basic room templates
- Photo documentation
- Report generation

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Test on both desktop and mobile
2. Verify localStorage functionality
3. Check print formatting
4. Test photo upload on iOS and Android
5. Validate all room templates

## 📧 Support

For issues or questions:
- Open a GitHub Issue
- Include browser version and device type
- Provide steps to reproduce any bugs

## 🎉 Credits

Developed for Quantum Residential property inspections.

**Special Thanks:**
- Built with modern web standards
- Optimized for mobile inspection workflows
- Designed for real-world property management use cases

---

**Note**: This is a standalone HTML application with no server-side dependencies. All data is stored locally in your browser and never transmitted to any external servers.

**Last Updated**: November 13, 2025
