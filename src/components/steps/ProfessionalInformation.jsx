import React from 'react';
import { primarySkills } from '../../data/onboardingData';

function ProfessionalInformation({ formData, handleChange }) {
  return (
    <fieldset>
      <legend>Professional Information</legend>

      <div className="field-row">
        <div className="field-group">
          <label htmlFor="primarySkill">Primary Skill <span className="required-mark" aria-hidden="true">*</span></label>
          <input
            type="text"
            id="primarySkill"
            name="primarySkill"
            list="skillOptions"
            required
            maxLength="80"
            autoComplete="off"
            placeholder="e.g. React, Java, Python"
            aria-describedby="primarySkill-help"
            value={formData.primarySkill}
            onChange={handleChange}
          />
          <datalist id="skillOptions">
            {primarySkills.map(skill => (
              <option key={skill} value={skill}></option>
            ))}
          </datalist>
          <p id="primarySkill-help" className="help-text">Your strongest technical skill. Select from suggestions or type it.</p>
        </div>

        <div className="field-group">
          <label htmlFor="secondarySkills">Secondary Skills</label>
          <input
            type="text"
            id="secondarySkills"
            name="secondarySkills"
            maxLength="200"
            autoComplete="off"
            placeholder="e.g. CSS, Git, SQL (comma-separated)"
            aria-describedby="secondarySkills-help"
            value={formData.secondarySkills}
            onChange={handleChange}
          />
          <p id="secondarySkills-help" className="help-text">Optional. List additional skills separated by commas.</p>
        </div>
      </div>

      <div className="field-row">
        <div className="field-group">
          <label htmlFor="yearsOfExperience">Years of Experience <span className="required-mark" aria-hidden="true">*</span></label>
          <input
            type="number"
            id="yearsOfExperience"
            name="yearsOfExperience"
            required
            min="0"
            max="50"
            step="1"
            inputMode="numeric"
            placeholder="e.g. 2"
            aria-describedby="yearsOfExperience-help"
            value={formData.yearsOfExperience}
            onChange={handleChange}
          />
          <p id="yearsOfExperience-help" className="help-text">Total years of professional work experience (0–50).</p>
        </div>

        <div className="field-group">
          <label htmlFor="previousCompany">Previous Company</label>
          <input
            type="text"
            id="previousCompany"
            name="previousCompany"
            maxLength="100"
            autoComplete="organization"
            placeholder="e.g. Infosys, TCS (leave blank if fresher)"
            aria-describedby="previousCompany-help"
            value={formData.previousCompany}
            onChange={handleChange}
          />
          <p id="previousCompany-help" className="help-text">Optional. Name of your most recent employer. Leave blank if this is your first job.</p>
        </div>
      </div>

      <div className="field-row">
        <div className="field-group">
          <label htmlFor="highestQualification">Highest Qualification <span className="required-mark" aria-hidden="true">*</span></label>
          <select 
            id="highestQualification" 
            name="highestQualification" 
            required 
            aria-describedby="highestQualification-help"
            value={formData.highestQualification}
            onChange={handleChange}
          >
            <option value="">Select Qualification</option>
            <option value="diploma">Diploma</option>
            <option value="bsc">B.Sc. / B.A. / B.Com.</option>
            <option value="be-btech">B.E. / B.Tech.</option>
            <option value="msc">M.Sc. / M.A. / M.Com.</option>
            <option value="me-mtech">M.E. / M.Tech.</option>
            <option value="mca">MCA</option>
            <option value="mba">MBA</option>
            <option value="phd">Ph.D.</option>
            <option value="other">Other</option>
          </select>
          <p id="highestQualification-help" className="help-text">Select your highest completed educational qualification.</p>
        </div>
      </div>
    </fieldset>
  );
}

export default ProfessionalInformation;
