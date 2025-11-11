# Quick Start Guide - Updated Federal Housing Inspection System

## 🚀 Getting Started

### Opening the Application
1. **Double-click** `index.html` in your browser
2. System loads with all compliance updates active
3. Works offline - no internet required after initial load

### File Structure
```
inspection-system/
├── index.html                          ← Open this file
├── rental-inspection-app-updated.jsx   ← Main application
├── Form_Header_Logo_1__1_.png         ← Quantum logo
└── COMPLIANCE-UPDATES-SUMMARY.md       ← This guide
```

---

## 📝 NEW FEATURES GUIDE

### 1. Inspection Notice Served Date
**Location:** Step 1 - Property & Tenant Information  
**When to use:** Every inspection (required field)

**How to use:**
1. Fill in all property information
2. Enter "Inspection Date" (date of actual inspection)
3. **NEW:** Enter "Inspection Notice Served Date" (when you notified tenant)
4. This date appears in all reports for federal compliance

**Compliance Note:** HUD and USDA require documentation of proper notice timing.

---

### 2. Appliances in ALL Rooms
**Location:** Every room inspection  
**What changed:** "Add Appliance" button now in ALL room types

**Common uses:**
- **Bedrooms:** Window A/C units, space heaters, ceiling fans
- **Bathrooms:** Exhaust fans, towel warmers, space heaters
- **Hallways:** Thermostats, smoke alarms with battery backup
- **Any room:** Portable A/C, dehumidifiers, mini-splits

**How to use:**
1. In any room, scroll to "Appliances & HVAC" section
2. Click green "Add Appliance" button
3. Select appliance type from dropdown (now includes "Air Conditioner")
4. **REQUIRED:** Enter Model # and Serial #
5. **REQUIRED:** Upload 2 photos:
   - Photo 1: Full appliance
   - Photo 2: Manufacturer label/sticker
6. Fill in remaining details

**Warning displayed if missing:**
⚠ Missing X required photo(s)

---

### 3. Model # and Serial # Requirements
**Location:** Every appliance  
**What changed:** Required fields with validation

**Red asterisk (*) indicates REQUIRED**

**Why this matters:**
- Federal audits require complete appliance identification
- Warranty claims need model/serial documentation
- LIHTC compliance inspections verify equipment
- Insurance claims require proof of equipment value

**Pro Tip:** Use your phone's camera to zoom in on manufacturer labels before typing.

---

### 4. Two-Photo Requirement
**Location:** Every appliance  
**What changed:** Mandatory 2-photo system with counter

**Required photos:**
1. **Appliance Photo:** Show entire unit, clearly visible
2. **Label Photo:** Close-up of manufacturer sticker showing:
   - Model number
   - Serial number
   - Manufacturing date (if visible)
   - Safety certifications (UL, etc.)

**System displays:**
- "Appliance Photos (0/2 required)" ← Need both
- "Appliance Photos (1/2 required)" ← Need 1 more
- "Appliance Photos (2/2 required)" ← Complete! ✓

**Why 2 photos:**
- Photo 1: Work order crews identify correct unit
- Photo 2: Vendors can look up parts, warranties, recalls
- Combined: Federal audit compliance for equipment tracking

---

### 5. Smoke Alarms in ALL Rooms
**Location:** Every room inspection  
**What changed:** Safety/Alarms section now in all rooms

**NSPIRE Requirements (automatic):**
- **Bedrooms:** REQUIRED - violation warning if missing
- **Hallways:** REQUIRED - violation warning if missing
- **Other rooms:** OPTIONAL - can document if present

**How to use:**
1. Check "Smoke Alarm Present" if one exists
2. Select type: Smoke Only, CO2 Only, or Combination
3. Select status: Working, Needs Battery, Needs Replacement
4. If not working → Work order section appears

**Best Practice:** Document all smoke alarms, even in optional locations. Shows commitment to safety beyond minimum requirements.

---

### 6. Drawer Damage Assessment (Kitchen & Bathroom)
**Location:** Storage section in Kitchens and Bathrooms  
**What changed:** Detailed damage checkboxes

**New checkboxes:**
- [ ] Tracks need repaired/replaced
- [ ] Drawer box damaged  
- [ ] Drawer face damaged

**How to use:**
1. Check "Has Drawers"
2. Enter number of drawers
3. Select overall condition (Good, Fair, Poor)
4. **NEW:** Check any damage types that apply
5. Work order auto-generates if:
   - Condition is Fair or Poor, OR
   - Any damage checkbox is marked

**Why this matters:**
- Maintenance teams know exactly what to fix
- Work orders are more accurate
- Parts ordering is more efficient
- Prevents repeat visits for missed damage

**Example:**
```
✓ Drawer box damaged
✓ Drawer face damaged
Work Order: Replace drawer box and face on drawer #3
```

---

## 🔄 WORKFLOW TIPS

### Efficient Inspection Process

**Before you arrive:**
- [ ] Inspection Notice Served Date recorded
- [ ] Phone/tablet charged
- [ ] Previous inspection report reviewed

**During inspection:**
1. **Step 1:** Property info (5 min)
   - Don't forget: Inspection Notice Served Date
2. **Step 2:** Room configuration (2 min)
3. **Step 3:** Global systems (10 min)
4. **Step 4:** Room-by-room (15-20 min per room)
   - Take appliance photos immediately
   - Note model/serial from photos
   - Check all damage boxes thoroughly
5. **Step 5:** Generate report (5 min)

**Time savers:**
- Use voice input for notes (mobile devices)
- Take all photos first, enter data later
- Use "Add Appliance" liberally - better over-documented than under

### Photo Strategy
**Option 1 - Take now:**
- Tap "Choose File" button
- Use device camera
- Take photo immediately
- Repeat for second photo

**Option 2 - Upload later:**
- Take all photos during walk-through
- Return to desk
- Upload photos from phone/camera
- Match to correct appliances

**Pro Tip:** Name photos descriptively:
- Unit_123_Kitchen_Fridge_Full.jpg
- Unit_123_Kitchen_Fridge_Label.jpg

---

## ⚠️ COMMON QUESTIONS

### Q: Do I need to add heating/cooling as appliances?
**A:** Yes, for window A/C units, portable heaters, space heaters, or room-specific HVAC. The system now tracks per-room climate control.

### Q: What if I can't find the model/serial number?
**A:** Take a photo of any identifying labels. If truly missing:
1. Enter "NOT VISIBLE" in both fields
2. Add note: "Label obscured/missing"
3. Photo work order to install new label

### Q: Do smoke alarms in living rooms need photos?
**A:** Not required, but recommended. Document everything for complete records.

### Q: Can I skip the Inspection Notice Served Date?
**A:** No - it's a required field for federal compliance. Must document proper notice was given.

### Q: What if a room has 10 drawers and 5 are damaged?
**A:** 
1. Enter "10" for drawer count
2. Check damage boxes that apply
3. In notes field: "Drawers #2, #4, #6, #8, #10 damaged - tracks need repair"

---

## 🎯 COMPLIANCE CHECKLIST

Before submitting any inspection:
- [ ] Inspection Notice Served Date entered
- [ ] All appliances have model #
- [ ] All appliances have serial #
- [ ] All appliances have 2 photos minimum
- [ ] Smoke alarms documented in bedrooms
- [ ] Smoke alarms documented in hallways
- [ ] Kitchen drawers assessed if present
- [ ] Bathroom drawers assessed if present
- [ ] All work orders have photos
- [ ] Report generated successfully

---

## 🆘 TROUBLESHOOTING

**Problem:** Can't add appliances to bedroom  
**Solution:** Bug fixed - button now appears in all rooms

**Problem:** "Vinyl Plank" not in dropdown  
**Solution:** Updated - should appear between "Vinyl" and "Hardwood"

**Problem:** Model # field won't accept dashes  
**Solution:** All characters allowed - try copying/pasting

**Problem:** Photo upload fails  
**Solution:** 
1. Check file size (< 10MB recommended)
2. Use JPG/PNG format
3. Try taking photo directly with camera button

**Problem:** Inspection Notice Served Date missing  
**Solution:** Updated system - field should be between Inspection Date and Inspection Type

---

## 📞 SUPPORT CONTACTS

**Technical Issues:**
- Review COMPLIANCE-UPDATES-SUMMARY.md
- Check browser console for errors (F12)

**Compliance Questions:**
- **Inspector:** Ellie McNelley
- **Partner Inspector:** Julian Rubio
- **Property Manager:** [Contact info]

**Federal Standards:**
- HUD NSPIRE Documentation
- USDA Rural Development Guidelines
- LIHTC Compliance Manual

---

**System Version:** Updated November 10, 2025  
**Compliance Status:** ✅ Federal Audit Ready  
**Inspector:** Ellie McNelley, Quantum Residential
