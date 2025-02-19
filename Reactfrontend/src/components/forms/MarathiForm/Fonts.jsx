import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./Font.module.css"; // Import CSS module

const Font = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-blue-600 font-poppins">
        <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-gray-500" />
        Custom Font Styling
      </h1>

      {/* User Profile Section */}
      <div className="mt-4 p-6 bg-white shadow-md rounded-lg text-center w-80">
        <FontAwesomeIcon icon={faUser} className="text-4xl text-blue-500 mb-3" />
        <h2 className={styles.userTitle}>John Doe</h2>
        <p className={styles.userDescription}>
          A passionate software developer working with React.
        </p>
      </div>

      {/* Font Size Examples */}
      <div className="mt-6 text-left">
        <p className="text-sm text-gray-600">This is a small text.</p>
        <p className="text-lg text-gray-700">This is a large text.</p>
        <p className="text-2xl font-semibold text-gray-900">This is an extra-large text.</p>
      </div>
    </div>
  );
};

export default Font;
