import React from 'react';

export default ({ label, name, type, value, checked, className, error=true, errors = '', ...props }) => {
  return (
    <>
      {label && (
        <label className="radio-form-label" htmlFor={name}>
          {label}:
        </label>
      )}
      <input
		    type={type}
        name={name}
        value={value}
        checked={checked}
        {...props}
        className={`${errors ? 'is-invalid' : ''}`}
      />
	  {(error && errors) && <div className="invalid-feedback">{errors}</div>}
    </>
  );
};
