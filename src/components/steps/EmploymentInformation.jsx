import React from 'react';
import { departmentDesignations } from '../../data/onboardingData';

function EmploymentInformation({ formData, handleChange }) {
  
  // Calculate designations based on current department
  const currentDesignations = formData.department && departmentDesignations[formData.department] 
    ? departmentDesignations[formData.department] 
    : [];

  return (
    <fieldset>
      <legend>Employment Information</legend>

      <div className="field-row">
        <div className="field-group">
          <label htmlFor="department">Department <span className="required-mark" aria-hidden="true">*</span></label>
          <input
            type="text"
            id="department"
            name="department"
            list="departments"
            required
            maxLength="80"
            autoComplete="off"
            placeholder="Type or select a department"
            aria-describedby="department-help"
            value={formData.department}
            onChange={handleChange}
          />
          <datalist id="departments">
            {Object.keys(departmentDesignations).map(dept => (
              <option key={dept} value={dept}></option>
            ))}
          </datalist>
          <p id="department-help" className="help-text">Select from the list or type your department if not listed.</p>
        </div>

        <div className="field-group">
          <label htmlFor="designation">Designation <span className="required-mark" aria-hidden="true">*</span></label>
          <input
            type="text"
            id="designation"
            name="designation"
            list="designations"
            required
            maxLength="80"
            autoComplete="organization-title"
            placeholder="Type or select your designation"
            aria-describedby="designation-help"
            value={formData.designation}
            onChange={handleChange}
          />
          <datalist id="designations">
            {currentDesignations.map(desig => (
              <option key={desig} value={desig}></option>
            ))}
          </datalist>
          <p id="designation-help" className="help-text">Select your official designation from suggestions or type it.</p>
        </div>
      </div>

      <div className="field-row">
        <div className="field-group">
          <label htmlFor="joiningDate">Joining Date <span className="required-mark" aria-hidden="true">*</span></label>
          <input
            type="date"
            id="joiningDate"
            name="joiningDate"
            required
            aria-describedby="joiningDate-help"
            value={formData.joiningDate}
            onChange={handleChange}
          />
          <p id="joiningDate-help" className="help-text">Your official date of joining as confirmed by HR.</p>
        </div>

        <div className="field-group">
          <label htmlFor="workLocation">Work Location <span className="required-mark" aria-hidden="true">*</span></label>
          <select 
            id="workLocation" 
            name="workLocation" 
            required 
            aria-describedby="workLocation-help"
            value={formData.workLocation}
            onChange={handleChange}
          >
            <option value="">Select Work Location</option>
            <option value="chennai">Chennai</option>
            <option value="bangalore">Bangalore</option>
            <option value="hyderabad">Hyderabad</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi-ncr">Delhi NCR</option>
            <option value="pune">Pune</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
          <p id="workLocation-help" className="help-text">Select your primary work location or mode.</p>
        </div>
      </div>

      <div className="field-row single">
        <div className="field-group">
          <label htmlFor="reportingManager">Reporting Manager <span className="required-mark" aria-hidden="true">*</span></label>
          <input
            type="text"
            id="reportingManager"
            name="reportingManager"
            required
            maxLength="100"
            autoComplete="off"
            placeholder="Full name of your reporting manager"
            aria-describedby="reportingManager-help"
            value={formData.reportingManager}
            onChange={handleChange}
          />
          <p id="reportingManager-help" className="help-text">Enter the full name of your direct reporting manager as confirmed by HR.</p>
        </div>
      </div>

      <div className="field-group inner-group">
        <fieldset className="inner-fieldset">
          <legend className="inner-legend">
            Employment Type <span className="required-mark" aria-hidden="true">*</span>
          </legend>
          <div className="radio-group" aria-describedby="employmentType-help">
            <label>
              <input 
                type="radio" 
                name="employmentType" 
                value="full-time" 
                required 
                checked={formData.employmentType === "full-time"}
                onChange={handleChange}
              />
              Full Time
            </label>
            <label>
              <input 
                type="radio" 
                name="employmentType" 
                value="part-time"
                checked={formData.employmentType === "part-time"}
                onChange={handleChange}
              />
              Part Time
            </label>
            <label>
              <input 
                type="radio" 
                name="employmentType" 
                value="contract"
                checked={formData.employmentType === "contract"}
                onChange={handleChange}
              />
              Contract
            </label>
            <label>
              <input 
                type="radio" 
                name="employmentType" 
                value="intern"
                checked={formData.employmentType === "intern"}
                onChange={handleChange}
              />
              Intern
            </label>
          </div>
          <p id="employmentType-help" className="help-text help-text-tight">Select the employment type as stated in your offer letter.</p>
        </fieldset>
      </div>
    </fieldset>
  );
}

export default EmploymentInformation;
