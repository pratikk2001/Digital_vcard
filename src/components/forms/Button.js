// src/components/forms/Button.jsx
export function Button({ children, onClick, className, type = "button" }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
      >
        {children}
      </button>
    );
  }
  