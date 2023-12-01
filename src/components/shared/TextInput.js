import React from 'react';

export default ({ label, icon, name, type, className, autoComplete, error=true, errors = '', ...props }) => {
  return (
    <>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}:
        </label>
      )}
      <input
		    type={type}
        name={name}
        {...props}
        className={`form-control ${errors ? 'is-invalid-error' : ''}`}
        autoComplete="{autoComplete}"
      />
	  {(error && errors) && <div className="invalid-error">{errors}</div>}
    </>
  );
};
