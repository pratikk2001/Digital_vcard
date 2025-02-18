import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const VCard = () => {
  const imageCategories = {
    "Social Work": ["sw-1.jpg", "sw-2.jpg", "sw-3.jpg"],
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
      <div className="bg-orange-400 text-black w-full max-w-[500px] p-4 md:p-6 rounded-lg shadow-lg text-center mx-4">
        <div className="relative">
          <img
            src="Shiv.jpg"
            alt="Header"
            className="w-full h-24 md:h-40 object-cover rounded-t-2xl"
          />
          <div className="absolute top-16 md:top-28 left-1/2 transform -translate-x-1/2">
            <img
              src="profile.jpg"
              alt="Profile"
              className="w-20 md:w-28 h-20 md:h-28 rounded-full border-4 border-white shadow-lg transform hover:scale-105"
            />
          </div>
        </div>
        <div className="text-center mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Mrs. ABC</h2>
          <p className="text-sm md:text-md text-gray-600">Ex. Municipal Councillor, TMC (Shivsena)</p>
        </div>

        <div className="mt-4 md:mt-6 space-y-2 md:space-y-4 text-gray-800">
          {["Birthdate: 19 August 1970", "Contact: +91 987654321", "Email: Shivsena@gmail.com", "Education: Graduate in Arts (BA)"].map(
            (item, index) => (
              <p key={index} className="bg-gray-100 p-2 md:p-3 rounded-lg shadow-md">{item}</p>
            )
          )}
        </div>

        <div className="mt-4 md:mt-6">
          <h3 className="font-bold text-lg md:text-xl text-gray-800">Positions Held</h3>
          <ul className="list-disc ml-4 md:ml-6 space-y-1 md:space-y-2 text-gray-800">
            {["Municipal Councillor - TMC Ward No. 4B", "Member - Education Committee, TMC", "Special Executive Officer (SEO)", "Chairperson - Navayug Mitra Mandal (Reg. Thane)"].map((position, index) => (
              <li key={index}>{position}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 md:mt-6">
          <h3 className="font-bold text-lg md:text-xl text-gray-800">Family</h3>
          <ul className="list-disc ml-4 md:ml-6 space-y-1 md:space-y-2 text-gray-800">
            {["Husband - Mr. ABC ", "Son - ABC", "Daughter - ABC", "Daughter-in-law - ABC"].map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>

        {Object.entries(imageCategories).map(([title, images]) => (
          <div key={title} className="mt-4 md:mt-6">
            <h2 className="text-black text-2xl md:text-3xl font-bold text-center mb-2 md:mb-4">{title}</h2>
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
                    className="w-full h-32 md:h-64 object-cover rounded-lg cursor-pointer transform hover:scale-105"
                    onClick={() => handleImageClick(src)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>

      {/* Modal implementation remains the same if needed */}
    </div>
  );
};

export default VCard;