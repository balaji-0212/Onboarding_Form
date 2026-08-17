import React from 'react';

function ReviewScreen({ formData }) {
  return (
    <fieldset>
      <legend>Review Application</legend>
      
      <div className="review-section">
        <h3 style={{color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px', marginBottom: '16px'}}>Personal Information</h3>
        <p><strong>Full Name:</strong> {formData.fullName}</p>
        <p><strong>Employee ID:</strong> {formData.employeeId}</p>
        <p><strong>Date of Birth:</strong> {formData.dateOfBirth}</p>
        <p><strong>Gender:</strong> {formData.gender}</p>
        <p><strong>Personal Email:</strong> {formData.personalEmail}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
        <p><strong>Address:</strong> {formData.address}</p>
        <p><strong>City:</strong> {formData.city}</p>
        <p><strong>State:</strong> {formData.state}</p>
        <p><strong>Pincode:</strong> {formData.pincode}</p>
      </div>

      <div className="review-section" style={{marginTop: '24px'}}>
        <h3 style={{color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px', marginBottom: '16px'}}>Employment Information</h3>
        <p><strong>Department:</strong> {formData.department}</p>
        <p><strong>Designation:</strong> {formData.designation}</p>
        <p><strong>Joining Date:</strong> {formData.joiningDate}</p>
        <p><strong>Work Location:</strong> {formData.workLocation}</p>
        <p><strong>Reporting Manager:</strong> {formData.reportingManager}</p>
        <p><strong>Employment Type:</strong> {formData.employmentType}</p>
      </div>

      <div className="review-section" style={{marginTop: '24px'}}>
        <h3 style={{color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px', marginBottom: '16px'}}>Contact Information</h3>
        <p><strong>Official Email:</strong> {formData.officialEmail}</p>
        <p><strong>Alternate Phone:</strong> {formData.alternatePhone || 'N/A'}</p>
        
        <h4 style={{marginTop: '12px', color: 'var(--color-text)'}}>Emergency Contacts</h4>
        {formData.emergencyContacts.map((contact, idx) => (
          <div key={contact.id} style={{padding: '8px', backgroundColor: 'var(--color-surface)', borderRadius: '4px', marginBottom: '8px'}}>
            <p><strong>Contact {idx + 1} Name:</strong> {contact.name}</p>
            <p><strong>Phone:</strong> {contact.phone}</p>
            <p><strong>Relationship:</strong> {contact.relationship}</p>
          </div>
        ))}
      </div>

      <div className="review-section" style={{marginTop: '24px'}}>
        <h3 style={{color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px', marginBottom: '16px'}}>Professional Information</h3>
        <p><strong>Primary Skill:</strong> {formData.primarySkill}</p>
        <p><strong>Secondary Skills:</strong> {formData.secondarySkills || 'N/A'}</p>
        <p><strong>Years of Experience:</strong> {formData.yearsOfExperience}</p>
        <p><strong>Previous Company:</strong> {formData.previousCompany || 'N/A'}</p>
        <p><strong>Highest Qualification:</strong> {formData.highestQualification}</p>
      </div>

      <div className="review-section" style={{marginTop: '24px'}}>
        <h3 style={{color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px', marginBottom: '16px'}}>System Access</h3>
        <p><strong>Preferred Username:</strong> {formData.preferredUsername}</p>
        <p><strong>Systems Requested:</strong> {formData.systemAccess.join(', ') || 'None'}</p>
        <p><strong>Additional Requirements:</strong> {formData.additionalAccessRequirements || 'N/A'}</p>
      </div>
      
      <div className="review-section" style={{marginTop: '24px'}}>
        <h3 style={{color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px', marginBottom: '16px'}}>Documents &amp; Confirmation</h3>
        <p><strong>Resume Uploaded:</strong> {formData.resume ? formData.resume.name : 'No'}</p>
        <p><strong>Terms Accepted:</strong> {formData.termsAndConditions ? 'Yes' : 'No'}</p>
        <p><strong>Information Confirmed:</strong> {formData.informationAccurate ? 'Yes' : 'No'}</p>
      </div>

    </fieldset>
  );
}

export default ReviewScreen;
