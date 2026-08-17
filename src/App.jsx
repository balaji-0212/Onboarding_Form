import React from 'react';
import OnboardingForm from './components/OnboardingForm';

function App() {
  return (
    <>
      <header>
          <h1>Stackly &mdash; Employee Onboarding Form</h1>
          <p>Please fill in all required fields carefully. Fields marked with <strong>*</strong> are mandatory.</p>
      </header>
      <main>
        <OnboardingForm />
      </main>
      <footer>
          <p>&copy; 2026 Stackly. All rights reserved. &mdash; This form is for internal use only.</p>
      </footer>
    </>
  );
}

export default App;
