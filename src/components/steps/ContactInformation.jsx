import React from 'react';

function ContactInformation({ 
  formData, 
  handleChange, 
  addEmergencyContact, 
  removeEmergencyContact, 
  handleContactChange 
}) {
  return (
    <fieldset>
      <legend>Contact Information</legend>

      <div className="field-row">
        <div className="field-group">
          <label htmlFor="officialEmail">Official Email <span className="required-mark" aria-hidden="true">*</span></label>
          <input
            type="email"
            id="officialEmail"
            name="officialEmail"
            required
            maxLength="100"
            autoComplete="work email"
            placeholder="e.g. balaji.sivakumar@stackly.com"
            aria-describedby="officialEmail-help"
            value={formData.officialEmail}
            onChange={handleChange}
          />
          <p id="officialEmail-help" className="help-text">Your Stackly-assigned work email address. Provided by IT after joining.</p>
        </div>

        <div className="field-group">
          <label htmlFor="alternatePhone">Alternate Phone Number</label>
          <input
            type="tel"
            id="alternatePhone"
            name="alternatePhone"
            pattern="[6-9][0-9]{9}"
            maxLength="10"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="e.g. 9876543210"
            aria-describedby="alternatePhone-help"
            value={formData.alternatePhone}
            onChange={handleChange}
          />
          <p id="alternatePhone-help" className="help-text">Optional. 10-digit Indian mobile number starting with 6, 7, 8, or 9.</p>
        </div>
      </div>

      <div id="emergencyContactsContainer">
        {formData.emergencyContacts.map((contact, index) => (
          <div key={contact.id} className="emergency-contact-group" data-index={index}>
            <div className="field-row">
              <div className="field-group">
                <label htmlFor={`emergencyContactName_${index}`}>Emergency Contact Name <span className="required-mark" aria-hidden="true">*</span></label>
                <input
                  type="text"
                  id={`emergencyContactName_${index}`}
                  name="name"
                  required
                  minLength="3"
                  maxLength="100"
                  autoComplete="off"
                  placeholder="Full name of your emergency contact"
                  aria-describedby={`emergencyContactName-help_${index}`}
                  value={contact.name}
                  onChange={(e) => handleContactChange(contact.id, e)}
                />
                <p id={`emergencyContactName-help_${index}`} className="help-text">Enter the full name of a person we can contact in an emergency.</p>
              </div>

              <div className="field-group">
                <label htmlFor={`emergencyContactNumber_${index}`}>Emergency Contact Number <span className="required-mark" aria-hidden="true">*</span></label>
                <input
                  type="tel"
                  id={`emergencyContactNumber_${index}`}
                  name="phone"
                  required
                  pattern="[6-9][0-9]{9}"
                  maxLength="10"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="e.g. 9876543210"
                  aria-describedby={`emergencyContactNumber-help_${index}`}
                  value={contact.phone}
                  onChange={(e) => handleContactChange(contact.id, e)}
                />
                <p id={`emergencyContactNumber-help_${index}`} className="help-text">10-digit Indian mobile number of your emergency contact.</p>
              </div>
            </div>

            <div className="field-row">
              <div className="field-group">
                <label htmlFor={`emergencyRelationship_${index}`}>Relationship with Emergency Contact <span className="required-mark" aria-hidden="true">*</span></label>
                <select 
                  id={`emergencyRelationship_${index}`} 
                  name="relationship" 
                  required 
                  aria-describedby={`emergencyRelationship-help_${index}`}
                  value={contact.relationship}
                  onChange={(e) => handleContactChange(contact.id, e)}
                >
                  <option value="">Select Relationship</option>
                  <option value="parent">Parent</option>
                  <option value="spouse">Spouse</option>
                  <option value="sibling">Sibling</option>
                  <option value="friend">Friend</option>
                  <option value="guardian">Guardian</option>
                  <option value="other">Other</option>
                </select>
                <p id={`emergencyRelationship-help_${index}`} className="help-text">Select your relationship with the emergency contact person.</p>
              </div>
            </div>

            {index > 0 && (
              <div className="field-row single row-spaced">
                <button 
                  type="button" 
                  className="remove-contact-btn" 
                  onClick={() => removeEmergencyContact(contact.id)}
                  style={{ width: 'auto', alignSelf: 'flex-start', backgroundColor: 'transparent', color: 'var(--color-error)', border: '1px solid var(--color-error)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem' }}
                >
                  Remove Contact
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="field-row single row-spaced">
        <button 
          type="button" 
          id="addContactBtn" 
          onClick={addEmergencyContact}
          style={{ width: 'auto', alignSelf: 'flex-start', backgroundColor: 'transparent', border: '1px solid var(--color-primary)', color: 'var(--color-primary)' }}
        >
          + Add Another Emergency Contact
        </button>
      </div>

    </fieldset>
  );
}

export default ContactInformation;
