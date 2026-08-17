import React from 'react';

function SystemAccess({ formData, handleChange, handleCheckboxChange }) {
  
  const isChecked = (val) => formData.systemAccess.includes(val);

  return (
    <fieldset>
      <legend>System Access</legend>

      <div className="field-row">
        <div className="field-group">
          <label htmlFor="preferredUsername">Preferred Username <span className="required-mark" aria-hidden="true">*</span></label>
          <input
            type="text"
            id="preferredUsername"
            name="preferredUsername"
            required
            pattern="[a-zA-Z0-9._\-]{3,30}"
            minLength="3"
            maxLength="30"
            autoComplete="username"
            placeholder="e.g. balaji.sivakumar"
            aria-describedby="preferredUsername-help"
            value={formData.preferredUsername}
            onChange={handleChange}
          />
          <p id="preferredUsername-help" className="help-text">3–30 characters. Letters, numbers, dots, underscores, and hyphens only. IT will confirm availability.</p>
        </div>
      </div>

      <div className="field-group inner-group">
        <fieldset className="inner-fieldset">
          <legend className="inner-legend">
            Required System Access <span className="required-mark" aria-hidden="true">*</span>
          </legend>
          <p className="help-text help-text-spaced" id="systemAccess-help">Select all systems you require access to. At least one selection is required.</p>
          {/* We use a hidden input to make the group natively required, or handle it via JS validation */}
          <div className="checkbox-group" aria-describedby="systemAccess-help">
            <label>
              <input type="checkbox" name="systemAccess" value="email" checked={isChecked('email')} onChange={handleCheckboxChange} />
              Email (Google Workspace / Outlook)
            </label>
            <label>
              <input type="checkbox" name="systemAccess" value="hr-portal" checked={isChecked('hr-portal')} onChange={handleCheckboxChange} />
              HR Portal
            </label>
            <label>
              <input type="checkbox" name="systemAccess" value="project-management" checked={isChecked('project-management')} onChange={handleCheckboxChange} />
              Project Management Tool (Jira / Asana)
            </label>
            <label>
              <input type="checkbox" name="systemAccess" value="source-control" checked={isChecked('source-control')} onChange={handleCheckboxChange} />
              Source Control (GitHub / GitLab / Bitbucket)
            </label>
            <label>
              <input type="checkbox" name="systemAccess" value="internal-tools" checked={isChecked('internal-tools')} onChange={handleCheckboxChange} />
              Internal Tools &amp; Dashboards
            </label>
            <label>
              <input type="checkbox" name="systemAccess" value="cloud-console" checked={isChecked('cloud-console')} onChange={handleCheckboxChange} />
              Cloud Console (AWS / GCP / Azure)
            </label>
            <label>
              <input type="checkbox" name="systemAccess" value="vpn" checked={isChecked('vpn')} onChange={handleCheckboxChange} />
              VPN Access
            </label>
          </div>
          {formData.systemAccess.length === 0 && (
            <input type="checkbox" style={{opacity: 0, position: 'absolute', pointerEvents: 'none'}} required />
          )}
        </fieldset>
      </div>

      <div className="field-row single row-spaced">
        <div className="field-group">
          <label htmlFor="additionalAccessRequirements">Additional Access Requirements</label>
          <textarea
            id="additionalAccessRequirements"
            name="additionalAccessRequirements"
            rows="3"
            maxLength="500"
            placeholder="Describe any additional tools, software, or system access required for your role."
            aria-describedby="additionalAccessRequirements-help"
            value={formData.additionalAccessRequirements}
            onChange={handleChange}
          ></textarea>
          <p id="additionalAccessRequirements-help" className="help-text">Optional. Specify any other access needed that is not listed above. This will be reviewed by IT.</p>
        </div>
      </div>

    </fieldset>
  );
}

export default SystemAccess;
