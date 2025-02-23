import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaQrcode } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

import { useParams } from "react-router-dom"

const VCard = () => {

const { userurl } = useParams();

// Different images for each section

const socialWorkImages = [
    "BJP.png",
    "NCP.jpg",
    "Shiv.jpg",
  ];

const momentsImages = [
    "BJP.png",
    "NCP.jpg",
    "Shiv.jpg",
  ];

const newsImages = [
    "BJP.png",
    "NCP.jpg",
    "Shiv.jpg",
  ];

  // State to handle image preview modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // Function to open modal with the selected image
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Close modal if background is clicked
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="bg-white flex flex-col items-center py-10">
  <div className="bg-[#0d1726] text-white w-[500px] p-6 rounded-lg shadow-lg text-center">
        {/* Header Image */}
        <img
          src="https://via.placeholder.com/400x100"
          alt="Header - Personal Information"
          className="w-full h-32 object-cover rounded-t-lg"
        />
        {/* Profile Image */}
        <img
          src="https://via.placeholder.com/100"
          alt="Profile of सौ. स्नेहा रमेश आंब्रे"
          className="w-24 h-24 rounded-full mx-auto -mt-12 border-4 border-white"
        />
        <h2 className="text-xl font-bold mt-4">{userurl}</h2>
        <p className="text-sm text-gray-300">
          मा. नगरसेविका ठा.म.पा. (भारतीय जनता पार्टी)
        </p>

        {/* Personal Information */}
        <div className="mt-4 text-left text-sm">
          <p>
            <strong>वाढदिवस:</strong> १९ ऑगस्ट
          </p>
          <p>
            <strong>संपर्क:</strong> ९८७०४४७२७२
          </p>
          <p>
            <strong>ई-मेल:</strong> bjpkaryalay04@gmail.com
          </p>
          <p>
            <strong>शिक्षण:</strong> कला शाखेत पदवीधर (BA)
          </p>
        </div>

        {/* Positions Held */}
        <div className="mt-4 text-left text-sm">
          <h3 className="font-bold">भूषवलेले पदे:</h3>
          <ul className="list-disc list-inside">
            <li>नगरसेविका - ठा.म.पा. प्रभाग क्र. ४ ब.</li>
            <li>सदस्या - शिक्षण समिती ठा.म.पा.</li>
            <li>विशेष कार्यकारी अधिकारी (SEO)</li>
            <li>कार्याध्यक्षा - नवयुग मित्र मंडळ (रजि.ठाणे)</li>
          </ul>
        </div>

        {/* Family Section */}
        <div className="mt-4 text-left text-sm">
          <h3 className="font-bold">कुटुंब:</h3>
          <ul className="list-disc list-inside">
            <li>पती - श्री. रमेश बाळू आंब्रे</li>
            <li>मुलगा - डॉ. सागर रमेश आंब्रे (MBBS, MS जनरल सर्जरी, FMAS, ऑनको सर्जरी फेलोशिप, हेड अँड नेक कॅन्सर सर्जरी, AIIMS ऋषिकेश ब्रेस्ट कॅन्सर सर्जरी कोर्स, फेलो TNMC मुंबई असिस्टंट)</li>
            <li>मुलगी - डॉ. स्नेहल रमेश आंब्रे (MBBS, DMRE (रेडिओलॉजिस्ट))</li>
            <li>सून - डॉ. श्रुति रमेश आंब्रे (MBBS, DMRE (रेडिओलॉजिस्ट))</li>
          </ul>
        </div>

        {/* Contact Details */}
<div className="mt-6 flex justify-around">
  {/* Mobile Section */}
  <div className="text-center">
    <a href="tel:+919870447272" aria-label="Call Mobile Number">
      <FaPhone className="text-2xl mx-auto" />
      <p className="text-sm">Mobile</p>
      <p className="text-sm">+91 9870447272</p>
    </a>
  </div>
  
  {/* Email Section */}
  <div className="text-center">
    <a href="mailto:bjpkaryalay04@gmail.com" aria-label="Send Email">
      <FaEnvelope className="text-2xl mx-auto" />
      <p className="text-sm">Email</p>
      <p className="text-sm">bjpkaryalay04@gmail.com</p>
    </a>
  </div>
  
  {/* Address Section */}
  <div className="text-center">
    <a 
      href="https://www.google.com/maps/search/Thane,+Mumbai" 
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label="View Address on Google Maps"
    >
      <FaMapMarkerAlt className="text-2xl mx-auto" />
      <p className="text-sm">Address</p>
      <p className="text-sm">Thane, Mumbai</p>
    </a>
  </div>
</div>


{/* QR Code */}
<div className="mt-10 text-center">
  <a 
    href="https://your-link-here.com"  // Replace with the desired URL to open
    target="_blank" 
    rel="noopener noreferrer" 
    aria-label="Scan QR Code"
  >
    <img
      src="QR_code.png"  // Replace with the actual QR code image URL
      alt="QR Code"
      className="w-32 h-32 mx-auto"
    />
  </a>
  <p className="text-large">QR Code</p>
</div>


        {/* Social Work Section */}
        <div className="mt-6 text-left text-sm">
          <h2 className="text-white text-xl font-bold mb-4 text-center">
            सामाजिक कार्य:
          </h2>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            autoplay={{
              delay: 1000, // Change image every 1 second
              disableOnInteraction: false, // Keep autoplay running even after user interacts
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
                  className="w-full h-64 object-cover rounded-lg cursor-pointer"
                  onClick={() => handleImageClick(src)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Moments Section */}
        <div className="mt-6 text-left text-sm">
          <h2 className="text-white text-xl font-bold mb-4 text-center">
            क्षणचित्रे:
          </h2>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            autoplay={{
              delay: 1000, // Change image every 1 second
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
                  className="w-full h-64 object-cover rounded-lg cursor-pointer"
                  onClick={() => handleImageClick(src)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* News Section */}
        <div className="mt-6 text-left text-sm">
          <h2 className="text-white text-xl font-bold mb-4 text-center">
            वर्तमान पत्रांनी घेतलेली दखल:
          </h2>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            autoplay={{
              delay: 1000, // Change image every 1 second
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
                  className="w-full h-64 object-cover rounded-lg cursor-pointer"
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
          <div className="bg-white p-4 rounded-lg relative">
            <button
              className="absolute top-0 right-0 text-xl text-gray-600"
              onClick={closeModal}
              role="button"
              aria-label="Close modal"
            >
              &times;
            </button>
            <img src={selectedImage} alt="Preview of the selected image" className="w-96 h-auto" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VCard;
