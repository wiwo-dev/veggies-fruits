import React from "react";

export default function Textarea({ label, name, value, onChange, placeholder, required, error, ...rest }) {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-primary-11 font-body">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        className="font-body bg-primary-3 border border-primary-6 text-primary-12 text-base rounded-lg focus:border-primary-7 focus-visible:outline-primary-7 block w-full p-2.5 "
        placeholder={placeholder}
        required={required}
        error={error}
        //onChange={onChange}
      ></textarea>
    </div>
  );
}
