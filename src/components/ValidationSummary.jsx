import React from 'react';

function ValidationSummary({ errors }) {
  if (!errors || errors.length === 0) return null;

  return (
    <div 
      className="validation-summary" 
      role="alert" 
      style={{ 
        border: '1px solid var(--color-error)', 
        backgroundColor: 'var(--color-error-bg)', 
        padding: 'var(--space-md)', 
        borderRadius: 'var(--radius-sm)', 
        marginBottom: 'var(--space-md)' 
      }}
    >
      <h3 style={{ 
        color: 'var(--color-error)', 
        margin: '0 0 var(--space-sm) 0', 
        fontSize: 'var(--font-size-md)' 
      }}>
        Please correct the following errors:
      </h3>
      <ul style={{ 
        color: 'var(--color-error)', 
        margin: '0 0 0 var(--space-lg)', 
        fontSize: 'var(--font-size-sm)',
        fontWeight: '600'
      }}>
        {errors.map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </ul>
    </div>
  );
}

export default ValidationSummary;
