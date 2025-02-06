// src/components/forms/Textarea.jsx
export function Textarea({ placeholder, value, onChange, className }) {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        rows="4"
      ></textarea>
    );
  }
  