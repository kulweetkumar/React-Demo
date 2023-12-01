import React from 'react';

export default ({ label, name, className, children, error=true, errors = '', ...props }) => { 
  return (
    <>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}:
        </label>
      )}
      <select
        id={name}
        name={name}
        {...props}
        className={`form-control ${errors ? 'is-invalid' : ''}`}
      >
        {children}
      </select>
      {errors && <div className="invalid-feedback">{errors}</div>}
    </>
  );
};
