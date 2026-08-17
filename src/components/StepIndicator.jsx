import React from 'react';

function StepIndicator({ currentStep, totalSteps }) {
  const steps = [
    'Personal Info',
    'Employment Info',
    'Contact Info',
    'Professional Info',
    'System Access',
    'Documents',
    'Review'
  ];

  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'space-between', 
      marginBottom: '32px',
      paddingBottom: '16px',
      borderBottom: '1px solid var(--color-border)',
      overflowX: 'auto'
    }}>
      {steps.map((stepName, index) => {
        const stepNum = index + 1;
        const isActive = currentStep === stepNum;
        const isCompleted = currentStep > stepNum;
        
        let color = 'var(--color-text-light)';
        let fontWeight = 'normal';
        
        if (isActive) {
          color = 'var(--color-primary)';
          fontWeight = 'bold';
        } else if (isCompleted) {
          color = 'var(--color-success)';
        }

        return (
          <div key={stepNum} style={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            minWidth: '80px',
            color: color,
            fontWeight: fontWeight,
            fontSize: '0.875rem'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: isActive ? 'var(--color-primary)' : isCompleted ? 'var(--color-success)' : 'var(--color-surface)',
              border: `2px solid ${isActive ? 'var(--color-primary)' : isCompleted ? 'var(--color-success)' : 'var(--color-border)'}`,
              color: isActive || isCompleted ? '#fff' : 'var(--color-text-light)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '8px',
              fontSize: '0.75rem'
            }}>
              {isCompleted ? '✓' : stepNum}
            </div>
            <span style={{textAlign: 'center'}}>{stepName}</span>
          </div>
        );
      })}
    </div>
  );
}

export default StepIndicator;
