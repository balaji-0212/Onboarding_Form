import React from 'react';

function DocumentsConfirmation({ formData, handleChange, handleCheckboxChange }) {
  
  // We can't really control the file input with value in React easily, 
  // so we'll leave value out for file inputs, or handle files via state if needed.
  // For this exercise, we keep them mostly uncontrolled or we just use onChange.

  return (
    <fieldset>
      <legend>Documents &amp; Confirmation</legend>

      <div className="field-row">
        <div className="field-group">
          <label htmlFor="resume">Resume / CV <span className="required-mark" aria-hidden="true">*</span></label>
          <input
            type="file"
            id="resume"
            name="resume"
            required
            accept=".pdf,.doc,.docx"
            aria-describedby="resume-help"
            onChange={handleChange}
          />
          <p id="resume-help" className="help-text">Upload your latest resume. Accepted formats: PDF, DOC, DOCX. Max size: 5 MB.</p>
          {formData.resume && <p className="help-text" style={{color: 'var(--color-primary)'}}>Selected file: {formData.resume.name}</p>}
        </div>

        <div className="field-group">
          <label htmlFor="joiningDocuments">Joining Documents</label>
          <input
            type="file"
            id="joiningDocuments"
            name="joiningDocuments"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            aria-describedby="joiningDocuments-help"
            onChange={handleChange}
          />
          <p id="joiningDocuments-help" className="help-text">Optional. Upload scanned copies of offer letter, ID proof, or other joining documents. PDF, JPG, PNG accepted.</p>
        </div>
      </div>

      <div className="field-group terms-container">
        <p className="terms-heading">Terms &amp; Conditions</p>
        <p className="terms-text">
          By submitting this form, you confirm that all information provided is accurate and complete to the best of your knowledge.
          You agree to comply with Stackly's internal policies, code of conduct, and data privacy guidelines as communicated during onboarding.
          Providing false information may result in disciplinary action.
        </p>

        <div className="confirm-row">
          <input
            type="checkbox"
            id="termsAndConditions"
            name="termsAndConditions"
            value="agreed"
            required
            aria-describedby="termsAndConditions-help"
            checked={formData.termsAndConditions}
            onChange={handleChange}
          />
          <label htmlFor="termsAndConditions">
            I have read and agree to the Terms &amp; Conditions. <span className="required-mark" aria-hidden="true">*</span>
          </label>
        </div>
        <p id="termsAndConditions-help" className="help-text help-text-tight">You must accept the terms and conditions before submitting the form.</p>

        <div className="confirm-row confirm-row-spaced">
          <input
            type="checkbox"
            id="informationAccurate"
            name="informationAccurate"
            value="confirmed"
            required
            aria-describedby="informationAccurate-help"
            checked={formData.informationAccurate}
            onChange={handleChange}
          />
          <label htmlFor="informationAccurate">
            I confirm that all information provided in this form is accurate and complete. <span className="required-mark" aria-hidden="true">*</span>
          </label>
        </div>
        <p id="informationAccurate-help" className="help-text help-text-tight">This declaration is required before your application can be processed.</p>
      </div>

    </fieldset>
  );
}

export default DocumentsConfirmation;
