import React from 'react';

function PersonalInformation({ formData, handleChange }) {
  return (
    <fieldset>
      <legend>Personal Information</legend>

      <div className="field-row">
        <div className="field-group">
          <label htmlFor="fullName">Full Name <span className="required-mark" aria-hidden="true">*</span></label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            minLength="3"
            maxLength="100"
            autoComplete="name"
            placeholder="e.g. Balaji Sivakumar"
            aria-describedby="fullName-help"
            value={formData.fullName}
            onChange={handleChange}
          />
          <p id="fullName-help" className="help-text">Enter your full legal name as it appears on official documents.</p>
        </div>

        <div className="field-group">
          <label htmlFor="employeeId">Employee ID <span className="required-mark" aria-hidden="true">*</span></label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            required
            pattern="[A-Za-z0-9\-]{4,20}"
            maxLength="20"
            autoComplete="off"
            placeholder="e.g. STK-1001"
            aria-describedby="employeeId-help"
            value={formData.employeeId}
            onChange={handleChange}
          />
          <p id="employeeId-help" className="help-text">Provided by HR. Alphanumeric, 4–20 characters (hyphens allowed).</p>
        </div>
      </div>

      <div className="field-row">
        <div className="field-group">
          <label htmlFor="dateOfBirth">Date of Birth <span className="required-mark" aria-hidden="true">*</span></label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            required
            max="2006-01-01"
            autoComplete="bday"
            aria-describedby="dateOfBirth-help"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <p id="dateOfBirth-help" className="help-text">You must be at least 18 years old.</p>
        </div>

        <div className="field-group">
          <label htmlFor="gender">Gender <span className="required-mark" aria-hidden="true">*</span></label>
          <select 
            id="gender" 
            name="gender" 
            required 
            autoComplete="sex" 
            aria-describedby="gender-help"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          <p id="gender-help" className="help-text">Select the option that best describes you.</p>
        </div>
      </div>

      <div className="field-row">
        <div className="field-group">
          <label htmlFor="personalEmail">Personal Email <span className="required-mark" aria-hidden="true">*</span></label>
          <input
            type="email"
            id="personalEmail"
            name="personalEmail"
            required
            maxLength="100"
            autoComplete="email"
            placeholder="e.g. balaji@example.com"
            aria-describedby="personalEmail-help"
            value={formData.personalEmail}
            onChange={handleChange}
          />
          <p id="personalEmail-help" className="help-text">Enter a valid personal email address. This should not be your company email.</p>
        </div>

        <div className="field-group">
          <label htmlFor="phone">Phone Number <span className="required-mark" aria-hidden="true">*</span></label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            pattern="[6-9][0-9]{9}"
            maxLength="10"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="e.g. 9876543210"
            aria-describedby="phone-help"
            value={formData.phone}
            onChange={handleChange}
          />
          <p id="phone-help" className="help-text">10-digit Indian mobile number starting with 6, 7, 8, or 9.</p>
        </div>
      </div>

      <div className="field-row single">
        <div className="field-group">
          <label htmlFor="address">Address <span className="required-mark" aria-hidden="true">*</span></label>
          <textarea
            id="address"
            name="address"
            required
            maxLength="300"
            rows="3"
            autoComplete="street-address"
            placeholder="House/Flat No., Street, Area"
            aria-describedby="address-help"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
          <p id="address-help" className="help-text">Enter your current residential address.</p>
        </div>
      </div>

      <div className="field-row">
        <div className="field-group">
          <label htmlFor="city">City <span className="required-mark" aria-hidden="true">*</span></label>
          <input
            type="text"
            id="city"
            name="city"
            required
            maxLength="60"
            autoComplete="address-level2"
            placeholder="e.g. Chennai"
            aria-describedby="city-help"
            value={formData.city}
            onChange={handleChange}
          />
          <p id="city-help" className="help-text">Enter your current city of residence.</p>
        </div>

        <div className="field-group">
          <label htmlFor="state">State <span className="required-mark" aria-hidden="true">*</span></label>
          <input
            type="text"
            id="state"
            name="state"
            required
            maxLength="60"
            autoComplete="address-level1"
            placeholder="e.g. Tamil Nadu"
            aria-describedby="state-help"
            value={formData.state}
            onChange={handleChange}
          />
          <p id="state-help" className="help-text">Enter your state of residence.</p>
        </div>
      </div>

      <div className="field-row">
        <div className="field-group">
          <label htmlFor="pincode">Pincode <span className="required-mark" aria-hidden="true">*</span></label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            required
            pattern="[1-9][0-9]{5}"
            maxLength="6"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="e.g. 600001"
            aria-describedby="pincode-help"
            value={formData.pincode}
            onChange={handleChange}
          />
          <p id="pincode-help" className="help-text">Enter a valid 6-digit Indian PIN code.</p>
        </div>
      </div>
    </fieldset>
  );
}

export default PersonalInformation;
