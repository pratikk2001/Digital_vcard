// src/components/forms/Card.jsx
export function Card({ children }) {
  return (
    <div className="rounded-lg shadow-md p-4 bg-white border border-gray-200">
      {children}
    </div>
  );
}
