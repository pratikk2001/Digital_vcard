import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const VCard = () => {
  const imageCategories = {
    "Social Work": ["sw-1.jpg", "sw-2.jpg", "new_ncp_image.jpg"], // Updated NCP image
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
    <div className="bg-white flex flex-col items-center py-10">
      <div className="bg-blue-500 text-white w-[500px] p-6 rounded-lg shadow-lg text-center">
        <div className="relative">
          {/* NCP-Themed Header Image */}
          <img
            src="new_ncp_image.jpg" // Updated NCP Header image
            alt="Header"
            className="w-full h-40 object-cover rounded-t-2xl"
          />
          <div className="absolute top-28 left-1/2 transform -translate-x-1/2">
            {/* Profile Picture */}
            <img
              src="profile.jpg"
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg transform hover:scale-105"
            />
          </div>
        </div>
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-white">Mrs. Sneha Khankari</h2>
          <p className="text-md text-gray-200">
            Ex. Municipal Councillor, TMC (NCP)
          </p>
        </div>

        <div className="mt-6 space-y-4 text-gray-100">
          {[
            "Birthdate: 19 August 1970",
            "Contact: 9870447272",
            "Email: NCPoffice@gmail.com",
            "Education: Graduate in Arts (BA)",
          ].map((item, index) => (
            <p key={index} className="bg-blue-700 p-3 rounded-lg shadow-md">
              {item}
            </p>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-xl text-gray-100">Positions Held</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-100">
            {[
              "Municipal Councillor - TMC Ward No. 4B",
              "Member - Education Committee, TMC",
              "Special Executive Officer (SEO)",
              "Chairperson - Navayug Mitra Mandal (Reg. Thane)",
            ].map((position, index) => (
              <li key={index}>{position}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-xl text-gray-100">Family</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-100">
            {[
              "Husband - Mr. Ramesh Balu Khankari",
              "Son - Dr. Sagar Ramesh Khankari",
              "Daughter - Dr. Snehal Ramesh Khankari",
              "Daughter-in-law - Dr. Shruti Ramesh Khankari",
            ].map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>

        {Object.entries(imageCategories).map(([title, images]) => (
          <div key={title} className="mt-6">
            <h2 className="text-white text-3xl font-bold text-center mb-4">
              {title}
            </h2>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="rounded-lg overflow-hidden shadow-xl"
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={src}
                    alt={`${title} Image`}
                    className="w-full h-64 object-cover rounded-lg cursor-pointer transform hover:scale-105"
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
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div className="bg-white p-4 rounded-lg max-w-full max-h-[80vh] overflow-hidden">
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
