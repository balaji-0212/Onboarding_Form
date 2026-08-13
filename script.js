document.addEventListener('DOMContentLoaded', initForm);

const DRAFT_KEY = 'stacklyEmployeeOnboardingDraft';

// mock data for dependent fields
const departmentDesignations = {
  'Engineering': ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'QA Engineer'],
  'Software Development': ['Software Engineer', 'Frontend Developer', 'Backend Developer'],
  'Frontend Development': ['Frontend Developer', 'UI Engineer'],
  'Backend Development': ['Backend Developer', 'Data Engineer'],
  'QA & Testing': ['QA Engineer', 'Test Engineer', 'SDET'],
  'Data Engineering': ['Data Engineer', 'Data Analyst', 'Data Scientist'],
  'DevOps': ['DevOps Engineer', 'Cloud Engineer'],
  'Human Resources': ['HR Executive', 'Recruiter', 'HR Manager'],
  'Finance': ['Financial Analyst', 'Accountant', 'Finance Manager'],
  'Marketing': ['Marketing Executive', 'SEO Specialist', 'Content Writer'],
  'Sales': ['Sales Executive', 'Account Executive', 'Sales Manager'],
  'Product Management': ['Product Manager', 'Associate Product Manager', 'Product Owner'],
  'Design': ['UX Designer', 'UI Designer', 'Graphic Designer'],
  'Legal & Compliance': ['Legal Counsel', 'Compliance Officer']
};

function initForm() {
  const form = document.getElementById('onboardingForm');
  const departmentInput = document.getElementById('department');
  const addContactBtn = document.getElementById('addContactBtn');
  const contactsContainer = document.getElementById('emergencyContactsContainer');
  const saveDraftBtn = document.getElementById('saveDraftBtn');
  const clearDraftBtn = document.getElementById('clearDraftBtn');

  // listeners
  if (departmentInput) {
    departmentInput.addEventListener('input', handleDepartmentChange);
  }

  if (addContactBtn) {
    addContactBtn.addEventListener('click', addEmergencyContact);
  }

  if (contactsContainer) {
    contactsContainer.addEventListener('click', handleRemoveContact);
  }

  if (saveDraftBtn) {
    saveDraftBtn.addEventListener('click', saveDraft);
  }

  if (clearDraftBtn) {
    clearDraftBtn.addEventListener('click', clearDraft);
  }

  if (form) {
    form.addEventListener('submit', handleFormSubmit);
    form.addEventListener('reset', handleFormReset);
  }

  loadDraft();
}

function handleDepartmentChange(event) {
  const department = event.target.value;
  updateDesignationsList(department);
}

function updateDesignationsList(department, retainValue = false) {
  const datalist = document.getElementById('designations');
  const designationInput = document.getElementById('designation');
  if (!datalist || !designationInput) return;

  const validDesignations = departmentDesignations[department] || [];
  
  // keep original options if no department matches to allow free text or defaults
  if (validDesignations.length > 0) {
    datalist.innerHTML = '';
    validDesignations.forEach(desig => {
      const option = document.createElement('option');
      option.value = desig;
      datalist.appendChild(option);
    });

    if (!retainValue && !validDesignations.includes(designationInput.value)) {
      designationInput.value = '';
    }
  }
}

function addEmergencyContact() {
  const container = document.getElementById('emergencyContactsContainer');
  const contactGroups = container.querySelectorAll('.emergency-contact-group');
  const newIndex = contactGroups.length;

  // clone the first group
  const baseGroup = contactGroups[0];
  const newGroup = baseGroup.cloneNode(true);
  newGroup.setAttribute('data-index', newIndex);

  // update ids, names, and labels
  const inputs = newGroup.querySelectorAll('input, select');
  inputs.forEach(input => {
    const oldId = input.id;
    if (oldId) {
      const baseName = oldId.split('_')[0];
      const newId = `${baseName}_${newIndex}`;
      input.id = newId;
      input.name = newId;
      input.value = ''; // clear value
      
      if (input.hasAttribute('aria-describedby')) {
        input.setAttribute('aria-describedby', `${baseName}-help_${newIndex}`);
      }
    }
  });

  const labels = newGroup.querySelectorAll('label');
  labels.forEach(label => {
    const oldFor = label.getAttribute('for');
    if (oldFor) {
      const baseName = oldFor.split('_')[0];
      label.setAttribute('for', `${baseName}_${newIndex}`);
    }
  });

  const helpTexts = newGroup.querySelectorAll('.help-text');
  helpTexts.forEach(help => {
    const oldId = help.id;
    if (oldId) {
      const baseName = oldId.split('_')[0];
      help.id = `${baseName}_${newIndex}`;
    }
  });

  // add remove button
  const removeBtnContainer = document.createElement('div');
  removeBtnContainer.className = 'field-row single';
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'remove-contact-btn';
  removeBtn.textContent = '- Remove Contact';
  removeBtn.style.cssText = 'width: auto; align-self: flex-start; background-color: transparent; border: 1px solid var(--color-error); color: var(--color-error); padding: 6px 12px; margin-top: -10px;';
  
  removeBtnContainer.appendChild(removeBtn);
  newGroup.appendChild(removeBtnContainer);

  container.appendChild(newGroup);
}

function handleRemoveContact(event) {
  if (event.target.classList.contains('remove-contact-btn')) {
    const group = event.target.closest('.emergency-contact-group');
    if (group) {
      group.remove();
    }
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;

  if (!form.checkValidity()) {
    // let browser show native validation if possible, or focus first invalid field
    const firstInvalid = form.querySelector(':invalid');
    if (firstInvalid) {
      firstInvalid.focus();
    }
    return;
  }

  // valid form
  form.style.display = 'none';
  const successMsg = document.getElementById('formSuccessMessage');
  if (successMsg) {
    successMsg.style.display = 'block';
  }
  
  localStorage.removeItem(DRAFT_KEY);
}

function handleFormReset() {
  const container = document.getElementById('emergencyContactsContainer');
  if (container) {
    const groups = container.querySelectorAll('.emergency-contact-group');
    // remove all but the first contact
    for (let i = 1; i < groups.length; i++) {
      groups[i].remove();
    }
  }
  
  const successMsg = document.getElementById('formSuccessMessage');
  if (successMsg) {
    successMsg.style.display = 'none';
  }
  
  const form = document.getElementById('onboardingForm');
  if (form) {
    form.style.display = 'block';
  }
}

function saveDraft() {
  const form = document.getElementById('onboardingForm');
  if (!form) return;

  const draftData = {};
  const formData = new FormData(form);

  for (const [key, value] of formData.entries()) {
    // do not save files
    const input = form.elements[key];
    if (input && input.type === 'file') continue;

    if (!draftData[key]) {
      draftData[key] = value;
    } else {
      if (!Array.isArray(draftData[key])) {
        draftData[key] = [draftData[key]];
      }
      draftData[key].push(value);
    }
  }

  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
    alert('Draft saved successfully!');
  } catch (error) {
    console.error('Failed to save draft', error);
    alert('Failed to save draft. Storage might be full or disabled.');
  }
}

function loadDraft() {
  try {
    const draftString = localStorage.getItem(DRAFT_KEY);
    if (!draftString) return;
    
    const draftData = JSON.parse(draftString);
    const form = document.getElementById('onboardingForm');
    
    if (!form || !draftData) return;

    // ensure enough emergency contact fields exist
    let maxContactIndex = 0;
    Object.keys(draftData).forEach(key => {
      if (key.startsWith('emergencyContactName_')) {
        const index = parseInt(key.split('_')[1], 10);
        if (index > maxContactIndex) maxContactIndex = index;
      }
    });

    for (let i = 1; i <= maxContactIndex; i++) {
      addEmergencyContact();
    }

    // populate dependent designation list before setting values
    if (draftData.department) {
      updateDesignationsList(draftData.department, true);
    }

    // restore values
    Object.keys(draftData).forEach(key => {
      const inputs = form.querySelectorAll(`[name="${key}"]`);
      if (!inputs.length) return;

      const value = draftData[key];
      
      if (inputs.length === 1) {
        const input = inputs[0];
        if (input.type === 'checkbox' || input.type === 'radio') {
          input.checked = (input.value === value);
        } else if (input.type !== 'file') {
          input.value = value;
        }
      } else {
        // multiple inputs with same name (e.g. radios or checkboxes)
        inputs.forEach(input => {
          if (input.type === 'radio') {
            input.checked = (input.value === value);
          } else if (input.type === 'checkbox') {
            if (Array.isArray(value)) {
              input.checked = value.includes(input.value);
            } else {
              input.checked = (input.value === value);
            }
          }
        });
      }
    });

  } catch (error) {
    console.error('Failed to parse or load saved draft', error);
    localStorage.removeItem(DRAFT_KEY);
  }
}

function clearDraft() {
  if (confirm('Are you sure you want to clear your saved draft and reset the form?')) {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (e) {
      console.error('Failed to clear local storage', e);
    }
    
    const form = document.getElementById('onboardingForm');
    if (form) {
      form.reset();
    }
  }
}
