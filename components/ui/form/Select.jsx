import React from "react";

export function Select({ label, type, name, value, onChange, placeholder, required, error, children, ...rest }) {
  return (
    <div className="mb-2 ">
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-primary-11 font-body">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="font-body bg-primary-3 border border-primary-6 text-primary-12 text-base rounded-lg focus:border-primary-7 focus-visible:outline-primary-7 block w-full p-2.5 "
        required={required}
        error={error}
        {...rest}>
        {children}
      </select>
    </div>
  );
}
