import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const VCard = () => {
  const imageCategories = {
    "Social Work": ["sw-1.jpg", "sw-2.jpg", "new_ncp_image.jpg"],
    "Moments": ["cap-1.jpg", "cap-2.jpg", "cap-3.jpg"],
    "Newspaper Coverage": ["news-1.jpg", "news-2.jpg", "news-3.jpg"],
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center p-4 md:p-6">
      <div className="bg-gradient-to-b from-blue-500 to-purple-600 w-full max-w-xl p-4 md:p-8 rounded-lg md:rounded-2xl shadow-lg text-gray-800">
        {/* Profile Header */}
        <div className="text-center">
          <img
            src="NCP.jpg"
            alt="Header"
            className="w-full h-24 md:h-40 object-cover rounded-t-lg md:rounded-t-2xl"
          />
          <div className="relative -top-12 md:-top-14 mx-auto w-24 md:w-32 h-24 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img src="profile.jpg" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold mt-4">Mrs. ABC</h2>
          <p className="text-sm md:text-base text-black">Ex. Municipal Councillor, TMC (NCP)</p>
        </div>

        {/* Information Section */}
        <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-gray-700">
          {["Birthdate: 19 August 1970", "Contact: 9870447272", "Email: NCPoffice@gmail.com", "Education: Graduate in Arts (BA)"].map((item, index) => (
            <div key={index} className="bg-blue-100 p-2 md:p-3 rounded-lg shadow-md text-center">
              {item}
            </div>
          ))}
        </div>

        {/* Positions Held */}
        <div className="mt-4 md:mt-6 text-gray-800">
          <h3 className="text-lg md:text-2xl text-center font-bold mb-2 md:mb-3">Positions Held</h3>
          <ul className="space-y-1 md:space-y-2">
            {["Municipal Councillor - TMC Ward No. 4B", "Member - Education Committee, TMC", "Special Executive Officer (SEO)", "Chairperson - Navayug Mitra Mandal (Reg. Thane)"].map((position, index) => (
              <li key={index} className="p-2 bg-gray-100 rounded-lg">{position}</li>
            ))}
          </ul>
        </div>

        {/* Family Section */}
        <div className="mt-4 md:mt-6 text-gray-800">
          <h3 className="text-lg md:text-2xl text-center font-bold mb-2 md:mb-3">Family</h3>
          <ul className="space-y-1 md:space-y-2">
            {["Husband - Mr. ABC", "Son - Dr. ABC", "Daughter - ABC", "Daughter-in-law - ABC"].map((member, index) => (
              <li key={index} className="p-2 bg-gray-100 rounded-lg">{member}</li>
            ))}
          </ul>
        </div>

        {/* Image Galleries */}
        {Object.entries(imageCategories).map(([title, images]) => (
          <div key={title} className="mt-4 md:mt-8">
            <h2 className="text-lg md:text-2xl font-bold text-center mb-2 md:mb-4">{title}</h2>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={src}
                    alt={`${title} Image`}
                    className="w-full h-32 md:h-56 object-cover rounded-lg cursor-pointer transition-transform transform hover:scale-105"
                    onClick={() => handleImageClick(src)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>

      {/* Modal for Image Preview */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="bg-white p-2 md:p-4 rounded-lg max-w-full max-h-[80vh] overflow-hidden shadow-lg">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VCard;