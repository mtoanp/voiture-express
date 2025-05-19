import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormInputProps {
  name: string;
  type?: string;
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  label?: string;
}

const FormInput: React.FC<FormInputProps> = ({ name, type = "text", id, value, onChange, error, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || name;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="mb-6 w-full">
      {/* <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
        {label || placeholder || name}
      </label> */}

      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder || name}
          className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
        />

        {type === "password" && (
          <div onClick={togglePasswordVisibility} className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
