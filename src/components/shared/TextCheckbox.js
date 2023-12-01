import React from 'react';

export default ({ label, name, type, value, checked, className, error=true, errors = '', ...props }) => {
  return (
    <div class="form-check checkboxbtn">
    {label && (
        <label className="form-check-label" htmlFor={name}>
            {label}:
        </label>
    )}
      <input
		    type={type}
        name={name}
        value={value}
        checked={checked}
        {...props}
        className={`form-check-input checkboxbtn ${errors ? 'is-invalid' : ''}`}
      />
	  {(error && errors) && <div className="invalid-feedback">{errors}</div>}
    </div>
  );
};
