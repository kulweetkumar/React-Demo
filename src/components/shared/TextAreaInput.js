import React from 'react';

export default ({ label, name, type, className, error=true, errors = '', ...props }) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}:
        </label>
      )}
      <textarea
		    type={type}
        name={name}
        {...props}
        className={`form-control ${errors ? 'is-invalid' : ''}`}
      />
	  {(error && errors) && <div className="invalid-feedback">{errors}</div>}
    </div>
  );
};
