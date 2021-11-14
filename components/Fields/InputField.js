import React from "react";


export function InputField({label, value,placeholder,name, type,onChange}) {
    return (
        <div className="w-full lg:w-6/12 px-4">
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            {label}
          </label>
          <input
            type={type}
            name={name}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            onChange={(e) => onChange(e.target.value)}
            value={!value ? '' : value}
            placeholder={placeholder}
          />
        </div>
      </div>
    )
}