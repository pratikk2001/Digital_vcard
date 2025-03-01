import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaQrcode } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const VCard = () => {
  const socialWorkImages = [
    "sw-1.jpg",
    "sw-2.jpg",
    "sw-3.jpg",
  ];

  const momentsImages = [
    "cap-1.jpg",
    "cap-2.jpg",
    "cap-3.jpg",
  ];

  const newsImages = [
    "news-1.jpg",
    "news-2.jpg",
    "news-3.jpg",
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="bg-white flex flex-col items-center py-10">
      <div
        className="bg-gradient-to-r from-orange-400 via-gray-200 to-green-300 text-black w-full max-w-[500px] p-4 md:p-6 rounded-lg shadow-lg text-center mx-4"
        style={{
          backgroundImage: `('BJP.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Header Image */}
        <img
          src="bg.jpg"
          alt="Background Image"
          className="w-full h-24 md:h-32 object-cover rounded-t-lg"
        />
        {/* Profile Image */}
        <img
          src="profile.jpg"
          alt="Profile Image"
          className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto -mt-10 md:-mt-12 border-4 border-white"
        />
        <h2 className="text-lg md:text-xl font-bold mt-2 md:mt-4">Mrs. ABC</h2>
        <p className="text-xs md:text-sm text-black">
          Ex. Municipal Councillor, TMC (Bharatiya Janata Party)
        </p>

        {/* Personal Information */}
        <div className="mt-2 md:mt-4 text-left text-xs md:text-sm">
          <p>
            <strong>Birth Date:</strong> 19 August 1970
          </p>
          <p>
            <strong>Contact Number:</strong> +91 987654321
          </p>
          <p>
            <strong>Email:</strong> bjp@gmail.com
          </p>
          <p>
            <strong>Education:</strong> Graduate in Arts (BA)
          </p>
        </div>

        {/* Positions Held */}
        <div className="mt-2 md:mt-4 text-left text-xs md:text-sm">
          <h3 className="font-bold">Positions Held:</h3>
          <ul className="list-disc list-inside">
            <li>Municipal Councillor - TMC Ward No. 4</li>
            <li>Member - Education Committee, TMC</li>
            <li>Special Executive Officer (SEO)</li>
            <li>Chairperson - Navayug Mitra Mandal (Reg. Thane)</li>
          </ul>
        </div>

        {/* Family Section */}
        <div className="mt-2 md:mt-4 text-left text-xs md:text-sm">
          <h3 className="font-bold">Family:</h3>
          <ul className="list-disc list-inside">
            <li>Husband - ABC </li>
            <li>Son - ABC (...)</li>
            <li>Daughter - ABC (...)</li>
            <li>Daughter-in-law - ABC (...)</li>
          </ul>
        </div>

        {/* Contact Details */}
        <div className="mt-4 md:mt-6 flex justify-around flex-wrap">
          {/* Mobile Section */}
          <div className="text-center w-full md:w-auto">
            <a href="tel:+919870447272" aria-label="Call Mobile Number">
              <FaPhone className="text-lg md:text-2xl mx-auto" />
              <p className="text-xs md:text-sm">Mobile</p>
              <p className="text-xs md:text-sm">+91 987654321</p>
            </a>
          </div>

          {/* Email Section */}
          <div className="text-center w-full md:w-auto">
            <a href="mailto:bjpkaryalay04@gmail.com" aria-label="Send Email">
              <FaEnvelope className="text-lg md:text-2xl mx-auto" />
              <p className="text-xs md:text-sm">Email</p>
              <p className="text-xs md:text-sm">bjp@gmail.com</p>
            </a>
          </div>

          {/* Address Section */}
          <div className="text-center w-full md:w-auto">
            <a
              href="https://www.google.com/maps/search/Thane,+Mumbai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Address on Google Maps"
            >
              <FaMapMarkerAlt className="text-lg md:text-2xl mx-auto" />
              <p className="text-xs md:text-sm">Address</p>
              <p className="text-xs md:text-sm">Thane, Mumbai</p>
            </a>
          </div>
        </div>

        {/* QR Code */}
        <div className="mt-4 md:mt-10 text-center">
          <a
            href="https://your-link-here.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Scan QR Code"
          >
            <img
              src="QR_code.png"
              alt="QR Code"
              className="w-24 h-24 md:w-32 md:h-32 mx-auto"
            />
          </a>
          <p className="text-sm">QR Code</p>
        </div>

        {/* Social Work Section */}
        <div className="mt-4 md:mt-6 text-left text-xs md:text-sm">
          <h2 className="text-black text-lg md:text-xl font-bold mb-2 md:mb-4 text-center">
            Social Work:
          </h2>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="rounded-lg overflow-hidden"
          >
            {socialWorkImages.map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  src={src}
                  alt={`Social work event by BJP party, showcasing community engagement`}
                  className="w-full h-48 md:h-64 object-cover rounded-lg cursor-pointer"
                  onClick={() => handleImageClick(src)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Moments Section */}
        <div className="mt-4 md:mt-6 text-left text-xs md:text-sm">
          <h2 className="text-black text-lg md:text-xl font-bold mb-2 md:mb-4 text-center">
            Moments:
          </h2>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="rounded-lg overflow-hidden"
          >
            {momentsImages.map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  src={src}
                  alt={`Moments of personal events and memories from various moments`}
                  className="w-full h-48 md:h-64 object-cover rounded-lg cursor-pointer"
                  onClick={() => handleImageClick(src)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* News Section */}
        <div className="mt-4 md:mt-6 text-left text-xs md:text-sm">
          <h2 className="text-black text-lg md:text-xl font-bold mb-2 md:mb-4 text-center">
            Newspaper Coverage:
          </h2>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="rounded-lg overflow-hidden"
          >
            {newsImages.map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  src={src}
                  alt={`News coverage highlighting achievements of the BJP party`}
                  className="w-full h-48 md:h-64 object-cover rounded-lg cursor-pointer"
                  onClick={() => handleImageClick(src)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Modal for Image Preview */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleBackgroundClick}
          role="dialog"
          aria-labelledby="imagePreviewModal"
        >
          <div className="bg-white p-2 md:p-4 rounded-lg relative w-full max-w-[90vw] md:max-w-[50vw]">
            <button
              className="absolute top-0 right-0 text-lg md:text-xl text-gray-600 p-2"
              onClick={closeModal}
              role="button"
              aria-label="Close modal"
            >
              ×
            </button>
            <img src={selectedImage} alt="Preview of the selected image" className="w-full h-auto" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VCard;