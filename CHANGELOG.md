# Changelog

All notable changes to the Rent Inspect System are documented in this file.

## [2.0.0] - 2025-11-13

### 🎉 Major Updates from Today's Conversations

#### Room-by-Room Inspection Templates (Conversation 1)
**Complete System Rebuild**

**Added**
- ✅ Dynamic room template generation system
- ✅ Specialized templates for 9 room types:
  - Entry Room
  - Kitchen
  - Dining Room
  - Living Room
  - Bedroom (supports multiple)
  - Bathroom (supports multiple)
  - Laundry Room
  - Hallway/Stairway (supports multiple)
  - Outside Deck/Patio

**Entry Room Template**
- Door section (quantity, type, dimensions, locks, condition)
- Threshold condition assessment
- Flooring (type and condition)
- Optional closet subsection (door and opening conditions)
- Walls/Ceiling condition
- Bullnose/Corners condition
- Outlets section
- Light fixtures and switches

**Kitchen Template**
- All Entry features plus:
- GFI outlets with functioning/tested/loose checkboxes
- Sink condition and plumbing
- Cabinets, shelves, and drawers
- Mold check with comment field
- Appliance-specific features

**Dining Room & Living Room Templates**
- Door, threshold, flooring
- Windows section (measurements, blind measurements, covering type)
- Window operations (open/lock checkboxes)
- Window covering, sill, and screen conditions
- Heater section with type selection
- Baseboard length tracking (for baseboard heaters)
- Optional thermostat subsection (type and condition)
- Walls, bullnose, outlets, lighting

**Bedroom Template**
- All dining/living features
- Optional closet subsection (like Entry)
- Closet door (quantity, type, dimensions, condition)
- Closet opening condition

**Bathroom Template**
- Door, threshold, flooring
- GFI outlets
- Sink with shutoff access checkbox
- Sink and plumbing conditions
- Toilet (fixed to floor checkbox, caulking, plumbing)
- Tub/Shower (type, condition, fixtures, plumbing)
- Exhaust fan condition
- Medicine cabinet/mirror condition
- Cabinets, shelves, drawers
- Drawer track conditions (Good/Needs Repair/Needs Replacement)
- Mold check
- Walls, bullnose, outlets, lighting

**Hallway/Stairway Template**
- Flooring only (no door/threshold)
- Heater with optional thermostat
- Walls, bullnose, outlets, lighting

**Laundry Room Template**
- Basic inspection (door, threshold, flooring, walls, outlets, lighting)

**Outside Deck/Patio Template**
- Surface condition
- Railing condition

**Enhanced Workflow**
- Condition ratings (Excellent/Good/Fair/Poor/N/A)
- Fair or Poor ratings automatically reveal comment field
- Comments automatically trigger photo upload buttons
- Photo buttons labeled with room name, section, and comment preview
- Multiple photos per issue with automatic numbering

**Fixed**
- Room data persistence across navigation
- Room template loading errors
- Data not appearing in generated reports
- Room data copying between different rooms
- Room navigation skipping issues

#### Date Population Fix (Conversation 2)
**Fixed Timezone Issue**

**Problem**
- Dates selected in Property Information were displaying +1 day in header
- Example: Selected 2024-11-13, displayed as 2024-11-14
- Caused by timezone conversion when using `new Date(dateString)`

**Solution**
- Implemented `formatDateWithoutTimezone()` helper function
- Manually parses date string without timezone conversion
- Creates date using local timezone components
- Applied to both Inspection Date and Notice Served Date

**Code Changes**
```javascript
// New function added (around line 1071)
function formatDateWithoutTimezone(dateString) {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString();
}

// Updated header info function
document.getElementById('headerDate').textContent = date ? formatDateWithoutTimezone(date) : '-';
document.getElementById('headerNoticeDate').textContent = noticeDate ? formatDateWithoutTimezone(noticeDate) : '-';
```

**Result**
- ✅ Dates now display exactly as selected
- ✅ No more +1 day error
- ✅ Consistent date display across all browsers
- ✅ Works regardless of user's timezone

### Enhanced Features

**Pets Indicated Section**
- Checkbox in General Safety step
- Hidden comment field reveals on check
- Space for pet details (type, number, etc.)

**Bug/Pest Infestation Section**
- Checkbox in General Safety step
- Hidden comment field for details
- Location, type, and severity tracking

**Housekeeping Section**
- Added to all room templates
- Clean/Needs Cleaning/Unacceptable/N/A options
- Comment field for anything below "Clean"
- Photos can be triggered from comments

**Light Fixtures Enhancement**
- Quantity fields for bulbs and switches
- Separate condition tracking for:
  - Light fixtures
  - Light bulbs
  - Light switches
- Individual comment fields

### Technical Improvements

**Data Structure**
- Rooms now use `room.data` object for clean persistence
- Proper field ID naming conventions
- Separated room navigation from data saving

**Photo System**
- Context-based photo storage (`safety`, `appliance`, `room`)
- Photo metadata includes: data, title, comment, displayTitle
- Automatic numbering for multiple photos of same issue
- Grid-based photo preview with delete buttons

**Report Generation**
- Comprehensive data extraction from all steps
- Photos embedded with captions
- Professional table formatting
- Color-coordinated section headers
- Print-optimized CSS

### Bug Fixes

**Critical Fixes**
- ✅ Room templates now generate correctly
- ✅ Room data no longer copies between rooms
- ✅ Room navigation works smoothly
- ✅ All room data appears in reports
- ✅ Photos from all sections included in reports
- ✅ Dates display correctly without timezone issues

**Data Persistence**
- ✅ Room data saves when navigating between rooms
- ✅ Field values restore correctly
- ✅ Checkboxes maintain state
- ✅ Radio buttons preserve selections
- ✅ Comment fields persist across navigation

**UI/UX Improvements**
- ✅ Comment fields show/hide based on conditions
- ✅ Photo buttons appear when comments added
- ✅ Room indicator shows current room progress
- ✅ Navigation buttons work correctly
- ✅ Step indicator updates properly

## [1.5.0] - 2025-11-12

### Added
- Inspection Notice Served Date field (required)
- Comprehensive smoke alarm tracking system
- Enhanced property database structure
- Logo lock functionality for device persistence
- Vinyl Plank flooring option
- Water heater detailed tracking (temperature, plumbing, TPM valve)
- AC type selection for air conditioner appliances

### Changed
- Moved room configuration before safety checks
- Enhanced smoke alarm entries with location dropdowns
- Updated model/serial fields to display uppercase
- Improved housekeeping section logic

### Fixed
- Unicode character display issues
- Navigation button rendering
- Emoji display in section headers

## [1.0.0] - 2025-11-11

### Initial Release

**Core Features**
- 6-step inspection workflow
- Property information management
- Property database with 16 pre-configured locations
- Unit layout configuration
- General safety checks
- Appliance documentation
- Room-by-room inspection
- Professional report generation

**Property Database**
- 16 Quantum Residential properties across Washington
- Automatic address population
- Inspector assignment by property
- Email integration

**Photo Documentation**
- Mobile camera integration
- Multiple photos per issue
- Photo preview with delete
- Photos embedded in reports

**Data Management**
- localStorage for progress saving
- Auto-save on refresh
- Manual save/load buttons
- Browser refresh protection

**Customization**
- Company name field
- Logo upload
- Brand color customization (primary, secondary, dark)
- Inspection type selection

**Report Features**
- Professional formatting
- Print to PDF
- Email integration
- All data included
- Photo captions

---

## Version Numbering

This project uses [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

## Today's Changes Summary

**Version 2.0.0** represents a significant milestone with two major updates:

1. **Room Template System Rebuild**: Complete reimplementation of the room inspection workflow with dynamic template generation, specialized room types, and improved data persistence.

2. **Date Display Fix**: Critical bug fix for timezone-related date display issues affecting all users across different timezones.

These changes were implemented on **November 13, 2025** based on user feedback and testing from the previous day's deployment.

---

**Links**
- [Unreleased Changes](https://github.com/YOUR-USERNAME/rent-inspect-system/compare/v2.0.0...HEAD)
- [v2.0.0 Release](https://github.com/YOUR-USERNAME/rent-inspect-system/releases/tag/v2.0.0)
