// src/components/forms/Label.jsx
export function Label({ htmlFor, children }) {
    return (
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
        {children}
      </label>
    );
  }
  