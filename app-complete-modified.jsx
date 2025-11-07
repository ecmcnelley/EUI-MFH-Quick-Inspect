// Get React hooks from global React object
const { useState, useRef } = React;

// Get Lucide icons from global lucide object  
const { Camera, Upload, X, CheckCircle, AlertCircle, Download, Mail, ChevronLeft, ChevronRight, Plus, Trash2, Home, Clipboard, Settings, FileText, Eye, ArrowLeft, Printer } = lucide;

/**
 * NSPIRE-COMPLIANT RENTAL UNIT INSPECTION SYSTEM
 * FEDERAL COMPLIANCE PRIORITY - PARK VILLAGE 1 & 2 PROPERTIES
 */

const RentalInspectionApp = () => {
  const COMPANY_LOGO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/wAARCAD8BiADACIAAREBAhEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlbaWmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//2Q==";
  
  const FAIR_HOUSING_LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="60" height="60">
    <rect width="100" height="100" fill="none"/>
    <path d="M50 20 L30 35 L30 75 L70 75 L70 35 Z" stroke="black" stroke-width="3" fill="white"/>
    <rect x="40" y="50" width="20" height="25" fill="black"/>
    <rect x="35" y="40" width="8" height="8" fill="black"/>
    <rect x="57" y="40" width="8" height="8" fill="black"/>
    <circle cx="50" cy="90" r="8" fill="white" stroke="black" stroke-width="2"/>
    <line x1="46" y1="90" x2="54" y2="90" stroke="black" stroke-width="2"/>
  </svg>`;

  // Constants
  const CONDITIONS = ['Excellent', 'Good', 'Fair', 'Poor', 'Not Applicable'];
  const ACTION_TYPES = ['Repair', 'Replace', 'Clean', 'Paint', 'Other'];
  const FLOORING_TYPES = ['Carpet', 'Hardwood', 'Laminate', 'Tile', 'Vinyl', 'Concrete'];
  const APPLIANCE_TYPES = ['Refrigerator', 'Stove/Oven', 'Dishwasher', 'Microwave', 'Washer', 'Dryer', 'Water Heater', 'Garbage Disposal', 'Range Hood'];

  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [showReport, setShowReport] = useState(false);

  const [inspectionData, setInspectionData] = useState({
    // Step 1: Property & Tenant Info
    propertyName: 'Park Village 1',
    propertyNameCustom: '',
    propertyAddress: '502 South 5th Street, Yakima WA',
    propertyAddressCustom: '',
    unitNumber: '',
    tenantFirstName: '',
    tenantLastName: '',
    tenantInitial: '',
    inspectorName: 'Ellie McNelley',
    inspectorNameCustom: '',
    inspectionDate: new Date().toISOString().split('T')[0],
    inspectionType: 'Move-In',
    programType: ['HUD NSPIRE', 'LIHTC'],
    
    // Step 2: Unit Configuration
    numBedrooms: 2,
    numBathrooms: 1,
    numHallways: 1,
    numOtherRooms: 0,
    
    // Step 3: Global Features
    heatingType: 'forced-air',
    heatingFuel: 'gas',
    coolingType: 'central-ac',
    waterHeater: true,
    waterHeaterLocation: '',
    waterHeaterInstallDate: 'Unknown',
    waterHeaterCustomDate: '',
    
    // Step 5: Final
    complianceStatement: false,
    reportNotes: '',
  });

  const [rooms, setRooms] = useState([]);

  // Room template
  const createRoom = (type, name) => ({
    id: Date.now() + Math.random(),
    type,
    name,
    housekeepingAcceptable: true,
    housekeepingNotes: '',
    
    // Smoke & CO2 Alarms
    hasSmokeAlarm: false,
    smokeAlarmType: '',
    smokeAlarmStatus: 'Working',
    smokeAlarmWorkOrder: false,
    smokeAlarmNotes: '',
    smokeAlarmPhotos: [],
    
    hasCO2Alarm: false,
    co2AlarmStatus: 'Working',
    co2AlarmNotes: '',
    co2AlarmPhotos: [],
    
    // Flooring
    flooringType: '',
    flooringCondition: 'Good',
    flooringWorkOrder: false,
    flooringNotes: '',
    flooringPhotos: [],
    
    // Walls/Ceiling
    wallsCondition: 'Good',
    wallsWorkOrder: false,
    wallsNotes: '',
    wallsPhotos: [],
    
    ceilingCondition: 'Good',
    ceilingWorkOrder: false,
    ceilingNotes: '',
    ceilingPhotos: [],
    
    // Windows/Doors
    windowsCondition: 'Good',
    windowsWorkOrder: false,
    windowsNotes: '',
    windowsPhotos: [],
    
    doorsCondition: 'Good',
    doorsWorkOrder: false,
    doorsNotes: '',
    doorsPhotos: [],
    
    // Electrical
    electricalOutlets: true,
    electricalSwitches: true,
    electricalGFI: type === 'kitchen' || type === 'bathroom',
    electricalWorkOrder: false,
    electricalNotes: '',
    electricalPhotos: [],
    
    // Room-specific features
    ...(type === 'bathroom' && {
      hasVentilation: false,
      ventilationType: '',
      fixtures: [],
    }),
    
    ...(type === 'kitchen' && {
      cabinetCondition: 'Good',
      counterCondition: 'Good',
      sinkCondition: 'Good',
    }),
    
    appliances: [],
  });

  // Initialize rooms when configuration changes
  const initializeRooms = () => {
    const newRooms = [];
    
    // Bedrooms
    for (let i = 1; i <= inspectionData.numBedrooms; i++) {
      newRooms.push(createRoom('bedroom', `Bedroom ${i}`));
    }
    
    // Bathrooms
    for (let i = 1; i <= inspectionData.numBathrooms; i++) {
      newRooms.push(createRoom('bathroom', `Bathroom ${i}`));
    }
    
    // Kitchen (always 1)
    newRooms.push(createRoom('kitchen', 'Kitchen'));
    
    // Living room (always 1)
    newRooms.push(createRoom('living', 'Living Room'));
    
    // Hallways
    for (let i = 1; i <= inspectionData.numHallways; i++) {
      newRooms.push(createRoom('hallway', `Hallway ${i}`));
    }
    
    // Other rooms
    for (let i = 1; i <= inspectionData.numOtherRooms; i++) {
      newRooms.push(createRoom('other', `Other Room ${i}`));
    }
    
    setRooms(newRooms);
  };

  // Update inspection data
  const updateInspectionData = (field, value) => {
    setInspectionData(prev => ({ ...prev, [field]: value }));
  };

  // Update room data
  const updateRoom = (roomId, field, value) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId ? { ...room, [field]: value } : room
    ));
  };

  // Photo handling
  const handlePhotoUpload = (e, roomId, field) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const photo = {
          id: Date.now() + Math.random(),
          data: event.target.result,
          comment: '',
          workOrderNumber: ''
        };
        
        setRooms(prev => prev.map(room => {
          if (room.id === roomId) {
            return {
              ...room,
              [field]: [...(room[field] || []), photo]
            };
          }
          return room;
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (roomId, field, photoId) => {
    setRooms(prev => prev.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          [field]: room[field].filter(p => p.id !== photoId)
        };
      }
      return room;
    }));
  };

  const updatePhotoComment = (roomId, field, photoId, comment) => {
    setRooms(prev => prev.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          [field]: room[field].map(p => 
            p.id === photoId ? { ...p, comment } : p
          )
        };
      }
      return room;
    }));
  };

  const updatePhotoWorkOrder = (roomId, field, photoId, workOrderNumber) => {
    setRooms(prev => prev.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          [field]: room[field].map(p => 
            p.id === photoId ? { ...p, workOrderNumber } : p
          )
        };
      }
      return room;
    }));
  };

  // Navigation
  const goToNextStep = () => {
    if (currentStep === 2) {
      initializeRooms();
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
      setCurrentRoomIndex(0);
    } else {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const goToPreviousStep = () => {
    if (currentStep === 4 && currentRoomIndex > 0) {
      setCurrentRoomIndex(prev => prev - 1);
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
  };

  const goToNextRoom = () => {
    if (currentRoomIndex < rooms.length - 1) {
      setCurrentRoomIndex(prev => prev + 1);
    } else {
      setCurrentStep(5);
    }
  };

  const goToPreviousRoom = () => {
    if (currentRoomIndex > 0) {
      setCurrentRoomIndex(prev => prev - 1);
    }
  };

  // Generate filename
  const generateFilename = () => {
    const date = new Date(inspectionData.inspectionDate);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${inspectionData.propertyName}_${inspectionData.unitNumber}_${inspectionData.tenantInitial}${inspectionData.tenantLastName}_${month}_${day}_${year}.pdf`;
  };

  // Generate Report
  const generateReport = () => {
    setShowReport(true);
  };

  const printReport = () => {
    window.print();
  };

  const emailReport = () => {
    const subject = encodeURIComponent(`Inspection Report - ${inspectionData.propertyName} Unit ${inspectionData.unitNumber}`);
    const body = encodeURIComponent(`Please find attached the inspection report for ${inspectionData.propertyName}, Unit ${inspectionData.unitNumber}.`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // Render photo section with work order integration
  const renderPhotoSection = (room, field, label) => {
    const showPhotos = room[`${field}WorkOrder`];
    const photos = room[field] || [];
    
    if (!showPhotos) return null;
    
    return (
      <div className="mt-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        
        <button
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.accept = 'image/*';
            input.onchange = (e) => handlePhotoUpload(e, room.id, field);
            input.click();
          }}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          <Camera className="w-4 h-4" />
          <span>Add Photos</span>
        </button>
        
        {photos.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-3">
            {photos.map(photo => (
              <div key={photo.id} className="relative border rounded p-1 bg-white">
                <img src={photo.data} alt="Inspection" className="w-full h-24 object-cover rounded" />
                <button
                  onClick={() => removePhoto(room.id, field, photo.id)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
                <input
                  type="text"
                  placeholder="Photo description..."
                  value={photo.comment}
                  onChange={(e) => updatePhotoComment(room.id, field, photo.id, e.target.value)}
                  className="w-full mt-1 p-1 text-xs border rounded"
                />
                <input
                  type="text"
                  placeholder="WO #"
                  value={photo.workOrderNumber}
                  onChange={(e) => updatePhotoWorkOrder(room.id, field, photo.id, e.target.value)}
                  className="w-full mt-1 p-1 text-xs border rounded"
                  maxLength="10"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render work order section
  const renderWorkOrderSection = (room, field, needsCondition = true) => {
    const condition = room[`${field}Condition`];
    const showWorkOrder = needsCondition ? (condition === 'Fair' || condition === 'Poor') : true;
    
    if (!showWorkOrder && needsCondition) return null;
    
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mt-2">
        <label className="flex items-center space-x-2 mb-2">
          <input
            type="checkbox"
            checked={room[`${field}WorkOrder`]}
            onChange={(e) => updateRoom(room.id, `${field}WorkOrder`, e.target.checked)}
            className="rounded"
          />
          <span className="text-sm font-semibold text-yellow-900">Create Work Order</span>
        </label>
        
        {room[`${field}WorkOrder`] && (
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={room[`${field}Notes`]}
                onChange={(e) => updateRoom(room.id, `${field}Notes`, e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded"
                rows="2"
                placeholder="Describe the issue and required action..."
              />
            </div>
            
            {renderPhotoSection(room, `${field}Photos`, 'Evidence Photos')}
          </div>
        )}
      </div>
    );
  };

  // Progress bar
  const renderProgressBar = () => (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700">Inspection Progress</span>
        <span className="text-sm text-blue-600">Step {currentStep} of 5</span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(step => (
          <div
            key={step}
            className={`flex-1 h-2 rounded ${
              step < currentStep ? 'bg-green-500' :
              step === currentStep ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-600">
        <span>Property</span>
        <span>Config</span>
        <span>Systems</span>
        <span>Rooms</span>
        <span>Report</span>
      </div>
    </div>
  );

  // Step 1: Property Information
  const renderStep1 = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Property & Tenant Information</h2>
      
      <div className="space-y-4">
        {/* Property Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Name <span className="text-red-500">*</span>
          </label>
          <select
            value={inspectionData.propertyName}
            onChange={(e) => updateInspectionData('propertyName', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="Park Village 1">Park Village 1</option>
            <option value="Park Village 2">Park Village 2</option>
            <option value="Custom">Custom</option>
          </select>
          {inspectionData.propertyName === 'Custom' && (
            <input
              type="text"
              value={inspectionData.propertyNameCustom}
              onChange={(e) => updateInspectionData('propertyNameCustom', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Enter custom property name"
              required
            />
          )}
        </div>

        {/* Property Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Address <span className="text-red-500">*</span>
          </label>
          <select
            value={inspectionData.propertyAddress}
            onChange={(e) => updateInspectionData('propertyAddress', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="502 South 5th Street, Yakima WA">502 South 5th Street, Yakima WA (Park Village 1)</option>
            <option value="554 South 5th Street, Yakima WA">554 South 5th Street, Yakima WA (Park Village 2)</option>
            <option value="Custom">Custom</option>
          </select>
          {inspectionData.propertyAddress === 'Custom' && (
            <input
              type="text"
              value={inspectionData.propertyAddressCustom}
              onChange={(e) => updateInspectionData('propertyAddressCustom', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Enter custom address"
              required
            />
          )}
        </div>

        {/* Unit Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unit Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={inspectionData.unitNumber}
            onChange={(e) => updateInspectionData('unitNumber', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="e.g., 001, A-1"
            required
          />
        </div>

        {/* Tenant Information */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tenant First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={inspectionData.tenantFirstName}
              onChange={(e) => {
                updateInspectionData('tenantFirstName', e.target.value);
                if (e.target.value) {
                  updateInspectionData('tenantInitial', e.target.value.charAt(0).toUpperCase());
                }
              }}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Initial</label>
            <input
              type="text"
              value={inspectionData.tenantInitial}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-50"
              maxLength="1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tenant Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={inspectionData.tenantLastName}
            onChange={(e) => updateInspectionData('tenantLastName', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Inspector Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Inspector Name <span className="text-red-500">*</span>
          </label>
          <select
            value={inspectionData.inspectorName}
            onChange={(e) => updateInspectionData('inspectorName', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="Ellie McNelley">Ellie McNelley</option>
            <option value="Julian Rubio">Julian Rubio</option>
            <option value="Custom">Custom</option>
          </select>
          {inspectionData.inspectorName === 'Custom' && (
            <input
              type="text"
              value={inspectionData.inspectorNameCustom}
              onChange={(e) => updateInspectionData('inspectorNameCustom', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Enter custom inspector name"
              required
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Inspection Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={inspectionData.inspectionDate}
              onChange={(e) => updateInspectionData('inspectionDate', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Inspection Type <span className="text-red-500">*</span>
            </label>
            <select
              value={inspectionData.inspectionType}
              onChange={(e) => updateInspectionData('inspectionType', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="Move-In">Move-In</option>
              <option value="Move-Out">Move-Out</option>
              <option value="Annual">Annual</option>
              <option value="Special">Special</option>
            </select>
          </div>
        </div>

        {/* Program Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Program Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['HUD NSPIRE', 'HOME', 'LIHTC', 'USDA Rural Development', 'Section 8'].map(program => (
              <label key={program} className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={inspectionData.programType.includes(program)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateInspectionData('programType', [...inspectionData.programType, program]);
                    } else {
                      updateInspectionData('programType', inspectionData.programType.filter(p => p !== program));
                    }
                  }}
                  className="rounded"
                />
                <span className="text-sm">{program}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Federal Compliance Notice */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
          <p className="text-sm text-blue-900 font-semibold">
            Federal Compliance Priority: This inspection strictly adheres to HUD NSPIRE standards and all applicable federal regulations.
          </p>
        </div>
      </div>
    </div>
  );

  // Step 2: Unit Configuration
  const renderStep2 = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Unit Layout Configuration</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Bedrooms <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={inspectionData.numBedrooms}
              onChange={(e) => updateInspectionData('numBedrooms', parseInt(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Bathrooms <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={inspectionData.numBathrooms}
              onChange={(e) => updateInspectionData('numBathrooms', parseInt(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Hallways
            </label>
            <input
              type="number"
              min="0"
              max="5"
              value={inspectionData.numHallways}
              onChange={(e) => updateInspectionData('numHallways', parseInt(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Other Rooms
            </label>
            <input
              type="number"
              min="0"
              max="5"
              value={inspectionData.numOtherRooms}
              onChange={(e) => updateInspectionData('numOtherRooms', parseInt(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded">
          <p className="text-sm text-gray-700">
            <strong>Total Rooms to Inspect:</strong> {
              inspectionData.numBedrooms + 
              inspectionData.numBathrooms + 
              inspectionData.numHallways + 
              inspectionData.numOtherRooms + 
              2 // Kitchen + Living Room
            }
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Note: Kitchen and Living Room are automatically included
          </p>
        </div>
      </div>
    </div>
  );

  // Step 3: Global Features
  const renderStep3 = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Global Systems & Features</h2>
      
      <div className="space-y-6">
        {/* Heating */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Heating System</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={inspectionData.heatingType}
                onChange={(e) => updateInspectionData('heatingType', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="forced-air">Forced Air</option>
                <option value="baseboard">Baseboard</option>
                <option value="radiant">Radiant</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Source</label>
              <select
                value={inspectionData.heatingFuel}
                onChange={(e) => updateInspectionData('heatingFuel', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="gas">Natural Gas</option>
                <option value="electric">Electric</option>
                <option value="oil">Oil</option>
                <option value="propane">Propane</option>
              </select>
            </div>
          </div>
          {inspectionData.heatingFuel !== 'electric' && (
            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-900">
                ⚠️ CO2 alarms required with fuel-burning heating systems
              </p>
            </div>
          )}
        </div>

        {/* Cooling */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Cooling System</h3>
          <select
            value={inspectionData.coolingType}
            onChange={(e) => updateInspectionData('coolingType', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="central-ac">Central Air Conditioning</option>
            <option value="window-units">Window Units</option>
            <option value="none">None</option>
          </select>
        </div>

        {/* Water Heater */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Water Heater (NSPIRE Required Checks)</h3>
          <label className="flex items-center space-x-2 mb-3">
            <input
              type="checkbox"
              checked={inspectionData.waterHeater}
              onChange={(e) => updateInspectionData('waterHeater', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium">Unit has water heater</span>
          </label>
          
          {inspectionData.waterHeater && (
            <div className="space-y-3 ml-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={inspectionData.waterHeaterLocation}
                  onChange={(e) => updateInspectionData('waterHeaterLocation', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., Closet, Basement, Garage"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Install Date</label>
                <select
                  value={inspectionData.waterHeaterInstallDate}
                  onChange={(e) => updateInspectionData('waterHeaterInstallDate', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="Unknown">Unknown</option>
                  <option value="< 5 years">&lt; 5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="> 10 years">&gt; 10 years</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
              
              {inspectionData.waterHeaterInstallDate === 'Custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specify Date</label>
                  <input
                    type="text"
                    value={inspectionData.waterHeaterCustomDate}
                    onChange={(e) => updateInspectionData('waterHeaterCustomDate', e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter install date"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Continue in next message due to length...
  
  // Step 4: Room Inspections
  const renderStep4 = () => {
    const currentRoom = rooms[currentRoomIndex];
    if (!currentRoom) return null;
    
    return (
      <div className="space-y-6">
        {/* Room Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold">{currentRoom.name}</h3>
          <p className="text-sm opacity-90">Room {currentRoomIndex + 1} of {rooms.length}</p>
        </div>

        {/* Room Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {rooms.map((room, idx) => (
            <button
              key={room.id}
              onClick={() => setCurrentRoomIndex(idx)}
              className={`px-3 py-2 rounded text-sm font-medium whitespace-nowrap ${
                idx === currentRoomIndex 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>

        {/* Housekeeping */}
        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Housekeeping (NSPIRE Required)</h4>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={currentRoom.housekeepingAcceptable}
              onChange={(e) => updateRoom(currentRoom.id, 'housekeepingAcceptable', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Housekeeping Acceptable</span>
          </label>
        </div>

        {/* Smoke & CO2 Alarms - CRITICAL SECTION */}
        {(currentRoom.type === 'bedroom' || currentRoom.type === 'hallway' || currentRoom.type === 'living') && (
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-3">
              🚨 CRITICAL: Life Safety Devices (NSPIRE Required)
            </h4>
            
            {/* Smoke Alarm */}
            <div className="bg-white p-3 rounded mb-3">
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={currentRoom.hasSmokeAlarm}
                  onChange={(e) => updateRoom(currentRoom.id, 'hasSmokeAlarm', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-semibold">Smoke Alarm Present (REQUIRED)</span>
              </label>
              
              {currentRoom.hasSmokeAlarm && (
                <div className="ml-6 space-y-2">
                  <select
                    value={currentRoom.smokeAlarmType}
                    onChange={(e) => updateRoom(currentRoom.id, 'smokeAlarmType', e.target.value)}
                    className="w-full p-2 text-sm border rounded"
                  >
                    <option value="">Select Type...</option>
                    <option value="smoke">Smoke Only</option>
                    <option value="co2">CO2 Only</option>
                    <option value="combo">Combination Smoke/CO2</option>
                  </select>
                  
                  <select
                    value={currentRoom.smokeAlarmStatus}
                    onChange={(e) => updateRoom(currentRoom.id, 'smokeAlarmStatus', e.target.value)}
                    className="w-full p-2 text-sm border rounded"
                  >
                    <option value="Working">Working</option>
                    <option value="NeedsBattery">Needs Battery</option>
                    <option value="Replace">Needs Replacement</option>
                  </select>
                  
                  {/* Work Order Checkbox for Smoke Alarm */}
                  {currentRoom.smokeAlarmStatus !== 'Working' && (
                    <div className="bg-yellow-50 border border-yellow-300 p-2 rounded">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={currentRoom.smokeAlarmWorkOrder}
                          onChange={(e) => updateRoom(currentRoom.id, 'smokeAlarmWorkOrder', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm font-semibold text-yellow-900">Create Work Order</span>
                      </label>
                      
                      {currentRoom.smokeAlarmWorkOrder && (
                        <div className="mt-2 space-y-2">
                          <textarea
                            value={currentRoom.smokeAlarmNotes}
                            onChange={(e) => updateRoom(currentRoom.id, 'smokeAlarmNotes', e.target.value)}
                            className="w-full p-2 text-sm border rounded"
                            rows="2"
                            placeholder="Describe issue..."
                          />
                          {renderPhotoSection(currentRoom, 'smokeAlarmPhotos', 'Photos')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {!currentRoom.hasSmokeAlarm && (
                <div className="ml-6 bg-red-100 border border-red-300 p-2 rounded text-sm text-red-800">
                  ⚠️ NSPIRE VIOLATION: Smoke alarm required in {currentRoom.type}
                </div>
              )}
            </div>
            
            {/* CO2 Alarm (if fuel-burning) */}
            {inspectionData.heatingFuel && inspectionData.heatingFuel !== 'electric' && (
              <div className="bg-white p-3 rounded">
                <label className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={currentRoom.hasCO2Alarm}
                    onChange={(e) => updateRoom(currentRoom.id, 'hasCO2Alarm', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-semibold">CO2 Alarm Present (REQUIRED with fuel-burning)</span>
                </label>
                
                {currentRoom.hasCO2Alarm && (
                  <div className="ml-6 space-y-2">
                    <select
                      value={currentRoom.co2AlarmStatus}
                      onChange={(e) => updateRoom(currentRoom.id, 'co2AlarmStatus', e.target.value)}
                      className="w-full p-2 text-sm border rounded"
                    >
                      <option value="Working">Working</option>
                      <option value="NeedsBattery">Needs Battery</option>
                      <option value="Replace">Needs Replacement</option>
                    </select>
                  </div>
                )}
                
                {!currentRoom.hasCO2Alarm && (
                  <div className="ml-6 bg-red-100 border border-red-300 p-2 rounded text-sm text-red-800">
                    ⚠️ NSPIRE VIOLATION: CO2 alarm required with fuel-burning heat
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Flooring */}
        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Flooring (NSPIRE Required)</h4>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={currentRoom.flooringType}
                onChange={(e) => updateRoom(currentRoom.id, 'flooringType', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select...</option>
                {FLOORING_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
              <select
                value={currentRoom.flooringCondition}
                onChange={(e) => updateRoom(currentRoom.id, 'flooringCondition', e.target.value)}
                className="w-full p-2 border rounded"
              >
                {CONDITIONS.map(cond => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
            </div>
          </div>
          
          {renderWorkOrderSection(currentRoom, 'flooring')}
        </div>

        {/* Walls */}
        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Walls (NSPIRE Required)</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
            <select
              value={currentRoom.wallsCondition}
              onChange={(e) => updateRoom(currentRoom.id, 'wallsCondition', e.target.value)}
              className="w-full p-2 border rounded"
            >
              {CONDITIONS.map(cond => (
                <option key={cond} value={cond}>{cond}</option>
              ))}
            </select>
          </div>
          
          {renderWorkOrderSection(currentRoom, 'walls')}
        </div>

        {/* Ceiling */}
        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Ceiling (NSPIRE Required)</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
            <select
              value={currentRoom.ceilingCondition}
              onChange={(e) => updateRoom(currentRoom.id, 'ceilingCondition', e.target.value)}
              className="w-full p-2 border rounded"
            >
              {CONDITIONS.map(cond => (
                <option key={cond} value={cond}>{cond}</option>
              ))}
            </select>
          </div>
          
          {renderWorkOrderSection(currentRoom, 'ceiling')}
        </div>

        {/* Windows */}
        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Windows</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
            <select
              value={currentRoom.windowsCondition}
              onChange={(e) => updateRoom(currentRoom.id, 'windowsCondition', e.target.value)}
              className="w-full p-2 border rounded"
            >
              {CONDITIONS.map(cond => (
                <option key={cond} value={cond}>{cond}</option>
              ))}
            </select>
          </div>
          
          {renderWorkOrderSection(currentRoom, 'windows')}
        </div>

        {/* Doors */}
        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Doors</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
            <select
              value={currentRoom.doorsCondition}
              onChange={(e) => updateRoom(currentRoom.id, 'doorsCondition', e.target.value)}
              className="w-full p-2 border rounded"
            >
              {CONDITIONS.map(cond => (
                <option key={cond} value={cond}>{cond}</option>
              ))}
            </select>
          </div>
          
          {renderWorkOrderSection(currentRoom, 'doors')}
        </div>

        {/* Electrical - WITH WORK ORDER BUTTON */}
        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Electrical (NSPIRE Required)</h4>
          
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={currentRoom.electricalOutlets}
                onChange={(e) => updateRoom(currentRoom.id, 'electricalOutlets', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">All outlets functional</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={currentRoom.electricalSwitches}
                onChange={(e) => updateRoom(currentRoom.id, 'electricalSwitches', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">All switches functional</span>
            </label>
            
            {(currentRoom.type === 'kitchen' || currentRoom.type === 'bathroom') && (
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={currentRoom.electricalGFI}
                  onChange={(e) => updateRoom(currentRoom.id, 'electricalGFI', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-semibold text-red-700">GFI protection present (REQUIRED)</span>
              </label>
            )}
          </div>
          
          {/* Work Order Button for Electrical */}
          {(!currentRoom.electricalOutlets || !currentRoom.electricalSwitches || 
            ((currentRoom.type === 'kitchen' || currentRoom.type === 'bathroom') && !currentRoom.electricalGFI)) && (
            <div className="bg-yellow-50 border border-yellow-300 p-3 mt-3 rounded">
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={currentRoom.electricalWorkOrder}
                  onChange={(e) => updateRoom(currentRoom.id, 'electricalWorkOrder', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-semibold text-yellow-900">Create Work Order</span>
              </label>
              
              {currentRoom.electricalWorkOrder && (
                <div className="space-y-2">
                  <textarea
                    value={currentRoom.electricalNotes}
                    onChange={(e) => updateRoom(currentRoom.id, 'electricalNotes', e.target.value)}
                    className="w-full p-2 text-sm border rounded"
                    rows="2"
                    placeholder="Describe electrical issues..."
                  />
                  {renderPhotoSection(currentRoom, 'electricalPhotos', 'Evidence Photos')}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Room Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={goToPreviousRoom}
            disabled={currentRoomIndex === 0}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-lg disabled:bg-gray-300 hover:bg-gray-600"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous Room</span>
          </button>
          
          <button
            onClick={goToNextRoom}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <span>{currentRoomIndex === rooms.length - 1 ? 'Complete Inspection' : 'Next Room'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  // Step 5: Generate Report
  const renderStep5 = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Generate Inspection Report</h2>
      
      <div className="space-y-6">
        {/* Summary */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Inspection Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-700"><span className="font-medium">Property:</span> {inspectionData.propertyName}</p>
              <p className="text-gray-700"><span className="font-medium">Unit:</span> {inspectionData.unitNumber}</p>
              <p className="text-gray-700"><span className="font-medium">Tenant:</span> {inspectionData.tenantFirstName} {inspectionData.tenantLastName}</p>
            </div>
            <div>
              <p className="text-gray-700"><span className="font-medium">Inspector:</span> {inspectionData.inspectorName}</p>
              <p className="text-gray-700"><span className="font-medium">Date:</span> {inspectionData.inspectionDate}</p>
              <p className="text-gray-700"><span className="font-medium">Type:</span> {inspectionData.inspectionType}</p>
            </div>
          </div>
        </div>
        
        {/* Rooms Inspected */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Rooms Inspected</h3>
          <div className="grid grid-cols-3 gap-2">
            {rooms.map(room => (
              <div key={room.id} className="bg-gray-100 p-2 rounded text-sm">
                <CheckCircle className="w-4 h-4 inline mr-1 text-green-500" />
                {room.name}
              </div>
            ))}
          </div>
        </div>
        
        {/* NSPIRE Compliance */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              checked={inspectionData.complianceStatement}
              onChange={(e) => updateInspectionData('complianceStatement', e.target.checked)}
              className="mt-1 rounded"
            />
            <div>
              <span className="font-semibold text-green-900">NSPIRE Compliance Declaration</span>
              <p className="text-sm text-green-800 mt-1">
                I certify that this inspection was conducted in accordance with HUD's National Standards for the Physical Inspection of Real Estate (NSPIRE) and all applicable federal regulations.
              </p>
            </div>
          </label>
        </div>
        
        {/* Report Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Report Notes</label>
          <textarea
            value={inspectionData.reportNotes}
            onChange={(e) => updateInspectionData('reportNotes', e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
            placeholder="Any additional notes or observations..."
          />
        </div>
        
        {/* Generate Button */}
        <div className="flex justify-center">
          <button
            onClick={generateReport}
            className="flex items-center justify-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg"
          >
            <FileText className="w-6 h-6" />
            <span>Generate Report</span>
          </button>
        </div>
        
        {/* Back Button */}
        <div className="flex justify-start">
          <button
            onClick={() => {
              setCurrentStep(4);
              setCurrentRoomIndex(rooms.length - 1);
            }}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Inspections</span>
          </button>
        </div>
        
        {/* Legal Disclaimer */}
        <div className="bg-gray-100 p-4 rounded text-xs text-gray-600">
          <p className="font-semibold mb-2">Legal Disclaimer:</p>
          <p>
            This inspection report assists with federal compliance but does not replace professional legal counsel. 
            Property owners and managers are solely responsible for ensuring full compliance with all applicable 
            federal, state, and local regulations.
          </p>
        </div>
      </div>
    </div>
  );

  // Continue in next part...

  // Generate Report HTML
  const renderReport = () => {
    const propertyName = inspectionData.propertyName === 'Custom' ? 
      inspectionData.propertyNameCustom : inspectionData.propertyName;
    const propertyAddress = inspectionData.propertyAddress === 'Custom' ? 
      inspectionData.propertyAddressCustom : inspectionData.propertyAddress;
    const inspectorName = inspectionData.inspectorName === 'Custom' ? 
      inspectionData.inspectorNameCustom : inspectionData.inspectorName;

    return (
      <div className="bg-white p-8 max-w-5xl mx-auto">
        {/* Report Header with Logo */}
        <div className="text-center mb-6 pb-4 border-b-2 border-gray-300">
          <img src={COMPANY_LOGO} alt="Company Logo" className="mx-auto mb-4" style={{maxHeight: '80px'}} />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NSPIRE-Compliant Rental Unit Inspection Report</h1>
          <p className="text-sm text-gray-600">Federal Housing Compliance | Park Village Properties</p>
        </div>

        {/* Property Information Table */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 bg-blue-600 text-white p-2">Property Information</h2>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <tbody>
              <tr className="border-b">
                <th className="bg-gray-100 p-2 text-left font-semibold border-r">Property Name</th>
                <td className="p-2">{propertyName}</td>
                <th className="bg-gray-100 p-2 text-left font-semibold border-r">Unit Number</th>
                <td className="p-2">{inspectionData.unitNumber}</td>
              </tr>
              <tr className="border-b">
                <th className="bg-gray-100 p-2 text-left font-semibold border-r">Property Address</th>
                <td className="p-2" colSpan="3">{propertyAddress}</td>
              </tr>
              <tr className="border-b">
                <th className="bg-gray-100 p-2 text-left font-semibold border-r">Tenant Name</th>
                <td className="p-2">{inspectionData.tenantFirstName} {inspectionData.tenantLastName}</td>
                <th className="bg-gray-100 p-2 text-left font-semibold border-r">Inspection Date</th>
                <td className="p-2">{inspectionData.inspectionDate}</td>
              </tr>
              <tr>
                <th className="bg-gray-100 p-2 text-left font-semibold border-r">Inspector</th>
                <td className="p-2">{inspectorName}</td>
                <th className="bg-gray-100 p-2 text-left font-semibold border-r">Inspection Type</th>
                <td className="p-2">{inspectionData.inspectionType}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Unit Configuration */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 bg-blue-600 text-white p-2">Unit Configuration</h2>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <tbody>
              <tr>
                <th className="bg-gray-100 p-2 text-left font-semibold border-r">Bedrooms</th>
                <td className="p-2">{inspectionData.numBedrooms}</td>
                <th className="bg-gray-100 p-2 text-left font-semibold border-r">Bathrooms</th>
                <td className="p-2">{inspectionData.numBathrooms}</td>
              </tr>
              <tr>
                <th className="bg-gray-100 p-2 text-left font-semibold border-r">Heating Type</th>
                <td className="p-2">{inspectionData.heatingType}</td>
                <th className="bg-gray-100 p-2 text-left font-semibold border-r">Heating Fuel</th>
                <td className="p-2">{inspectionData.heatingFuel}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Room-by-Room Inspections */}
        {rooms.map(room => (
          <div key={room.id} className="mb-6 page-break-inside-avoid">
            <h2 className="text-xl font-bold mb-3 bg-gray-700 text-white p-2">{room.name}</h2>
            
            <table className="w-full border-collapse border border-gray-300 text-sm mb-3">
              <tbody>
                {/* Only show if data exists */}
                {room.housekeepingAcceptable !== undefined && (
                  <tr>
                    <th className="bg-gray-100 p-2 text-left font-semibold border-r w-1/4">Housekeeping</th>
                    <td className="p-2">{room.housekeepingAcceptable ? 'Acceptable' : 'Not Acceptable'}</td>
                  </tr>
                )}
                
                {/* Smoke Alarm */}
                {(room.type === 'bedroom' || room.type === 'hallway' || room.type === 'living') && (
                  <>
                    <tr className="bg-red-50">
                      <th className="bg-red-100 p-2 text-left font-semibold border-r">Smoke Alarm</th>
                      <td className="p-2">
                        {room.hasSmokeAlarm ? (
                          <>✓ Present - {room.smokeAlarmType} - {room.smokeAlarmStatus}</>
                        ) : (
                          <span className="text-red-700 font-bold">⚠️ MISSING - NSPIRE VIOLATION</span>
                        )}
                      </td>
                    </tr>
                    {room.smokeAlarmWorkOrder && (
                      <tr>
                        <th className="bg-yellow-100 p-2 text-left font-semibold border-r">Work Order</th>
                        <td className="p-2 bg-yellow-50">
                          <span className="font-semibold text-yellow-900">WO REQUIRED</span>
                          {room.smokeAlarmNotes && <div className="mt-1">{room.smokeAlarmNotes}</div>}
                        </td>
                      </tr>
                    )}
                  </>
                )}
                
                {/* Flooring */}
                {room.flooringType && (
                  <tr>
                    <th className="bg-gray-100 p-2 text-left font-semibold border-r">Flooring</th>
                    <td className="p-2">{room.flooringType} - {room.flooringCondition}</td>
                  </tr>
                )}
                {room.flooringWorkOrder && room.flooringNotes && (
                  <tr>
                    <th className="bg-yellow-100 p-2 text-left font-semibold border-r">Flooring WO</th>
                    <td className="p-2 bg-yellow-50">{room.flooringNotes}</td>
                  </tr>
                )}
                
                {/* Walls */}
                {room.wallsCondition && room.wallsCondition !== 'Good' && (
                  <tr>
                    <th className="bg-gray-100 p-2 text-left font-semibold border-r">Walls</th>
                    <td className="p-2">{room.wallsCondition}</td>
                  </tr>
                )}
                {room.wallsWorkOrder && room.wallsNotes && (
                  <tr>
                    <th className="bg-yellow-100 p-2 text-left font-semibold border-r">Walls WO</th>
                    <td className="p-2 bg-yellow-50">{room.wallsNotes}</td>
                  </tr>
                )}
                
                {/* Ceiling */}
                {room.ceilingCondition && room.ceilingCondition !== 'Good' && (
                  <tr>
                    <th className="bg-gray-100 p-2 text-left font-semibold border-r">Ceiling</th>
                    <td className="p-2">{room.ceilingCondition}</td>
                  </tr>
                )}
                {room.ceilingWorkOrder && room.ceilingNotes && (
                  <tr>
                    <th className="bg-yellow-100 p-2 text-left font-semibold border-r">Ceiling WO</th>
                    <td className="p-2 bg-yellow-50">{room.ceilingNotes}</td>
                  </tr>
                )}
                
                {/* Windows */}
                {room.windowsCondition && room.windowsCondition !== 'Good' && (
                  <tr>
                    <th className="bg-gray-100 p-2 text-left font-semibold border-r">Windows</th>
                    <td className="p-2">{room.windowsCondition}</td>
                  </tr>
                )}
                {room.windowsWorkOrder && room.windowsNotes && (
                  <tr>
                    <th className="bg-yellow-100 p-2 text-left font-semibold border-r">Windows WO</th>
                    <td className="p-2 bg-yellow-50">{room.windowsNotes}</td>
                  </tr>
                )}
                
                {/* Electrical */}
                {(!room.electricalOutlets || !room.electricalSwitches || !room.electricalGFI) && (
                  <tr>
                    <th className="bg-gray-100 p-2 text-left font-semibold border-r">Electrical</th>
                    <td className="p-2">
                      {!room.electricalOutlets && <div>⚠️ Outlets not functional</div>}
                      {!room.electricalSwitches && <div>⚠️ Switches not functional</div>}
                      {!room.electricalGFI && (room.type === 'kitchen' || room.type === 'bathroom') && (
                        <div className="text-red-700 font-bold">⚠️ Missing GFI - NSPIRE VIOLATION</div>
                      )}
                    </td>
                  </tr>
                )}
                {room.electricalWorkOrder && room.electricalNotes && (
                  <tr>
                    <th className="bg-yellow-100 p-2 text-left font-semibold border-r">Electrical WO</th>
                    <td className="p-2 bg-yellow-50">{room.electricalNotes}</td>
                  </tr>
                )}
              </tbody>
            </table>
            
            {/* Photos for this room */}
            {Object.keys(room).filter(key => key.endsWith('Photos') && room[key].length > 0).map(photoKey => {
              const photos = room[photoKey];
              const sectionName = photoKey.replace('Photos', '').replace(/([A-Z])/g, ' $1').trim();
              
              return (
                <div key={photoKey} className="mb-3">
                  <h3 className="font-semibold text-gray-700 mb-2 capitalize">{sectionName} Photos</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {photos.map((photo, idx) => (
                      <div key={photo.id} className="border rounded p-2">
                        <img src={photo.data} alt={`${sectionName} ${idx + 1}`} className="w-full h-32 object-cover rounded" />
                        {photo.comment && (
                          <p className="text-xs mt-1 text-gray-700"><strong>Note:</strong> {photo.comment}</p>
                        )}
                        {photo.workOrderNumber && (
                          <p className="text-xs text-yellow-900 font-semibold">
                            ☑ WO #: {photo.workOrderNumber}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {/* Additional Notes */}
        {inspectionData.reportNotes && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 bg-blue-600 text-white p-2">Additional Notes</h2>
            <div className="p-3 border border-gray-300 rounded">
              {inspectionData.reportNotes}
            </div>
          </div>
        )}

        {/* NSPIRE Compliance Statement */}
        {inspectionData.complianceStatement && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded">
            <h3 className="font-bold text-green-900 mb-2">NSPIRE Compliance Certification</h3>
            <p className="text-sm text-green-800">
              This inspection was conducted in accordance with HUD's National Standards for the Physical 
              Inspection of Real Estate (NSPIRE) and all applicable federal regulations for {inspectionData.programType.join(', ')} programs.
            </p>
          </div>
        )}

        {/* Signature Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 bg-gray-700 text-white p-2">Signatures</h2>
          <table className="w-full border-collapse border border-gray-300">
            <tr>
              <th className="bg-gray-100 p-4 text-center font-semibold border-r w-1/2">Inspector Signature</th>
              <th className="bg-gray-100 p-4 text-center font-semibold w-1/2">Tenant Signature</th>
            </tr>
            <tr>
              <td className="p-8 text-center border-r">
                <div className="border-b-2 border-gray-400 pb-2 mb-2" style={{minHeight: '60px'}}></div>
                <div><strong>{inspectorName}</strong></div>
                <div className="text-sm text-gray-600">Date: {inspectionData.inspectionDate}</div>
              </td>
              <td className="p-8 text-center">
                <div className="border-b-2 border-gray-400 pb-2 mb-2" style={{minHeight: '60px'}}></div>
                <div><strong>{inspectionData.tenantFirstName} {inspectionData.tenantLastName}</strong></div>
                <div className="text-sm text-gray-600">Date: {inspectionData.inspectionDate}</div>
              </td>
            </tr>
          </table>
        </div>

        {/* Legal Disclaimer */}
        <div className="text-xs text-gray-600 p-3 bg-gray-100 rounded mb-6">
          <p className="font-semibold mb-1">Legal Disclaimer:</p>
          <p>
            This inspection report is generated as a tool to assist in compliance with federal housing regulations. 
            Property owners and managers are solely responsible for ensuring full compliance with all applicable 
            federal, state, and local regulations including but not limited to: HUD regulations, HOME program requirements, 
            LIHTC compliance, USDA Rural Development standards, Fair Housing Act, Section 504 accessibility requirements, 
            and all applicable landlord-tenant laws. This report does not constitute legal advice.
          </p>
        </div>

        {/* Action Buttons - ONLY ON REPORT PAGE */}
        <div className="flex justify-center space-x-4 mb-6 no-print">
          <button
            onClick={printReport}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            <Printer className="w-5 h-5" />
            <span>Print to PDF</span>
          </button>
          
          <button
            onClick={emailReport}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
          >
            <Mail className="w-5 h-5" />
            <span>Email Report</span>
          </button>
          
          <button
            onClick={() => setShowReport(false)}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Inspection</span>
          </button>
        </div>

        {/* Fair Housing Logo - Bottom Right */}
        <div className="fixed bottom-4 right-4 no-print">
          <div dangerouslySetInnerHTML={{__html: FAIR_HOUSING_LOGO}} />
        </div>
      </div>
    );
  };

  // Main Render
  return (
    <>
      {showReport ? (
        // Report View
        <div className="min-h-screen bg-gray-100 py-8">
          {renderReport()}
        </div>
      ) : (
        // Inspection Form View
        <div className="min-h-screen bg-gray-100 p-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg shadow-lg mb-6">
              <h1 className="text-3xl font-bold mb-2">NSPIRE-Compliant Rental Unit Inspection</h1>
              <p className="text-blue-100">
                HUD | HOME | LIHTC | USDA Rural Development | Federal Compliance
              </p>
            </div>
            
            {renderProgressBar()}
            
            {/* Step Content */}
            <div>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}
            </div>
            
            {/* Navigation Buttons (except for step 4 and 5 which have their own) */}
            {currentStep !== 4 && currentStep !== 5 && (
              <div className="flex justify-between mt-6">
                <button
                  onClick={goToPreviousStep}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-lg disabled:bg-gray-300 hover:bg-gray-600"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>
                
                <button
                  onClick={goToNextStep}
                  disabled={currentStep === 5}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <span>Next</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Fair Housing Logo - Bottom Right Corner */}
            <div className="fixed bottom-4 right-4">
              <div dangerouslySetInnerHTML={{__html: FAIR_HOUSING_LOGO}} />
            </div>
          </div>
        </div>
      )}

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .page-break-inside-avoid {
            page-break-inside: avoid;
          }
          body {
            background: white;
          }
        }
      `}</style>
    </>
  );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<RentalInspectionApp />);
