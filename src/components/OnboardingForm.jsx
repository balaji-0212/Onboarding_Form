import React, { useState, useEffect, useRef } from 'react';
import StepIndicator from './StepIndicator';
import PersonalInformation from './steps/PersonalInformation';
import EmploymentInformation from './steps/EmploymentInformation';
import ContactInformation from './steps/ContactInformation';
import ProfessionalInformation from './steps/ProfessionalInformation';
import SystemAccess from './steps/SystemAccess';
import DocumentsConfirmation from './steps/DocumentsConfirmation';
import ReviewScreen from './ReviewScreen';
import ValidationSummary from './ValidationSummary';

function OnboardingForm() {
  const TOTAL_STEPS = 7;
  const LOCAL_STORAGE_KEY = 'stacklyEmployeeOnboardingDraft';

  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef(null);

  // New states for form persistence and validation
  const [isDirty, setIsDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    employeeId: '',
    dateOfBirth: '',
    gender: '',
    personalEmail: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',

    // Employment Information
    department: '',
    designation: '',
    joiningDate: '',
    workLocation: '',
    reportingManager: '',
    employmentType: '',

    // Contact Information
    officialEmail: '',
    alternatePhone: '',
    emergencyContacts: [
      { id: crypto.randomUUID(), name: '', phone: '', relationship: '' }
    ],

    // Professional Information
    primarySkill: '',
    secondarySkills: '',
    yearsOfExperience: '',
    previousCompany: '',
    highestQualification: '',

    // System Access
    preferredUsername: '',
    systemAccess: [],
    additionalAccessRequirements: '',

    // Documents & Confirmation
    resume: null,
    joiningDocuments: null,
    termsAndConditions: false,
    informationAccurate: false,
  });

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        if (parsedDraft.emergencyContacts && Array.isArray(parsedDraft.emergencyContacts)) {
          parsedDraft.emergencyContacts = parsedDraft.emergencyContacts.map(c => ({
            ...c,
            id: c.id || crypto.randomUUID()
          }));
        }
        
        setFormData(prev => ({ ...prev, ...parsedDraft }));
        // Note: We intentionally do NOT set isDirty to true here. 
        // Initial load should be considered clean.
      } catch (e) {
        console.error("Failed to parse draft from localStorage", e);
      }
    }
  }, []);

  // Autosave with debounce
  useEffect(() => {
    if (!isDirty) return;

    setSaveStatus('Saving...');
    const timer = setTimeout(() => {
      try {
        const draftData = { ...formData };
        delete draftData.resume;
        delete draftData.joiningDocuments;
        
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(draftData));
        setSaveStatus('Saved');
        setIsDirty(false);
      } catch (e) {
        console.error("Autosave failed", e);
        setSaveStatus('Unable to save');
      }
    }, 1000); // 1-second debounce

    return () => clearTimeout(timer);
  }, [formData, isDirty]);

  // Unsaved-change warning (beforeunload)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Helper to mark form as dirty and clear validation errors
  const markDirty = () => {
    setIsDirty(true);
    setSaveStatus('Unsaved');
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handleChange = (e) => {
    markDirty();
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'termsAndConditions' || name === 'informationAccurate') {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] || null }));
    } else {
      setFormData(prev => {
        const newData = { ...prev, [name]: value };
        if (name === 'department' && value !== prev.department) {
          newData.designation = '';
        }
        return newData;
      });
    }
  };

  const handleCheckboxChange = (e) => {
    markDirty();
    const { name, value, checked } = e.target;
    if (name === 'systemAccess') {
      setFormData(prev => {
        const currentAccess = [...prev.systemAccess];
        if (checked) {
          currentAccess.push(value);
        } else {
          const index = currentAccess.indexOf(value);
          if (index > -1) currentAccess.splice(index, 1);
        }
        return { ...prev, systemAccess: currentAccess };
      });
    }
  };

  const addEmergencyContact = () => {
    markDirty();
    setFormData(prev => ({
      ...prev,
      emergencyContacts: [
        ...prev.emergencyContacts,
        { id: crypto.randomUUID(), name: '', phone: '', relationship: '' }
      ]
    }));
  };

  const removeEmergencyContact = (id) => {
    markDirty();
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter(c => c.id !== id)
    }));
  };

  const handleContactChange = (id, e) => {
    markDirty();
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.map(c => 
        c.id === id ? { ...c, [name]: value } : c
      )
    }));
  };

  const validateCurrentStep = () => {
    if (formRef.current) {
      const isValid = formRef.current.checkValidity();
      if (!isValid) {
        // Collect human-readable validation errors
        const errors = [];
        const elements = formRef.current.elements;
        
        for (let i = 0; i < elements.length; i++) {
          const el = elements[i];
          if (el.validity && !el.validity.valid) {
            let fieldName = el.name || el.id;
            // Attempt to find the associated label to get a readable name
            if (el.id) {
              const label = formRef.current.querySelector(`label[for="${el.id}"]`);
              if (label) {
                // Remove the * visually hidden span text if present
                fieldName = label.innerText.replace('*', '').trim();
              }
            } else if (el.closest('.inner-fieldset')) {
              const legend = el.closest('.inner-fieldset').querySelector('legend');
              if (legend) {
                fieldName = legend.innerText.replace('*', '').trim();
              }
            }
            
            // Only add unique errors (radio/checkbox groups might have multiple invalid elements but share the same label)
            const errorMsg = `${fieldName} is required or invalid.`;
            if (!errors.includes(errorMsg)) {
              errors.push(errorMsg);
            }
          }
        }
        
        setValidationErrors(errors);
        formRef.current.reportValidity(); // Optional: keeps native tooltips
        return false;
      }
      
      setValidationErrors([]);
      return true;
    }
    return false;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
    }
  };

  const handleBack = () => {
    setValidationErrors([]);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const saveDraft = () => {
    const draftData = { ...formData };
    delete draftData.resume;
    delete draftData.joiningDocuments;
    
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(draftData));
      setSaveStatus('Saved');
      setIsDirty(false);
      alert('Draft saved successfully!');
    } catch (e) {
      console.error("Failed to save draft", e);
      setSaveStatus('Unable to save');
      alert('Failed to save draft.');
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    alert('Draft cleared!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      setIsSuccess(true);
      setIsDirty(false); // form submitted, no longer dirty
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  if (isSuccess) {
    return (
      <div id="formSuccessMessage" className="success-message" style={{ padding: '20px', backgroundColor: 'var(--color-success-bg)', border: '1px solid var(--color-success)', borderRadius: '6px', marginBottom: '20px' }}>
        <h2 style={{ color: 'var(--color-success)', marginBottom: '8px' }}>Application Submitted Successfully!</h2>
        <p style={{ color: '#2e7d32' }}>Thank you for completing the onboarding form. HR will review your submission and contact you shortly.</p>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInformation formData={formData} handleChange={handleChange} />;
      case 2:
        return <EmploymentInformation formData={formData} handleChange={handleChange} />;
      case 3:
        return <ContactInformation 
                  formData={formData} 
                  handleChange={handleChange} 
                  addEmergencyContact={addEmergencyContact}
                  removeEmergencyContact={removeEmergencyContact}
                  handleContactChange={handleContactChange}
               />;
      case 4:
        return <ProfessionalInformation formData={formData} handleChange={handleChange} />;
      case 5:
        return <SystemAccess formData={formData} handleChange={handleChange} handleCheckboxChange={handleCheckboxChange} />;
      case 6:
        return <DocumentsConfirmation formData={formData} handleChange={handleChange} />;
      case 7:
        return <ReviewScreen formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <form ref={formRef} action="#" method="post" noValidate onSubmit={handleSubmit} id="onboardingForm">
      <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
      
      <ValidationSummary errors={validationErrors} />
      
      {renderStep()}

      <div className="form-actions" style={{ marginTop: '32px' }}>
        {currentStep > 1 && (
          <button type="button" onClick={handleBack} style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-primary)', border: '1px solid var(--color-primary)', marginRight: '16px' }}>
            Back
          </button>
        )}
        
        {currentStep < TOTAL_STEPS ? (
          <button type="button" onClick={handleNext}>Next Step</button>
        ) : (
          <button type="submit" id="submitBtn">Submit Application</button>
        )}
        
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          {saveStatus && (
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', fontWeight: '600' }}>
              {saveStatus}
            </span>
          )}
          <button type="button" onClick={saveDraft} id="saveDraftBtn" style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-primary)', border: '1px solid var(--color-primary)' }}>
            Save Draft
          </button>
          <button type="button" onClick={clearDraft} id="clearDraftBtn" style={{ backgroundColor: 'transparent', color: 'var(--color-error)', border: '1px solid var(--color-error)' }}>
            Clear Draft
          </button>
        </div>
      </div>
    </form>
  );
}

export default OnboardingForm;
