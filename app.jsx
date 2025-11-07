/**
 * NSPIRE-COMPLIANT RENTAL UNIT INSPECTION SYSTEM
 * React JSX Version - COMPLETE
 * 
 * FEDERAL COMPLIANCE STANDARDS:
 * - HUD NSPIRE (National Standards for the Physical Inspection of Real Estate)
 * - HOME Investment Partnerships Program (24 CFR Part 92)
 * - Low-Income Housing Tax Credit (LIHTC) Requirements (26 USC § 42)
 * - USDA Rural Development Multifamily Housing with Rental Assistance (7 CFR Part 3560)
 * - Fair Housing Act (24 CFR Part 100)
 * - Section 504 Accessibility (24 CFR Part 8)
 * - Section 8 Housing Quality Standards (24 CFR Part 982)
 * - State and Local Landlord-Tenant Laws
 * 
 * PRIORITY: Law and Regulation Compliance Over All Else
 * 
 * LEGAL NOTICE:
 * This inspection tool assists with compliance but does not replace professional legal counsel.
 * Property owners and managers are solely responsible for ensuring full compliance with
 * all applicable federal, state, and local regulations.
 */

// Get React hooks from global React object
const { useState, useRef, useEffect } = React;

// ==================== CONSTANTS ====================
const PROPERTY_NAMES = [
    'Park Village 1 & 2',
    'Maple Court',
    'Oak Ridge Apartments',
    'Riverside Terrace',
    'Other (Custom)'
];

const PROPERTY_NUMBERS = ['P56100', '001', '002', '003', '004', 'Other (Custom)'];

const PROPERTY_ADDRESSES = [
    '502 South 5th Street',
    '554 South 5th Street',
    'Other (Custom)'
];

const INSPECTORS = [
    'Ellie McNelley',
    'Julian Rubio',
    'John Smith',
    'Sarah Johnson',
    'Michael Brown',
    'Other (Custom)'
];

const BUILDINGS = ['A', 'B', 'C', 'D', 'E', 'F', 'Other (Custom)'];

const UNIT_TYPES = [
    'Studio',
    '1 Bedroom',
    '2 Bedroom',
    '3 Bedroom',
    '4 Bedroom',
    '5 Bedroom'
];

const PROGRAM_TYPES = [
    'HUD',
    'HOME',
    'LIHTC',
    'USDA Rural Development',
    'Section 8',
    'Fair Housing Act',
    'Other'
];

const FLOORING_TYPES = [
    'Carpet',
    'Vinyl',
    'Hardwood',
    'Linoleum',
    'Vinyl Plank',
    'Cement',
    'Tile',
    'Laminate'
];

const CONDITIONS = ['New', 'Good', 'Fair', 'Poor', 'N/A'];
const INSTALL_DATES = ['Unknown', 'Pre-Rehab', 'Original', 'Custom'];
const ACTIONS = ['None', 'Repair', 'Replace', 'Diagnose'];

const APPLIANCE_TYPES = [
    'Refrigerator',
    'Stove/Range',
    'Range Hood',
    'Dishwasher',
    'Garbage Disposal',
    'Microwave',
    'Washer',
    'Dryer',
    'Other'
];

const DOOR_WIDTHS = ['28"', '30"', '32"', '36"', 'Custom'];
const DOOR_HEIGHTS = ['80"', '84"', '96"', 'Custom'];

const HEATING_TYPES = [
    'Central Furnace',
    'Baseboard',
    'Radiator',
    'Mini-Split',
    'Other'
];

const HEATING_FUELS = [
    'Electric',
    'Natural Gas',
    'Propane',
    'Oil',
    'Other'
];

// ==================== NSPIRE COMPLIANCE REQUIREMENTS ====================
const NSPIRE_REQUIREMENTS = {
    smokeAlarms: {
        bedrooms: 'REQUIRED in each bedroom per NSPIRE standards',
        hallways: 'REQUIRED in hallways serving bedrooms',
        floors: 'REQUIRED on each floor level',
        type: 'Must be photoelectric or ionization, approved by testing laboratory'
    },
    co2Alarms: {
        required: 'REQUIRED within 15 feet of bedrooms if fuel-burning appliances present',
        type: 'Electrochemical sensor recommended'
    },
    gfiProtection: {
        kitchen: 'REQUIRED for all outlets within 6 feet of sink (NEC 210.8)',
        bathroom: 'REQUIRED for all bathroom outlets (NEC 210.8)',
        outdoor: 'REQUIRED for all outdoor outlets',
        garage: 'REQUIRED for all garage outlets'
    },
    railings: {
        stairs: 'REQUIRED for 3 or more risers per NSPIRE (IRC requires 4+)',
        height: 'Between 34-38 inches from nosing',
        graspability: 'Must be graspable, 1.25 to 2 inches diameter'
    },
    windowLocks: {
        ground: 'REQUIRED for all ground floor windows',
        accessible: 'REQUIRED for accessible windows',
        type: 'Functioning locks required'
    },
    doors: {
        entry: {
            width: 'Minimum 32 inches clear opening (36" door)',
            deadbolt: 'REQUIRED on all entry doors'
        }
    },
    waterHeater: {
        tpr: 'Temperature/Pressure Relief valve REQUIRED',
        shutoff: 'Shut-off valve REQUIRED',
        flue: 'Gas flue REQUIRED for gas water heaters'
    },
    ventilation: {
        bathroom: 'REQUIRED - operable window or mechanical ventilation'
    }
};

// ==================== UTILITY FUNCTIONS ====================
const generateId = () => `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};

const generateFilename = (inspection) => {
    const { propertyName, propertyNameCustom, unitNumber, tenantFirstName, tenantLastName, todaysDate } = inspection;
    const propName = propertyName === 'Other (Custom)' ? propertyNameCustom : propertyName;
    const initial = tenantFirstName.charAt(0).toUpperCase();
    const lastName = tenantLastName.replace(/\s+/g, '').replace(/-/g, '');
    const formattedDate = formatDate(todaysDate);
    return `${propName} ${unitNumber} ${initial}${lastName} Bi-annual Unit Inspection ${formattedDate}`;
};

// ==================== ROOM & APPLIANCE CREATORS ====================
const createRoom = (type, name) => ({
    id: generateId(),
    type,
    name,
    
    // Housekeeping
    closetsPresent: false,
    closetCount: 0,
    housekeeping: 'Yes',
    housekeepingComments: '',
    housekeepingPhotos: [],
    housekeepingWO: false,
    housekeepingWONumber: '',
    
    // Safety Devices (Critical for NSPIRE)
    hasSmokeAlarm: false,
    hasComboAlarm: false,
    hasCO2Alarm: false,
    alarmStatus: 'Working',
    alarmComments: '',
    alarmPhotos: [],
    alarmWO: false,
    alarmWONumber: '',
    
    // Flooring
    flooringType: '',
    flooringInstallDate: 'Unknown',
    flooringCustomDate: '',
    flooringCondition: 'Good',
    flooringComments: '',
    flooringPhotos: [],
    flooringWO: false,
    flooringWONumber: '',
    
    // Walls
    wallsCondition: 'Good',
    paintDefective: false,
    bullnoseCondition: 'Good',
    closetOpeningsCondition: 'Good',
    wallsComments: '',
    wallsPhotos: [],
    wallsWO: false,
    wallsWONumber: '',
    
    // Entry Door
    entryDoorPresent: true,
    doorType: '',
    doorWidth: '30"',
    doorWidthCustom: '',
    doorHeight: '80"',
    doorHeightCustom: '',
    doorCondition: 'Good',
    doorDeadBolt: false,
    doorComments: '',
    doorPhotos: [],
    doorWO: false,
    doorWONumber: '',
    
    // Electrical (Critical for NSPIRE)
    outletCount: 0,
    gfiProtection: false,
    gfiComments: '',
    gfiPhotos: [],
    gfiWO: false,
    gfiWONumber: '',
    
    // Windows (Critical for NSPIRE)
    windowCount: 0,
    windowsOperable: true,
    windowLocks: true,
    windowsCondition: 'Good',
    windowsComments: '',
    windowsPhotos: [],
    windowsWO: false,
    windowsWONumber: '',
    
    // Ceiling
    ceiling: 'Good',
    ceilingComments: '',
    ceilingPhotos: [],
    ceilingWO: false,
    ceilingWONumber: '',
    
    // Plumbing (Kitchen/Bathroom)
    hasSink: type === 'kitchen' || type === 'bathroom',
    sinkCondition: 'Good',
    sinkDrains: true,
    sinkLeaks: false,
    sinkComments: '',
    sinkPhotos: [],
    sinkWO: false,
    sinkWONumber: '',
    
    faucetCondition: 'Good',
    faucetLeaks: false,
    faucetPressure: 'Good',
    faucetComments: '',
    faucetPhotos: [],
    faucetWO: false,
    faucetWONumber: '',
    
    // Toilet (Bathroom only)
    hasToilet: type === 'bathroom',
    toiletCondition: 'Good',
    toiletFlushes: true,
    toiletLeaks: false,
    toiletSecure: true,
    toiletComments: '',
    toiletPhotos: [],
    toiletWO: false,
    toiletWONumber: '',
    
    // Tub/Shower (Bathroom only)
    hasTubShower: type === 'bathroom',
    tubShowerType: '',
    tubShowerCondition: 'Good',
    tubShowerDrains: true,
    tubShowerLeaks: false,
    tubShowerComments: '',
    tubShowerPhotos: [],
    tubShowerWO: false,
    tubShowerWONumber: '',
    
    // Ventilation (Critical for bathroom NSPIRE compliance)
    hasVentilation: type === 'bathroom',
    ventilationType: '',
    ventilationWorks: true,
    ventilationComments: '',
    ventilationPhotos: [],
    ventilationWO: false,
    ventilationWONumber: '',
    
    // Stairway (if applicable)
    hasStairway: type === 'stairway',
    stairwayRises: 0,
    stairwayRailing: false,
    railingSecure: true,
    railingHeight: '',
    railingComments: '',
    railingPhotos: [],
    railingWO: false,
    railingWONumber: '',
    
    // Appliances
    appliances: [],
    
    // General
    generalComments: '',
    generalPhotos: []
});

const createAppliance = (type) => ({
    id: generateId(),
    type,
    brand: '',
    model: '',
    serial: '',
    installDate: 'Unknown',
    customInstallDate: '',
    condition: 'Good',
    action: 'None',
    comments: '',
    photos: [],
    workOrder: false,
    woNumber: ''
});

// ==================== MAIN APP COMPONENT ====================
const InspectionApp = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
    
    const [inspection, setInspection] = useState({
        // Step 1: Property & Tenant Information
        noticeServedDate: '',
        propertyName: '',
        propertyNameCustom: '',
        propertyNumber: '',
        propertyNumberCustom: '',
        propertyAddress: '',
        propertyAddressCustom: '',
        todaysDate: new Date().toISOString().split('T')[0],
        inspector: '',
        inspectorCustom: '',
        building: '',
        buildingCustom: '',
        unitNumber: '',
        unitType: '',
        tenantFirstName: '',
        tenantLastName: '',
        programType: [],
        
        // Step 2: Unit Layout
        bedrooms: 0,
        bathrooms: 0,
        hasKitchen: true,
        hasLivingRoom: true,
        hasDiningRoom: false,
        hasLaundryRoom: false,
        hallways: 0,
        stairways: 0,
        hasOutsideDeck: false,
        hasYard: false,
        rooms: [],
        
        // Step 3: Global Features
        heatingType: '',
        heatingFuel: '',
        coolingType: '',
        waterAccessible: true,
        waterPressure: 'Good',
        hotWaterFunctional: true,
        
        // Step 5: Water Heater Safety (Critical NSPIRE)
        waterHeater: {
            present: false,
            location: '',
            installDate: 'Unknown',
            customInstallDate: '',
            hasTPRValve: false,
            tprPipePresent: false,
            tprPipeTerminates: '',
            hasShutOff: false,
            hasGasFlue: false,
            condition: 'Good',
            action: 'None',
            comments: '',
            photos: [],
            workOrder: false,
            woNumber: ''
        },
        
        // Step 6: General Safety
        generalSafety: {
            utilitiesOn: true,
            unitClean: true,
            dryerVentOutside: true,
            amenitiesWork: true,
            doorsSecure: true,
            locksWork: true,
            electricalSafe: true,
            windowsSecure: true,
            exteriorIssues: false,
            petsPresent: false,
            pestsPresent: false,
            comments: '',
            photos: [],
            workOrder: false,
            woNumber: ''
        },
        
        // Step 7: Report
        reportNotes: '',
        complianceStatement: true
    });

    // ==================== UPDATE FUNCTIONS ====================
    const updateField = (field, value) => {
        setInspection(prev => ({ ...prev, [field]: value }));
    };

    const updateProgramType = (type, checked) => {
        setInspection(prev => ({
            ...prev,
            programType: checked 
                ? [...prev.programType, type]
                : prev.programType.filter(t => t !== type)
        }));
    };

    const updateRoom = (roomId, field, value) => {
        setInspection(prev => ({
            ...prev,
            rooms: prev.rooms.map(room =>
                room.id === roomId ? { ...room, [field]: value } : room
            )
        }));
    };

    const addAppliance = (roomId, applianceType) => {
        setInspection(prev => ({
            ...prev,
            rooms: prev.rooms.map(room =>
                room.id === roomId 
                    ? { ...room, appliances: [...room.appliances, createAppliance(applianceType)] }
                    : room
            )
        }));
    };

    const updateAppliance = (roomId, applianceId, field, value) => {
        setInspection(prev => ({
            ...prev,
            rooms: prev.rooms.map(room =>
                room.id === roomId
                    ? {
                        ...room,
                        appliances: room.appliances.map(app =>
                            app.id === applianceId ? { ...app, [field]: value } : app
                        )
                    }
                    : room
            )
        }));
    };

    const removeAppliance = (roomId, applianceId) => {
        setInspection(prev => ({
            ...prev,
            rooms: prev.rooms.map(room =>
                room.id === roomId
                    ? { ...room, appliances: room.appliances.filter(app => app.id !== applianceId) }
                    : room
            )
        }));
    };

    const updateWaterHeater = (field, value) => {
        setInspection(prev => ({
            ...prev,
            waterHeater: { ...prev.waterHeater, [field]: value }
        }));
    };

    const updateGeneralSafety = (field, value) => {
        setInspection(prev => ({
            ...prev,
            generalSafety: { ...prev.generalSafety, [field]: value }
        }));
    };

    // ==================== ROOM INITIALIZATION ====================
    const initializeRooms = () => {
        const rooms = [];
        
        for (let i = 1; i <= inspection.bedrooms; i++) {
            rooms.push(createRoom('bedroom', `Bedroom ${i}`));
        }
        
        for (let i = 1; i <= inspection.bathrooms; i++) {
            rooms.push(createRoom('bathroom', `Bathroom ${i}`));
        }
        
        if (inspection.hasKitchen) rooms.push(createRoom('kitchen', 'Kitchen'));
        if (inspection.hasLivingRoom) rooms.push(createRoom('livingRoom', 'Living Room'));
        if (inspection.hasDiningRoom) rooms.push(createRoom('diningRoom', 'Dining Room'));
        if (inspection.hasLaundryRoom) rooms.push(createRoom('laundryRoom', 'Laundry Room'));
        
        for (let i = 1; i <= inspection.hallways; i++) {
            rooms.push(createRoom('hallway', `Hallway ${i}`));
        }
        
        for (let i = 1; i <= inspection.stairways; i++) {
            rooms.push(createRoom('stairway', `Stairway ${i}`));
        }
        
        if (inspection.hasOutsideDeck) rooms.push(createRoom('deck', 'Outside Deck'));
        if (inspection.hasYard) rooms.push(createRoom('yard', 'Yard'));
        
        setInspection(prev => ({ ...prev, rooms }));
    };

    // ==================== PHOTO HANDLERS ====================
    const handlePhotoUpload = (e, section, fieldPrefix, roomId = null) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            if (file.size > 10485760) { // 10MB limit
                alert(`File ${file.name} is too large. Maximum size is 10MB.`);
                return;
            }
            
            const reader = new FileReader();
            reader.onloadend = () => {
                const photo = {
                    id: generateId(),
                    data: reader.result,
                    filename: file.name,
                    timestamp: new Date().toISOString(),
                    comment: ''
                };
                
                if (roomId) {
                    // Room photo
                    updateRoom(roomId, `${fieldPrefix}Photos`, [
                        ...inspection.rooms.find(r => r.id === roomId)[`${fieldPrefix}Photos`],
                        photo
                    ]);
                } else if (section === 'waterHeater') {
                    // Water heater photo
                    updateWaterHeater('photos', [...inspection.waterHeater.photos, photo]);
                } else if (section === 'generalSafety') {
                    // General safety photo
                    updateGeneralSafety('photos', [...inspection.generalSafety.photos, photo]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const removePhoto = (section, fieldPrefix, photoId, roomId = null) => {
        if (roomId) {
            const room = inspection.rooms.find(r => r.id === roomId);
            updateRoom(roomId, `${fieldPrefix}Photos`, 
                room[`${fieldPrefix}Photos`].filter(p => p.id !== photoId)
            );
        } else if (section === 'waterHeater') {
            updateWaterHeater('photos', inspection.waterHeater.photos.filter(p => p.id !== photoId));
        } else if (section === 'generalSafety') {
            updateGeneralSafety('photos', inspection.generalSafety.photos.filter(p => p.id !== photoId));
        }
    };

    const updatePhotoComment = (section, fieldPrefix, photoId, comment, roomId = null) => {
        if (roomId) {
            const room = inspection.rooms.find(r => r.id === roomId);
            updateRoom(roomId, `${fieldPrefix}Photos`,
                room[`${fieldPrefix}Photos`].map(p => p.id === photoId ? { ...p, comment } : p)
            );
        } else if (section === 'waterHeater') {
            updateWaterHeater('photos',
                inspection.waterHeater.photos.map(p => p.id === photoId ? { ...p, comment } : p)
            );
        } else if (section === 'generalSafety') {
            updateGeneralSafety('photos',
                inspection.generalSafety.photos.map(p => p.id === photoId ? { ...p, comment } : p)
            );
        }
    };

    // ==================== NAVIGATION ====================
    const validateCurrentStep = () => {
        switch(currentStep) {
            case 1:
                return inspection.noticeServedDate && 
                       (inspection.propertyName && (inspection.propertyName !== 'Other (Custom)' || inspection.propertyNameCustom)) &&
                       (inspection.propertyNumber && (inspection.propertyNumber !== 'Other (Custom)' || inspection.propertyNumberCustom)) &&
                       (inspection.propertyAddress && (inspection.propertyAddress !== 'Other (Custom)' || inspection.propertyAddressCustom)) &&
                       inspection.todaysDate &&
                       (inspection.inspector && (inspection.inspector !== 'Other (Custom)' || inspection.inspectorCustom)) &&
                       (inspection.building && (inspection.building !== 'Other (Custom)' || inspection.buildingCustom)) &&
                       inspection.unitNumber &&
                       inspection.unitType &&
                       inspection.tenantFirstName &&
                       inspection.tenantLastName &&
                       inspection.programType.length > 0;
            case 2:
                return inspection.bedrooms > 0 && inspection.bathrooms > 0;
            case 3:
                return inspection.heatingType && 
                       (inspection.heatingType !== 'Central Furnace' || inspection.heatingFuel);
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (!validateCurrentStep()) {
            alert('Please complete all required fields before continuing.');
            return;
        }
        if (currentStep === 2 && inspection.rooms.length === 0) {
            initializeRooms();
        }
        if (currentStep < 7) setCurrentStep(currentStep + 1);
    };

    const previousStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const nextRoom = () => {
        if (currentRoomIndex < inspection.rooms.length - 1) {
            setCurrentRoomIndex(currentRoomIndex + 1);
        } else {
            nextStep();
        }
    };

    const previousRoom = () => {
        if (currentRoomIndex > 0) {
            setCurrentRoomIndex(currentRoomIndex - 1);
        } else {
            previousStep();
        }
    };

    // ==================== COMPLIANCE CHECKS ====================
    const checkCompliance = () => {
        const violations = [];
        
        // Check smoke alarms in bedrooms
        inspection.rooms.filter(r => r.type === 'bedroom').forEach(room => {
            if (!room.hasSmokeAlarm && !room.hasComboAlarm) {
                violations.push(`⚠️ CRITICAL: Missing smoke alarm in ${room.name} - NSPIRE VIOLATION`);
            }
        });
        
        // Check CO2 alarms if fuel-burning heat
        const hasFuelBurning = inspection.heatingFuel && inspection.heatingFuel !== 'Electric';
        if (hasFuelBurning) {
            const hasCO2 = inspection.rooms.some(r => r.hasCO2Alarm || r.hasComboAlarm);
            if (!hasCO2) {
                violations.push('⚠️ CRITICAL: Missing CO2 alarm required for fuel-burning heating - NSPIRE VIOLATION');
            }
        }
        
        // Check GFI protection
        inspection.rooms.filter(r => r.type === 'kitchen' || r.type === 'bathroom').forEach(room => {
            if (!room.gfiProtection && room.outletCount > 0) {
                violations.push(`⚠️ CRITICAL: Missing GFI protection in ${room.name} - NSPIRE VIOLATION`);
            }
        });
        
        // Check bathroom ventilation
        inspection.rooms.filter(r => r.type === 'bathroom').forEach(room => {
            if (!room.hasVentilation) {
                violations.push(`⚠️ CRITICAL: Missing ventilation in ${room.name} - NSPIRE VIOLATION`);
            }
        });
        
        // Check stairway railings
        inspection.rooms.filter(r => r.type === 'stairway').forEach(room => {
            if (room.stairwayRises >= 3 && !room.stairwayRailing) {
                violations.push(`⚠️ CRITICAL: Missing railing for ${room.name} (${room.stairwayRises} rises) - NSPIRE VIOLATION`);
            }
        });
        
        // Check water heater safety
        if (inspection.waterHeater.present) {
            if (!inspection.waterHeater.hasTPRValve) {
                violations.push('⚠️ CRITICAL: Missing TPR valve on water heater - NSPIRE VIOLATION');
            }
            if (!inspection.waterHeater.hasShutOff) {
                violations.push('⚠️ CRITICAL: Missing shut-off valve on water heater - NSPIRE VIOLATION');
            }
            if (inspection.heatingFuel && inspection.heatingFuel.includes('Gas') && !inspection.waterHeater.hasGasFlue) {
                violations.push('⚠️ CRITICAL: Missing gas flue on gas water heater - NSPIRE VIOLATION');
            }
        }
        
        return violations;
    };

    // ==================== PRINT/EMAIL ====================
    const generateReport = () => {
        const violations = checkCompliance();
        
        if (violations.length > 0) {
            const proceed = window.confirm(
                'NSPIRE COMPLIANCE VIOLATIONS DETECTED:\n\n' +
                violations.join('\n\n') +
                '\n\nDo you want to proceed with generating the report? These violations must be addressed.'
            );
            if (!proceed) return;
        }
        
        // Generate print-ready report
        window.print();
    };

    const emailReport = () => {
        const subject = encodeURIComponent(generateFilename(inspection));
        const body = encodeURIComponent(
            `NSPIRE-Compliant Unit Inspection Report\n\n` +
            `Property: ${inspection.propertyName}\n` +
            `Unit: ${inspection.unitNumber}\n` +
            `Tenant: ${inspection.tenantFirstName} ${inspection.tenantLastName}\n` +
            `Date: ${formatDate(inspection.todaysDate)}\n\n` +
            `Please find attached the inspection report.`
        );
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    // ==================== RENDER ====================
    return (
        <div className="screen-only">
            <div className="app-header">
                <h1>🏠 NSPIRE-Compliant Rental Unit Inspection</h1>
                <p className="subtitle">Federal Housing Standards: HUD | HOME | LIHTC | USDA Rural Development | Section 8</p>
                <p className="compliance-notice">⚠️ STRICT FEDERAL COMPLIANCE MODE ACTIVE</p>
            </div>

            <ProgressBar currentStep={currentStep} goToStep={setCurrentStep} />

            {currentStep === 1 && <Step1 inspection={inspection} updateField={updateField} updateProgramType={updateProgramType} />}
            {currentStep === 2 && <Step2 inspection={inspection} updateField={updateField} />}
            {currentStep === 3 && <Step3 inspection={inspection} updateField={updateField} />}
            {currentStep === 4 && <Step4 
                inspection={inspection} 
                currentRoomIndex={currentRoomIndex} 
                setCurrentRoomIndex={setCurrentRoomIndex}
                updateRoom={updateRoom}
                addAppliance={addAppliance}
                updateAppliance={updateAppliance}
                removeAppliance={removeAppliance}
                handlePhotoUpload={handlePhotoUpload}
                removePhoto={removePhoto}
                updatePhotoComment={updatePhotoComment}
                nextRoom={nextRoom}
                previousRoom={previousRoom}
            />}
            {currentStep === 5 && <Step5 
                inspection={inspection} 
                updateWaterHeater={updateWaterHeater}
                handlePhotoUpload={handlePhotoUpload}
                removePhoto={removePhoto}
                updatePhotoComment={updatePhotoComment}
            />}
            {currentStep === 6 && <Step6 
                inspection={inspection} 
                updateGeneralSafety={updateGeneralSafety}
                handlePhotoUpload={handlePhotoUpload}
                removePhoto={removePhoto}
                updatePhotoComment={updatePhotoComment}
            />}
            {currentStep === 7 && <Step7 
                inspection={inspection} 
                updateField={updateField} 
                generateReport={generateReport} 
                emailReport={emailReport}
                checkCompliance={checkCompliance}
            />}

            {currentStep !== 4 && currentStep !== 7 && (
                <div className="btn-group">
                    <button className="btn btn-secondary" onClick={previousStep} disabled={currentStep === 1}>
                        ← Previous
                    </button>
                    <button className="btn btn-primary" onClick={nextStep} disabled={!validateCurrentStep()}>
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
};

// ==================== PROGRESS BAR COMPONENT ====================
const ProgressBar = ({ currentStep, goToStep }) => {
    const steps = [
        'Property Info',
        'Unit Layout',
        'Global Features',
        'Room Inspections',
        'Water Heater',
        'General/Safety',
        'Generate Report'
    ];

    return (
        <div className="progress-container">
            <div className="progress-header">
                <span className="progress-title">Inspection Progress</span>
                <span className="progress-step">Step {currentStep} of 7</span>
            </div>
            <div className="progress-bar">
                {steps.map((_, index) => (
                    <div
                        key={index}
                        className={`progress-segment ${
                            index + 1 < currentStep ? 'complete' :
                            index + 1 === currentStep ? 'active' : ''
                        }`}
                        onClick={() => goToStep(index + 1)}
                    />
                ))}
            </div>
            <div className="progress-labels">
                {steps.map((step, index) => (
                    <span key={index}>{step}</span>
                ))}
            </div>
        </div>
    );
};

// ==================== STEP 1: PROPERTY & TENANT INFORMATION ====================
const Step1 = ({ inspection, updateField, updateProgramType }) => {
    return (
        <div className="step-container">
            <h2>Step 1: Property & Tenant Information</h2>
            <p className="step-description">Required information for NSPIRE compliance and federal program reporting</p>
            
            <div className="form-section">
                <h3>⚠️ Critical Dates</h3>
                <div className="form-group">
                    <label className="required">Notice Served Date</label>
                    <input
                        type="date"
                        value={inspection.noticeServedDate}
                        onChange={(e) => updateField('noticeServedDate', e.target.value)}
                        required
                    />
                    <small>Required 24-hour notice per federal regulations</small>
                </div>
                <div className="form-group">
                    <label className="required">Today's Date (Inspection Date)</label>
                    <input
                        type="date"
                        value={inspection.todaysDate}
                        onChange={(e) => updateField('todaysDate', e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="form-section">
                <h3>🏢 Property Information</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label className="required">Property Name</label>
                        <select
                            value={inspection.propertyName}
                            onChange={(e) => updateField('propertyName', e.target.value)}
                            required
                        >
                            <option value="">Select Property</option>
                            {PROPERTY_NAMES.map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                    {inspection.propertyName === 'Other (Custom)' && (
                        <div className="form-group">
                            <label className="required">Custom Property Name</label>
                            <input
                                type="text"
                                value={inspection.propertyNameCustom}
                                onChange={(e) => updateField('propertyNameCustom', e.target.value)}
                                placeholder="Enter property name"
                                required
                            />
                        </div>
                    )}
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="required">Property Number</label>
                        <select
                            value={inspection.propertyNumber}
                            onChange={(e) => updateField('propertyNumber', e.target.value)}
                            required
                        >
                            <option value="">Select Number</option>
                            {PROPERTY_NUMBERS.map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>
                    {inspection.propertyNumber === 'Other (Custom)' && (
                        <div className="form-group">
                            <label className="required">Custom Property Number</label>
                            <input
                                type="text"
                                value={inspection.propertyNumberCustom}
                                onChange={(e) => updateField('propertyNumberCustom', e.target.value)}
                                placeholder="Enter property number"
                                required
                            />
                        </div>
                    )}
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="required">Property Address</label>
                        <select
                            value={inspection.propertyAddress}
                            onChange={(e) => updateField('propertyAddress', e.target.value)}
                            required
                        >
                            <option value="">Select Address</option>
                            {PROPERTY_ADDRESSES.map(addr => (
                                <option key={addr} value={addr}>{addr}</option>
                            ))}
                        </select>
                    </div>
                    {inspection.propertyAddress === 'Other (Custom)' && (
                        <div className="form-group">
                            <label className="required">Custom Property Address</label>
                            <input
                                type="text"
                                value={inspection.propertyAddressCustom}
                                onChange={(e) => updateField('propertyAddressCustom', e.target.value)}
                                placeholder="Enter full address"
                                required
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="form-section">
                <h3>👤 Inspector Information</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label className="required">Inspector Name</label>
                        <select
                            value={inspection.inspector}
                            onChange={(e) => updateField('inspector', e.target.value)}
                            required
                        >
                            <option value="">Select Inspector</option>
                            {INSPECTORS.map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                    {inspection.inspector === 'Other (Custom)' && (
                        <div className="form-group">
                            <label className="required">Custom Inspector Name</label>
                            <input
                                type="text"
                                value={inspection.inspectorCustom}
                                onChange={(e) => updateField('inspectorCustom', e.target.value)}
                                placeholder="Enter inspector name"
                                required
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="form-section">
                <h3>🏠 Unit Information</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label className="required">Building</label>
                        <select
                            value={inspection.building}
                            onChange={(e) => updateField('building', e.target.value)}
                            required
                        >
                            <option value="">Select Building</option>
                            {BUILDINGS.map(bldg => (
                                <option key={bldg} value={bldg}>{bldg}</option>
                            ))}
                        </select>
                    </div>
                    {inspection.building === 'Other (Custom)' && (
                        <div className="form-group">
                            <label className="required">Custom Building</label>
                            <input
                                type="text"
                                value={inspection.buildingCustom}
                                onChange={(e) => updateField('buildingCustom', e.target.value)}
                                placeholder="Enter building identifier"
                                required
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label className="required">Unit Number</label>
                        <input
                            type="text"
                            value={inspection.unitNumber}
                            onChange={(e) => updateField('unitNumber', e.target.value)}
                            placeholder="e.g., 101, 2B, etc."
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="required">Unit Type</label>
                        <select
                            value={inspection.unitType}
                            onChange={(e) => updateField('unitType', e.target.value)}
                            required
                        >
                            <option value="">Select Type</option>
                            {UNIT_TYPES.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h3>👥 Tenant Information</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label className="required">Tenant First Name</label>
                        <input
                            type="text"
                            value={inspection.tenantFirstName}
                            onChange={(e) => updateField('tenantFirstName', e.target.value)}
                            placeholder="First name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="required">Tenant Last Name</label>
                        <input
                            type="text"
                            value={inspection.tenantLastName}
                            onChange={(e) => updateField('tenantLastName', e.target.value)}
                            placeholder="Last name"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h3>📋 Federal Program Type (Check All That Apply)</h3>
                <p className="compliance-warning">⚠️ Required for compliance reporting</p>
                <div className="checkbox-grid">
                    {PROGRAM_TYPES.map(program => (
                        <label key={program} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={inspection.programType.includes(program)}
                                onChange={(e) => updateProgramType(program, e.target.checked)}
                            />
                            <span>{program}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ==================== STEP 2: UNIT LAYOUT ====================
const Step2 = ({ inspection, updateField }) => {
    return (
        <div className="step-container">
            <h2>Step 2: Unit Layout Configuration</h2>
            <p className="step-description">Define the rooms and spaces in this unit</p>
            
            <div className="form-section">
                <h3>🛏️ Sleeping & Bathing</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label className="required">Number of Bedrooms</label>
                        <input
                            type="number"
                            min="0"
                            max="10"
                            value={inspection.bedrooms}
                            onChange={(e) => updateField('bedrooms', parseInt(e.target.value) || 0)}
                            required
                        />
                        <small>⚠️ NSPIRE: Smoke alarms required in each bedroom</small>
                    </div>
                    <div className="form-group">
                        <label className="required">Number of Bathrooms</label>
                        <input
                            type="number"
                            min="0"
                            max="10"
                            value={inspection.bathrooms}
                            onChange={(e) => updateField('bathrooms', parseInt(e.target.value) || 0)}
                            required
                        />
                        <small>⚠️ NSPIRE: GFI protection and ventilation required</small>
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h3>🏠 Common Rooms</h3>
                <div className="checkbox-grid">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={inspection.hasKitchen}
                            onChange={(e) => updateField('hasKitchen', e.target.checked)}
                        />
                        <span>Kitchen</span>
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={inspection.hasLivingRoom}
                            onChange={(e) => updateField('hasLivingRoom', e.target.checked)}
                        />
                        <span>Living Room</span>
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={inspection.hasDiningRoom}
                            onChange={(e) => updateField('hasDiningRoom', e.target.checked)}
                        />
                        <span>Dining Room</span>
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={inspection.hasLaundryRoom}
                            onChange={(e) => updateField('hasLaundryRoom', e.target.checked)}
                        />
                        <span>Laundry Room</span>
                    </label>
                </div>
            </div>

            <div className="form-section">
                <h3>🚶 Circulation Spaces</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label>Number of Hallways</label>
                        <input
                            type="number"
                            min="0"
                            max="5"
                            value={inspection.hallways}
                            onChange={(e) => updateField('hallways', parseInt(e.target.value) || 0)}
                        />
                        <small>⚠️ NSPIRE: Smoke alarms required in hallways serving bedrooms</small>
                    </div>
                    <div className="form-group">
                        <label>Number of Stairways</label>
                        <input
                            type="number"
                            min="0"
                            max="5"
                            value={inspection.stairways}
                            onChange={(e) => updateField('stairways', parseInt(e.target.value) || 0)}
                        />
                        <small>⚠️ NSPIRE: Railings required for 3+ rises</small>
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h3>🌳 Outdoor Spaces</h3>
                <div className="checkbox-grid">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={inspection.hasOutsideDeck}
                            onChange={(e) => updateField('hasOutsideDeck', e.target.checked)}
                        />
                        <span>Outside Deck/Patio</span>
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={inspection.hasYard}
                            onChange={(e) => updateField('hasYard', e.target.checked)}
                        />
                        <span>Yard</span>
                    </label>
                </div>
            </div>

            <div className="compliance-summary">
                <h4>📋 Rooms to Inspect:</h4>
                <ul>
                    {inspection.bedrooms > 0 && <li>{inspection.bedrooms} Bedroom(s)</li>}
                    {inspection.bathrooms > 0 && <li>{inspection.bathrooms} Bathroom(s)</li>}
                    {inspection.hasKitchen && <li>Kitchen</li>}
                    {inspection.hasLivingRoom && <li>Living Room</li>}
                    {inspection.hasDiningRoom && <li>Dining Room</li>}
                    {inspection.hasLaundryRoom && <li>Laundry Room</li>}
                    {inspection.hallways > 0 && <li>{inspection.hallways} Hallway(s)</li>}
                    {inspection.stairways > 0 && <li>{inspection.stairways} Stairway(s)</li>}
                    {inspection.hasOutsideDeck && <li>Outside Deck</li>}
                    {inspection.hasYard && <li>Yard</li>}
                </ul>
            </div>
        </div>
    );
};

// ==================== STEP 3: GLOBAL FEATURES ====================
const Step3 = ({ inspection, updateField }) => {
    return (
        <div className="step-container">
            <h2>Step 3: Global Features & Systems</h2>
            <p className="step-description">Unit-wide systems affecting all rooms</p>
            
            <div className="form-section">
                <h3>🔥 Heating System</h3>
                <div className="form-group">
                    <label className="required">Heating Type</label>
                    <select
                        value={inspection.heatingType}
                        onChange={(e) => updateField('heatingType', e.target.value)}
                        required
                    >
                        <option value="">Select Heating Type</option>
                        {HEATING_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                
                {inspection.heatingType === 'Central Furnace' && (
                    <div className="form-group">
                        <label className="required">Heating Fuel</label>
                        <select
                            value={inspection.heatingFuel}
                            onChange={(e) => updateField('heatingFuel', e.target.value)}
                            required
                        >
                            <option value="">Select Fuel Type</option>
                            {HEATING_FUELS.map(fuel => (
                                <option key={fuel} value={fuel}>{fuel}</option>
                            ))}
                        </select>
                        {inspection.heatingFuel && inspection.heatingFuel !== 'Electric' && (
                            <small className="warning">⚠️ NSPIRE: CO2 alarm required with fuel-burning heating</small>
                        )}
                    </div>
                )}
            </div>

            <div className="form-section">
                <h3>❄️ Cooling System</h3>
                <div className="form-group">
                    <label>Cooling Type</label>
                    <select
                        value={inspection.coolingType}
                        onChange={(e) => updateField('coolingType', e.target.value)}
                    >
                        <option value="">Select Cooling Type</option>
                        <option value="Central Air">Central Air</option>
                        <option value="Through-Wall AC">Through-Wall AC</option>
                        <option value="Mini-Split">Mini-Split</option>
                        <option value="Window Units">Window Units</option>
                        <option value="None">None</option>
                    </select>
                </div>
            </div>

            <div className="form-section">
                <h3>💧 Water System</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label>Water Accessible</label>
                        <select
                            value={inspection.waterAccessible}
                            onChange={(e) => updateField('waterAccessible', e.target.value === 'true')}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Water Pressure</label>
                        <select
                            value={inspection.waterPressure}
                            onChange={(e) => updateField('waterPressure', e.target.value)}
                        >
                            <option value="Good">Good</option>
                            <option value="Low">Low</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Hot Water Functional</label>
                        <select
                            value={inspection.hotWaterFunctional}
                            onChange={(e) => updateField('hotWaterFunctional', e.target.value === 'true')}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ==================== STEP 4: ROOM INSPECTIONS ====================
const Step4 = ({ 
    inspection, 
    currentRoomIndex, 
    setCurrentRoomIndex,
    updateRoom,
    addAppliance,
    updateAppliance,
    removeAppliance,
    handlePhotoUpload,
    removePhoto,
    updatePhotoComment,
    nextRoom,
    previousRoom
}) => {
    if (inspection.rooms.length === 0) {
        return (
            <div className="step-container">
                <h2>No rooms configured</h2>
                <p>Please go back to Step 2 and configure your unit layout.</p>
            </div>
        );
    }

    const currentRoom = inspection.rooms[currentRoomIndex];

    return (
        <div className="step-container">
            <div className="room-header">
                <h2>Room {currentRoomIndex + 1} of {inspection.rooms.length}: {currentRoom.name}</h2>
                <div className="room-progress">
                    {inspection.rooms.map((room, idx) => (
                        <button
                            key={room.id}
                            className={`room-dot ${idx === currentRoomIndex ? 'active' : ''} ${idx < currentRoomIndex ? 'complete' : ''}`}
                            onClick={() => setCurrentRoomIndex(idx)}
                            title={room.name}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* HOUSEKEEPING */}
            <div className="form-section">
                <h3>🧹 Housekeeping</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label>Closets Present</label>
                        <input
                            type="checkbox"
                            checked={currentRoom.closetsPresent}
                            onChange={(e) => updateRoom(currentRoom.id, 'closetsPresent', e.target.checked)}
                        />
                    </div>
                    {currentRoom.closetsPresent && (
                        <div className="form-group">
                            <label>Number of Closets</label>
                            <input
                                type="number"
                                min="0"
                                value={currentRoom.closetCount}
                                onChange={(e) => updateRoom(currentRoom.id, 'closetCount', parseInt(e.target.value) || 0)}
                            />
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label>Housekeeping Satisfactory</label>
                    <select
                        value={currentRoom.housekeeping}
                        onChange={(e) => updateRoom(currentRoom.id, 'housekeeping', e.target.value)}
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="N/A">N/A</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Comments</label>
                    <textarea
                        value={currentRoom.housekeepingComments}
                        onChange={(e) => updateRoom(currentRoom.id, 'housekeepingComments', e.target.value)}
                        placeholder="Any housekeeping issues..."
                        rows="2"
                    />
                </div>
                <div className="form-group">
                    <label>Work Order Required</label>
                    <input
                        type="checkbox"
                        checked={currentRoom.housekeepingWO}
                        onChange={(e) => updateRoom(currentRoom.id, 'housekeepingWO', e.target.checked)}
                    />
                    {currentRoom.housekeepingWO && (
                        <input
                            type="text"
                            value={currentRoom.housekeepingWONumber}
                            onChange={(e) => updateRoom(currentRoom.id, 'housekeepingWONumber', e.target.value)}
                            placeholder="Work order number"
                        />
                    )}
                </div>
            </div>

            {/* SAFETY DEVICES - CRITICAL FOR NSPIRE */}
            {(currentRoom.type === 'bedroom' || currentRoom.type === 'hallway') && (
                <div className="form-section compliance-critical">
                    <h3>🚨 Safety Devices (NSPIRE CRITICAL)</h3>
                    <div className="compliance-warning">
                        ⚠️ {NSPIRE_REQUIREMENTS.smokeAlarms[currentRoom.type === 'bedroom' ? 'bedrooms' : 'hallways']}
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="required">Smoke Alarm Present</label>
                            <input
                                type="checkbox"
                                checked={currentRoom.hasSmokeAlarm}
                                onChange={(e) => updateRoom(currentRoom.id, 'hasSmokeAlarm', e.target.checked)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Combo Smoke/CO2 Alarm</label>
                            <input
                                type="checkbox"
                                checked={currentRoom.hasComboAlarm}
                                onChange={(e) => updateRoom(currentRoom.id, 'hasComboAlarm', e.target.checked)}
                            />
                        </div>
                        <div className="form-group">
                            <label>CO2 Alarm Present</label>
                            <input
                                type="checkbox"
                                checked={currentRoom.hasCO2Alarm}
                                onChange={(e) => updateRoom(currentRoom.id, 'hasCO2Alarm', e.target.checked)}
                            />
                        </div>
                    </div>
                    {(currentRoom.hasSmokeAlarm || currentRoom.hasComboAlarm || currentRoom.hasCO2Alarm) && (
                        <>
                            <div className="form-group">
                                <label>Alarm Status</label>
                                <select
                                    value={currentRoom.alarmStatus}
                                    onChange={(e) => updateRoom(currentRoom.id, 'alarmStatus', e.target.value)}
                                >
                                    <option value="Working">Working</option>
                                    <option value="Not Working">Not Working</option>
                                    <option value="Missing">Missing</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Comments</label>
                                <textarea
                                    value={currentRoom.alarmComments}
                                    onChange={(e) => updateRoom(currentRoom.id, 'alarmComments', e.target.value)}
                                    placeholder="Alarm details, test date, battery status..."
                                    rows="2"
                                />
                            </div>
                        </>
                    )}
                    {(!currentRoom.hasSmokeAlarm && !currentRoom.hasComboAlarm) && (
                        <div className="violation-warning">
                            ⚠️ NSPIRE VIOLATION: Smoke alarm required in {currentRoom.name}
                        </div>
                    )}
                </div>
            )}

            {/* FLOORING */}
            <div className="form-section">
                <h3>🔲 Flooring</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label>Flooring Type</label>
                        <select
                            value={currentRoom.flooringType}
                            onChange={(e) => updateRoom(currentRoom.id, 'flooringType', e.target.value)}
                        >
                            <option value="">Select Type</option>
                            {FLOORING_TYPES.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Condition</label>
                        <select
                            value={currentRoom.flooringCondition}
                            onChange={(e) => updateRoom(currentRoom.id, 'flooringCondition', e.target.value)}
                        >
                            {CONDITIONS.map(cond => (
                                <option key={cond} value={cond}>{cond}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label>Comments</label>
                    <textarea
                        value={currentRoom.flooringComments}
                        onChange={(e) => updateRoom(currentRoom.id, 'flooringComments', e.target.value)}
                        placeholder="Stains, damage, wear patterns..."
                        rows="2"
                    />
                </div>
                <div className="form-group">
                    <label>Work Order Required</label>
                    <input
                        type="checkbox"
                        checked={currentRoom.flooringWO}
                        onChange={(e) => updateRoom(currentRoom.id, 'flooringWO', e.target.checked)}
                    />
                </div>
            </div>

            {/* WALLS */}
            <div className="form-section">
                <h3>🧱 Walls & Paint</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label>Walls Condition</label>
                        <select
                            value={currentRoom.wallsCondition}
                            onChange={(e) => updateRoom(currentRoom.id, 'wallsCondition', e.target.value)}
                        >
                            {CONDITIONS.map(cond => (
                                <option key={cond} value={cond}>{cond}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Defective Paint</label>
                        <input
                            type="checkbox"
                            checked={currentRoom.paintDefective}
                            onChange={(e) => updateRoom(currentRoom.id, 'paintDefective', e.target.checked)}
                        />
                        {currentRoom.paintDefective && (
                            <small className="warning">⚠️ Lead paint testing may be required</small>
                        )}
                    </div>
                </div>
                <div className="form-group">
                    <label>Comments</label>
                    <textarea
                        value={currentRoom.wallsComments}
                        onChange={(e) => updateRoom(currentRoom.id, 'wallsComments', e.target.value)}
                        placeholder="Holes, cracks, water damage..."
                        rows="2"
                    />
                </div>
                <div className="form-group">
                    <label>Work Order Required</label>
                    <input
                        type="checkbox"
                        checked={currentRoom.wallsWO}
                        onChange={(e) => updateRoom(currentRoom.id, 'wallsWO', e.target.checked)}
                    />
                </div>
            </div>

            {/* ELECTRICAL - CRITICAL FOR KITCHENS/BATHROOMS */}
            <div className="form-section">
                <h3>⚡ Electrical</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label>Number of Outlets</label>
                        <input
                            type="number"
                            min="0"
                            value={currentRoom.outletCount}
                            onChange={(e) => updateRoom(currentRoom.id, 'outletCount', parseInt(e.target.value) || 0)}
                        />
                    </div>
                    {(currentRoom.type === 'kitchen' || currentRoom.type === 'bathroom') && (
                        <div className="form-group">
                            <label className="required">GFI Protection</label>
                            <input
                                type="checkbox"
                                checked={currentRoom.gfiProtection}
                                onChange={(e) => updateRoom(currentRoom.id, 'gfiProtection', e.target.checked)}
                            />
                            <small className="warning">⚠️ NSPIRE: Required in {currentRoom.type}</small>
                        </div>
                    )}
                </div>
                {(currentRoom.type === 'kitchen' || currentRoom.type === 'bathroom') && !currentRoom.gfiProtection && currentRoom.outletCount > 0 && (
                    <div className="violation-warning">
                        ⚠️ NSPIRE VIOLATION: GFI protection required in {currentRoom.name}
                    </div>
                )}
                <div className="form-group">
                    <label>Comments</label>
                    <textarea
                        value={currentRoom.gfiComments}
                        onChange={(e) => updateRoom(currentRoom.id, 'gfiComments', e.target.value)}
                        placeholder="Outlet issues, GFI test results..."
                        rows="2"
                    />
                </div>
            </div>

            {/* WINDOWS */}
            <div className="form-section">
                <h3>🪟 Windows</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label>Number of Windows</label>
                        <input
                            type="number"
                            min="0"
                            value={currentRoom.windowCount}
                            onChange={(e) => updateRoom(currentRoom.id, 'windowCount', parseInt(e.target.value) || 0)}
                        />
                    </div>
                    {currentRoom.windowCount > 0 && (
                        <>
                            <div className="form-group">
                                <label>Windows Operable</label>
                                <input
                                    type="checkbox"
                                    checked={currentRoom.windowsOperable}
                                    onChange={(e) => updateRoom(currentRoom.id, 'windowsOperable', e.target.checked)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="required">Window Locks</label>
                                <input
                                    type="checkbox"
                                    checked={currentRoom.windowLocks}
                                    onChange={(e) => updateRoom(currentRoom.id, 'windowLocks', e.target.checked)}
                                />
                                <small className="warning">⚠️ NSPIRE: Required for security</small>
                            </div>
                            <div className="form-group">
                                <label>Condition</label>
                                <select
                                    value={currentRoom.windowsCondition}
                                    onChange={(e) => updateRoom(currentRoom.id, 'windowsCondition', e.target.value)}
                                >
                                    {CONDITIONS.map(cond => (
                                        <option key={cond} value={cond}>{cond}</option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}
                </div>
                <div className="form-group">
                    <label>Comments</label>
                    <textarea
                        value={currentRoom.windowsComments}
                        onChange={(e) => updateRoom(currentRoom.id, 'windowsComments', e.target.value)}
                        placeholder="Cracks, seals, screens..."
                        rows="2"
                    />
                </div>
            </div>

            {/* BATHROOM-SPECIFIC */}
            {currentRoom.type === 'bathroom' && (
                <>
                    <div className="form-section compliance-critical">
                        <h3>🚿 Bathroom Fixtures</h3>
                        
                        {/* Sink */}
                        <h4>Sink</h4>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Sink Condition</label>
                                <select
                                    value={currentRoom.sinkCondition}
                                    onChange={(e) => updateRoom(currentRoom.id, 'sinkCondition', e.target.value)}
                                >
                                    {CONDITIONS.map(cond => (
                                        <option key={cond} value={cond}>{cond}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Drains Properly</label>
                                <input
                                    type="checkbox"
                                    checked={currentRoom.sinkDrains}
                                    onChange={(e) => updateRoom(currentRoom.id, 'sinkDrains', e.target.checked)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Leaks Present</label>
                                <input
                                    type="checkbox"
                                    checked={currentRoom.sinkLeaks}
                                    onChange={(e) => updateRoom(currentRoom.id, 'sinkLeaks', e.target.checked)}
                                />
                            </div>
                        </div>

                        {/* Toilet */}
                        <h4>Toilet</h4>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Toilet Condition</label>
                                <select
                                    value={currentRoom.toiletCondition}
                                    onChange={(e) => updateRoom(currentRoom.id, 'toiletCondition', e.target.value)}
                                >
                                    {CONDITIONS.map(cond => (
                                        <option key={cond} value={cond}>{cond}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Flushes Properly</label>
                                <input
                                    type="checkbox"
                                    checked={currentRoom.toiletFlushes}
                                    onChange={(e) => updateRoom(currentRoom.id, 'toiletFlushes', e.target.checked)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Secure to Floor</label>
                                <input
                                    type="checkbox"
                                    checked={currentRoom.toiletSecure}
                                    onChange={(e) => updateRoom(currentRoom.id, 'toiletSecure', e.target.checked)}
                                />
                            </div>
                        </div>

                        {/* Tub/Shower */}
                        <h4>Tub/Shower</h4>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Type</label>
                                <select
                                    value={currentRoom.tubShowerType}
                                    onChange={(e) => updateRoom(currentRoom.id, 'tubShowerType', e.target.value)}
                                >
                                    <option value="">Select Type</option>
                                    <option value="Bathtub Only">Bathtub Only</option>
                                    <option value="Shower Only">Shower Only</option>
                                    <option value="Tub/Shower Combo">Tub/Shower Combo</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Condition</label>
                                <select
                                    value={currentRoom.tubShowerCondition}
                                    onChange={(e) => updateRoom(currentRoom.id, 'tubShowerCondition', e.target.value)}
                                >
                                    {CONDITIONS.map(cond => (
                                        <option key={cond} value={cond}>{cond}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Drains Properly</label>
                                <input
                                    type="checkbox"
                                    checked={currentRoom.tubShowerDrains}
                                    onChange={(e) => updateRoom(currentRoom.id, 'tubShowerDrains', e.target.checked)}
                                />
                            </div>
                        </div>

                        {/* Ventilation - CRITICAL */}
                        <h4>Ventilation (NSPIRE CRITICAL)</h4>
                        <div className="compliance-warning">
                            ⚠️ {NSPIRE_REQUIREMENTS.ventilation.bathroom}
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="required">Ventilation Type</label>
                                <select
                                    value={currentRoom.ventilationType}
                                    onChange={(e) => updateRoom(currentRoom.id, 'ventilationType', e.target.value)}
                                >
                                    <option value="">Select Type</option>
                                    <option value="Exhaust Fan">Exhaust Fan</option>
                                    <option value="Operable Window">Operable Window</option>
                                    <option value="Both">Both</option>
                                    <option value="None">None</option>
                                </select>
                            </div>
                            {currentRoom.ventilationType && currentRoom.ventilationType !== 'None' && (
                                <div className="form-group">
                                    <label>Works Properly</label>
                                    <input
                                        type="checkbox"
                                        checked={currentRoom.ventilationWorks}
                                        onChange={(e) => updateRoom(currentRoom.id, 'ventilationWorks', e.target.checked)}
                                    />
                                </div>
                            )}
                        </div>
                        {currentRoom.ventilationType === 'None' && (
                            <div className="violation-warning">
                                ⚠️ NSPIRE VIOLATION: Ventilation required in bathroom
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* KITCHEN-SPECIFIC */}
            {currentRoom.type === 'kitchen' && (
                <div className="form-section">
                    <h3>🍳 Kitchen Fixtures</h3>
                    
                    <h4>Sink</h4>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Sink Condition</label>
                            <select
                                value={currentRoom.sinkCondition}
                                onChange={(e) => updateRoom(currentRoom.id, 'sinkCondition', e.target.value)}
                            >
                                {CONDITIONS.map(cond => (
                                    <option key={cond} value={cond}>{cond}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Drains Properly</label>
                            <input
                                type="checkbox"
                                checked={currentRoom.sinkDrains}
                                onChange={(e) => updateRoom(currentRoom.id, 'sinkDrains', e.target.checked)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Leaks Present</label>
                            <input
                                type="checkbox"
                                checked={currentRoom.sinkLeaks}
                                onChange={(e) => updateRoom(currentRoom.id, 'sinkLeaks', e.target.checked)}
                            />
                        </div>
                    </div>

                    <h4>Appliances</h4>
                    <div className="appliances-section">
                        {currentRoom.appliances.map(appliance => (
                            <div key={appliance.id} className="appliance-card">
                                <div className="appliance-header">
                                    <h5>{appliance.type}</h5>
                                    <button 
                                        className="btn-small btn-danger"
                                        onClick={() => removeAppliance(currentRoom.id, appliance.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Condition</label>
                                        <select
                                            value={appliance.condition}
                                            onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'condition', e.target.value)}
                                        >
                                            {CONDITIONS.map(cond => (
                                                <option key={cond} value={cond}>{cond}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Action Required</label>
                                        <select
                                            value={appliance.action}
                                            onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'action', e.target.value)}
                                        >
                                            {ACTIONS.map(action => (
                                                <option key={action} value={action}>{action}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Comments</label>
                                    <textarea
                                        value={appliance.comments}
                                        onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'comments', e.target.value)}
                                        placeholder="Issues, model, brand..."
                                        rows="2"
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="add-appliance">
                            <label>Add Appliance:</label>
                            <select 
                                onChange={(e) => {
                                    if (e.target.value) {
                                        addAppliance(currentRoom.id, e.target.value);
                                        e.target.value = '';
                                    }
                                }}
                            >
                                <option value="">Select Appliance Type</option>
                                {APPLIANCE_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* STAIRWAY-SPECIFIC */}
            {currentRoom.type === 'stairway' && (
                <div className="form-section compliance-critical">
                    <h3>🪜 Stairway Safety (NSPIRE CRITICAL)</h3>
                    <div className="compliance-warning">
                        ⚠️ {NSPIRE_REQUIREMENTS.railings.stairs}
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="required">Number of Rises</label>
                            <input
                                type="number"
                                min="0"
                                value={currentRoom.stairwayRises}
                                onChange={(e) => updateRoom(currentRoom.id, 'stairwayRises', parseInt(e.target.value) || 0)}
                            />
                            <small>Count steps from bottom to top</small>
                        </div>
                        {currentRoom.stairwayRises >= 3 && (
                            <div className="form-group">
                                <label className="required">Railing Present</label>
                                <input
                                    type="checkbox"
                                    checked={currentRoom.stairwayRailing}
                                    onChange={(e) => updateRoom(currentRoom.id, 'stairwayRailing', e.target.checked)}
                                />
                                <small className="warning">⚠️ Required for 3+ rises</small>
                            </div>
                        )}
                        {currentRoom.stairwayRailing && (
                            <>
                                <div className="form-group">
                                    <label>Railing Secure</label>
                                    <input
                                        type="checkbox"
                                        checked={currentRoom.railingSecure}
                                        onChange={(e) => updateRoom(currentRoom.id, 'railingSecure', e.target.checked)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Railing Height</label>
                                    <input
                                        type="text"
                                        value={currentRoom.railingHeight}
                                        onChange={(e) => updateRoom(currentRoom.id, 'railingHeight', e.target.value)}
                                        placeholder="34-38 inches"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    {currentRoom.stairwayRises >= 3 && !currentRoom.stairwayRailing && (
                        <div className="violation-warning">
                            ⚠️ NSPIRE VIOLATION: Railing required for {currentRoom.stairwayRises} rises
                        </div>
                    )}
                </div>
            )}

            {/* GENERAL ROOM NOTES */}
            <div className="form-section">
                <h3>📝 General Room Notes</h3>
                <div className="form-group">
                    <label>Additional Comments</label>
                    <textarea
                        value={currentRoom.generalComments}
                        onChange={(e) => updateRoom(currentRoom.id, 'generalComments', e.target.value)}
                        placeholder="Any additional observations, concerns, or notes about this room..."
                        rows="4"
                    />
                </div>
            </div>

            {/* NAVIGATION */}
            <div className="btn-group">
                <button className="btn btn-secondary" onClick={previousRoom}>
                    ← {currentRoomIndex === 0 ? 'Previous Step' : 'Previous Room'}
                </button>
                <button className="btn btn-primary" onClick={nextRoom}>
                    {currentRoomIndex === inspection.rooms.length - 1 ? 'Next Step' : 'Next Room'} →
                </button>
            </div>
        </div>
    );
};

// ==================== STEP 5: WATER HEATER SAFETY ====================
const Step5 = ({ 
    inspection, 
    updateWaterHeater,
    handlePhotoUpload,
    removePhoto,
    updatePhotoComment
}) => {
    const wh = inspection.waterHeater;

    return (
        <div className="step-container">
            <h2>Step 5: Water Heater Safety</h2>
            <p className="step-description compliance-warning">
                ⚠️ CRITICAL NSPIRE REQUIREMENTS - TPR valve, shut-off valve, and gas flue (if applicable)
            </p>
            
            <div className="form-section">
                <h3>💧 Water Heater Presence</h3>
                <div className="form-group">
                    <label className="required">Water Heater Present in Unit</label>
                    <select
                        value={wh.present}
                        onChange={(e) => updateWaterHeater('present', e.target.value === 'true')}
                    >
                        <option value="false">No - Centralized System</option>
                        <option value="true">Yes - In Unit</option>
                    </select>
                </div>
            </div>

            {wh.present && (
                <>
                    <div className="form-section">
                        <h3>📍 Location & Details</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Location</label>
                                <select
                                    value={wh.location}
                                    onChange={(e) => updateWaterHeater('location', e.target.value)}
                                >
                                    <option value="">Select Location</option>
                                    <option value="Closet">Closet</option>
                                    <option value="Bathroom">Bathroom</option>
                                    <option value="Kitchen">Kitchen</option>
                                    <option value="Laundry Room">Laundry Room</option>
                                    <option value="Basement">Basement</option>
                                    <option value="Garage">Garage</option>
                                    <option value="Outside">Outside</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Install Date</label>
                                <select
                                    value={wh.installDate}
                                    onChange={(e) => updateWaterHeater('installDate', e.target.value)}
                                >
                                    {INSTALL_DATES.map(date => (
                                        <option key={date} value={date}>{date}</option>
                                    ))}
                                </select>
                            </div>
                            {wh.installDate === 'Custom' && (
                                <div className="form-group">
                                    <label>Custom Date</label>
                                    <input
                                        type="text"
                                        value={wh.customInstallDate}
                                        onChange={(e) => updateWaterHeater('customInstallDate', e.target.value)}
                                        placeholder="MM/YYYY"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="form-section compliance-critical">
                        <h3>🚨 NSPIRE Critical Safety Requirements</h3>
                        
                        {/* TPR Valve */}
                        <div className="safety-requirement">
                            <div className="requirement-header">
                                <h4>Temperature/Pressure Relief (TPR) Valve</h4>
                                <div className="compliance-warning">
                                    ⚠️ REQUIRED by NSPIRE - Prevents explosion hazard
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="required">TPR Valve Present</label>
                                    <select
                                        value={wh.hasTPRValve}
                                        onChange={(e) => updateWaterHeater('hasTPRValve', e.target.value === 'true')}
                                    >
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </div>
                                {wh.hasTPRValve && (
                                    <>
                                        <div className="form-group">
                                            <label className="required">Discharge Pipe Present</label>
                                            <input
                                                type="checkbox"
                                                checked={wh.tprPipePresent}
                                                onChange={(e) => updateWaterHeater('tprPipePresent', e.target.checked)}
                                            />
                                        </div>
                                        {wh.tprPipePresent && (
                                            <div className="form-group">
                                                <label className="required">Pipe Terminates</label>
                                                <select
                                                    value={wh.tprPipeTerminates}
                                                    onChange={(e) => updateWaterHeater('tprPipeTerminates', e.target.value)}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="6-24 inches from floor">6-24 inches from floor (Correct)</option>
                                                    <option value="Floor drain">Floor drain</option>
                                                    <option value="Outside">Outside</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <small>Must terminate 6-24 inches from floor or over drain</small>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                            {!wh.hasTPRValve && (
                                <div className="violation-warning">
                                    ⚠️ NSPIRE VIOLATION: TPR valve REQUIRED - Immediate safety hazard
                                </div>
                            )}
                        </div>

                        {/* Shut-off Valve */}
                        <div className="safety-requirement">
                            <div className="requirement-header">
                                <h4>Water Shut-off Valve</h4>
                                <div className="compliance-warning">
                                    ⚠️ REQUIRED by NSPIRE - Emergency isolation
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="required">Shut-off Valve Present</label>
                                <select
                                    value={wh.hasShutOff}
                                    onChange={(e) => updateWaterHeater('hasShutOff', e.target.value === 'true')}
                                >
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                            </div>
                            {!wh.hasShutOff && (
                                <div className="violation-warning">
                                    ⚠️ NSPIRE VIOLATION: Shut-off valve REQUIRED
                                </div>
                            )}
                        </div>

                        {/* Gas Flue */}
                        {inspection.heatingFuel && (inspection.heatingFuel.includes('Gas') || inspection.heatingFuel.includes('Propane')) && (
                            <div className="safety-requirement">
                                <div className="requirement-header">
                                    <h4>Gas Flue/Vent</h4>
                                    <div className="compliance-warning">
                                        ⚠️ REQUIRED for gas water heaters - CO poisoning prevention
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="required">Gas Flue Present & Proper</label>
                                    <select
                                        value={wh.hasGasFlue}
                                        onChange={(e) => updateWaterHeater('hasGasFlue', e.target.value === 'true')}
                                    >
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                    <small>Must vent to exterior, no holes or disconnections</small>
                                </div>
                                {!wh.hasGasFlue && (
                                    <div className="violation-warning">
                                        ⚠️ NSPIRE VIOLATION: Gas flue REQUIRED - Carbon monoxide hazard
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="form-section">
                        <h3>🔧 General Condition</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Overall Condition</label>
                                <select
                                    value={wh.condition}
                                    onChange={(e) => updateWaterHeater('condition', e.target.value)}
                                >
                                    {CONDITIONS.map(cond => (
                                        <option key={cond} value={cond}>{cond}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Action Required</label>
                                <select
                                    value={wh.action}
                                    onChange={(e) => updateWaterHeater('action', e.target.value)}
                                >
                                    {ACTIONS.map(action => (
                                        <option key={action} value={action}>{action}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea
                                value={wh.comments}
                                onChange={(e) => updateWaterHeater('comments', e.target.value)}
                                placeholder="Rust, leaks, age, capacity, make/model..."
                                rows="3"
                            />
                        </div>
                        <div className="form-group">
                            <label>Work Order Required</label>
                            <input
                                type="checkbox"
                                checked={wh.workOrder}
                                onChange={(e) => updateWaterHeater('workOrder', e.target.checked)}
                            />
                            {wh.workOrder && (
                                <input
                                    type="text"
                                    value={wh.woNumber}
                                    onChange={(e) => updateWaterHeater('woNumber', e.target.value)}
                                    placeholder="Work order number"
                                />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

// ==================== STEP 6: GENERAL/SAFETY ====================
const Step6 = ({ 
    inspection, 
    updateGeneralSafety,
    handlePhotoUpload,
    removePhoto,
    updatePhotoComment
}) => {
    const gs = inspection.generalSafety;

    return (
        <div className="step-container">
            <h2>Step 6: General Safety & Final Checks</h2>
            <p className="step-description">Final unit-wide safety and compliance verification</p>
            
            <div className="form-section">
                <h3>⚡ Utilities & Systems</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label>All Utilities On & Functional</label>
                        <select
                            value={gs.utilitiesOn}
                            onChange={(e) => updateGeneralSafety('utilitiesOn', e.target.value === 'true')}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Unit Clean & Sanitary</label>
                        <select
                            value={gs.unitClean}
                            onChange={(e) => updateGeneralSafety('unitClean', e.target.value === 'true')}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h3>🏠 Building Safety</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label>Dryer Vents Outside</label>
                        <select
                            value={gs.dryerVentOutside}
                            onChange={(e) => updateGeneralSafety('dryerVentOutside', e.target.value === 'true')}
                        >
                            <option value="true">Yes / N/A</option>
                            <option value="false">No</option>
                        </select>
                        <small>Required fire safety measure</small>
                    </div>
                    <div className="form-group">
                        <label>Amenities Work Properly</label>
                        <select
                            value={gs.amenitiesWork}
                            onChange={(e) => updateGeneralSafety('amenitiesWork', e.target.value === 'true')}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="form-section compliance-critical">
                <h3>🔒 Security & Access</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label className="required">All Doors Secure</label>
                        <select
                            value={gs.doorsSecure}
                            onChange={(e) => updateGeneralSafety('doorsSecure', e.target.value === 'true')}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        <small>⚠️ NSPIRE requirement</small>
                    </div>
                    <div className="form-group">
                        <label className="required">All Locks Functional</label>
                        <select
                            value={gs.locksWork}
                            onChange={(e) => updateGeneralSafety('locksWork', e.target.value === 'true')}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        <small>⚠️ NSPIRE requirement</small>
                    </div>
                    <div className="form-group">
                        <label className="required">Electrical Safe</label>
                        <select
                            value={gs.electricalSafe}
                            onChange={(e) => updateGeneralSafety('electricalSafe', e.target.value === 'true')}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        <small>No exposed wiring, overloaded outlets</small>
                    </div>
                    <div className="form-group">
                        <label className="required">All Windows Secure</label>
                        <select
                            value={gs.windowsSecure}
                            onChange={(e) => updateGeneralSafety('windowsSecure', e.target.value === 'true')}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        <small>⚠️ NSPIRE requirement</small>
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h3>🏗️ Exterior & Common Areas</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label>Exterior Issues Affecting Unit</label>
                        <select
                            value={gs.exteriorIssues}
                            onChange={(e) => updateGeneralSafety('exteriorIssues', e.target.value === 'true')}
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                        <small>Damage, drainage, siding, etc.</small>
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h3>🐾 Occupancy Observations</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label>Pets Present</label>
                        <select
                            value={gs.petsPresent}
                            onChange={(e) => updateGeneralSafety('petsPresent', e.target.value === 'true')}
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                        <small>Check lease for pet policy compliance</small>
                    </div>
                    <div className="form-group">
                        <label>Pests/Infestation Present</label>
                        <select
                            value={gs.pestsPresent}
                            onChange={(e) => updateGeneralSafety('pestsPresent', e.target.value === 'true')}
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                        <small>Rodents, insects, etc.</small>
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h3>📝 General Safety Comments</h3>
                <div className="form-group">
                    <label>Additional Safety Observations</label>
                    <textarea
                        value={gs.comments}
                        onChange={(e) => updateGeneralSafety('comments', e.target.value)}
                        placeholder="Any additional safety concerns, observations, or notes..."
                        rows="4"
                    />
                </div>
                <div className="form-group">
                    <label>Work Order Required</label>
                    <input
                        type="checkbox"
                        checked={gs.workOrder}
                        onChange={(e) => updateGeneralSafety('workOrder', e.target.checked)}
                    />
                    {gs.workOrder && (
                        <input
                            type="text"
                            value={gs.woNumber}
                            onChange={(e) => updateGeneralSafety('woNumber', e.target.value)}
                            placeholder="Work order number"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

// ==================== STEP 7: GENERATE REPORT ====================
const Step7 = ({ 
    inspection, 
    updateField, 
    generateReport, 
    emailReport,
    checkCompliance
}) => {
    const violations = checkCompliance();
    const hasViolations = violations.length > 0;

    return (
        <div className="step-container">
            <h2>Step 7: Generate Report</h2>
            <p className="step-description">Review compliance and generate NSPIRE-compliant inspection report</p>
            
            {/* Compliance Summary */}
            <div className={`form-section ${hasViolations ? 'compliance-critical' : 'compliance-success'}`}>
                <h3>{hasViolations ? '⚠️ NSPIRE Compliance Violations Detected' : '✅ NSPIRE Compliance Check Passed'}</h3>
                {hasViolations ? (
                    <div className="violations-list">
                        <p><strong>The following critical violations must be addressed:</strong></p>
                        <ul>
                            {violations.map((violation, idx) => (
                                <li key={idx} className="violation-item">{violation}</li>
                            ))}
                        </ul>
                        <div className="compliance-warning">
                            <p><strong>IMPORTANT:</strong> These violations must be corrected to maintain federal housing program compliance. Work orders should be created immediately for all critical safety issues.</p>
                        </div>
                    </div>
                ) : (
                    <div className="compliance-success">
                        <p>✅ All NSPIRE critical requirements have been met.</p>
                        <p>✅ Smoke alarms present in required locations</p>
                        <p>✅ CO2 alarms compliant (if required)</p>
                        <p>✅ GFI protection verified in kitchens/bathrooms</p>
                        <p>✅ Ventilation verified in bathrooms</p>
                        <p>✅ Stairway railings compliant</p>
                        <p>✅ Water heater safety devices present</p>
                    </div>
                )}
            </div>

            {/* Inspection Summary */}
            <div className="form-section">
                <h3>📋 Inspection Summary</h3>
                <div className="summary-grid">
                    <div className="summary-item">
                        <strong>Property:</strong> {inspection.propertyName === 'Other (Custom)' ? inspection.propertyNameCustom : inspection.propertyName}
                    </div>
                    <div className="summary-item">
                        <strong>Unit:</strong> {inspection.unitNumber}
                    </div>
                    <div className="summary-item">
                        <strong>Tenant:</strong> {inspection.tenantFirstName} {inspection.tenantLastName}
                    </div>
                    <div className="summary-item">
                        <strong>Inspector:</strong> {inspection.inspector === 'Other (Custom)' ? inspection.inspectorCustom : inspection.inspector}
                    </div>
                    <div className="summary-item">
                        <strong>Date:</strong> {formatDate(inspection.todaysDate)}
                    </div>
                    <div className="summary-item">
                        <strong>Rooms Inspected:</strong> {inspection.rooms.length}
                    </div>
                    <div className="summary-item">
                        <strong>Program Type:</strong> {inspection.programType.join(', ')}
                    </div>
                </div>
            </div>

            {/* Report Notes */}
            <div className="form-section">
                <h3>📝 Additional Report Notes</h3>
                <div className="form-group">
                    <label>Inspector Notes (Optional)</label>
                    <textarea
                        value={inspection.reportNotes}
                        onChange={(e) => updateField('reportNotes', e.target.value)}
                        placeholder="Any additional notes, observations, or recommendations for the report..."
                        rows="5"
                    />
                </div>
            </div>

            {/* Compliance Statement */}
            <div className="form-section compliance-critical">
                <h3>⚖️ Federal Compliance Statement</h3>
                <div className="compliance-statement">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={inspection.complianceStatement}
                            onChange={(e) => updateField('complianceStatement', e.target.checked)}
                            required
                        />
                        <span>
                            <strong>I certify that this inspection was conducted in accordance with:</strong>
                            <ul>
                                <li>HUD NSPIRE Standards (National Standards for the Physical Inspection of Real Estate)</li>
                                <li>HOME Investment Partnerships Program Requirements (24 CFR Part 92)</li>
                                <li>LIHTC Compliance Standards (26 USC § 42)</li>
                                <li>USDA Rural Development Requirements (7 CFR Part 3560)</li>
                                <li>Fair Housing Act (24 CFR Part 100)</li>
                                <li>Section 504 Accessibility Requirements (24 CFR Part 8)</li>
                                <li>Applicable State and Local Landlord-Tenant Laws</li>
                            </ul>
                        </span>
                    </label>
                </div>
                <div className="legal-disclaimer">
                    <p><strong>Legal Notice:</strong> This inspection tool is designed to assist in compliance with federal regulations. Property owners and managers are solely responsible for ensuring full compliance with all applicable federal, state, and local regulations. This tool does not constitute legal advice and should be used in conjunction with qualified legal counsel and compliance professionals.</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="form-section">
                <h3>📄 Report Actions</h3>
                <div className="btn-group-vertical">
                    <button 
                        className="btn btn-primary btn-large"
                        onClick={generateReport}
                        disabled={!inspection.complianceStatement}
                    >
                        🖨️ Preview & Print to PDF
                    </button>
                    <button 
                        className="btn btn-secondary btn-large"
                        onClick={emailReport}
                    >
                        📧 Email Report
                    </button>
                    {hasViolations && (
                        <div className="warning-box">
                            <p>⚠️ <strong>Warning:</strong> Proceeding with report generation despite violations. All violations must be addressed through work orders and documented properly.</p>
                        </div>
                    )}
                </div>
                <div className="help-text">
                    <p><strong>Instructions:</strong></p>
                    <ul>
                        <li>Click "Preview & Print to PDF" to open the print dialog</li>
                        <li>Select "Save as PDF" as your printer</li>
                        <li>Choose a filename matching: {generateFilename(inspection)}</li>
                        <li>Save to your preferred location</li>
                        <li>Use "Email Report" to prepare an email with report details</li>
                    </ul>
                </div>
            </div>

            {/* Navigation */}
            <div className="btn-group">
                <button 
                    className="btn btn-secondary"
                    onClick={() => window.location.reload()}
                >
                    🔄 Start New Inspection
                </button>
            </div>
        </div>
    );
};

// ==================== RENDER APP ====================
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<InspectionApp />);
