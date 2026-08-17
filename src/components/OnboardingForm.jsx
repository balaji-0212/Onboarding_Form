import React, { useState, useEffect, useRef } from 'react';
import StepIndicator from './StepIndicator';
import PersonalInformation from './steps/PersonalInformation';
import EmploymentInformation from './steps/EmploymentInformation';
import ContactInformation from './steps/ContactInformation';
import ProfessionalInformation from './steps/ProfessionalInformation';
import SystemAccess from './steps/SystemAccess';
import DocumentsConfirmation from './steps/DocumentsConfirmation';
import ReviewScreen from './ReviewScreen';

function OnboardingForm() {
  const TOTAL_STEPS = 7;
  const LOCAL_STORAGE_KEY = 'stacklyEmployeeOnboardingDraft';

  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef(null);

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
    resume: null, // File inputs are usually uncontrolled, but we track existence
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
        // Ensure emergencyContacts have valid IDs if missing (just in case)
        if (parsedDraft.emergencyContacts && Array.isArray(parsedDraft.emergencyContacts)) {
          parsedDraft.emergencyContacts = parsedDraft.emergencyContacts.map(c => ({
            ...c,
            id: c.id || crypto.randomUUID()
          }));
        }
        
        // Restore step if it was saved (optional, keeping user at step 1 is often safer for validation)
        // We will just restore data
        setFormData(prev => ({ ...prev, ...parsedDraft }));
      } catch (e) {
        console.error("Failed to parse draft from localStorage", e);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      // Handle single boolean checkboxes (Terms)
      if (name === 'termsAndConditions' || name === 'informationAccurate') {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else if (type === 'file') {
      // Store file objects if needed, but they won't serialize to localStorage
      setFormData(prev => ({ ...prev, [name]: files[0] || null }));
    } else {
      setFormData(prev => {
        const newData = { ...prev, [name]: value };
        // If department changes, clear designation
        if (name === 'department' && value !== prev.department) {
          newData.designation = '';
        }
        return newData;
      });
    }
  };

  const handleCheckboxChange = (e) => {
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

  // Emergency Contacts Logic
  const addEmergencyContact = () => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: [
        ...prev.emergencyContacts,
        { id: crypto.randomUUID(), name: '', phone: '', relationship: '' }
      ]
    }));
  };

  const removeEmergencyContact = (id) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter(c => c.id !== id)
    }));
  };

  const handleContactChange = (id, e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.map(c => 
        c.id === id ? { ...c, [name]: value } : c
      )
    }));
  };

  // Navigation & Validation
  const validateCurrentStep = () => {
    if (formRef.current) {
      const isValid = formRef.current.checkValidity();
      if (!isValid) {
        formRef.current.reportValidity();
        return false;
      }
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
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const saveDraft = () => {
    // Exclude file objects from localStorage stringification
    const draftData = { ...formData };
    delete draftData.resume;
    delete draftData.joiningDocuments;
    
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(draftData));
    alert('Draft saved successfully!');
  };

  const clearDraft = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    alert('Draft cleared!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      // Process submission
      setIsSuccess(true);
      localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear draft on success
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

  // Render Current Step Component
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
        
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '16px' }}>
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
