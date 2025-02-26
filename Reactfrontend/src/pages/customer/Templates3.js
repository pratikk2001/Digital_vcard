import React, { useState, useEffect } from "react"; // Added useEffect
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import axios from "axios"; // Added axios import
import { useParams } from "react-router"; // Added useParams import

const VCard = () => {
  const { userUrl } = useParams(); // Get userUrl from route params
  const [cardData, setCardData] = useState(null); // State for fetched data
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch data from getcardbyurl API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:4500/api/template/getcardbyurl/${userUrl}`);
        setCardData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userUrl]);

  const imageCategories = {
    "Social Work": cardData?.socialWorkImages || ["sw-1.jpg", "sw-2.jpg", "sw-3.jpg"],
    "Moments": cardData?.eventImages || ["cap-1.jpg", "cap-2.jpg", "cap-3.jpg"],
    "Newspaper Coverage": cardData?.newsImages || ["news-1.jpg", "news-2.jpg", "news-3.jpg"],
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Show loading state while fetching data
  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // Show message if no data is returned
  if (!cardData) {
    return <div className="text-center mt-10">No data found</div>;
  }

  return (
    <div className="bg-white flex flex-col items-center py-10">
      <div className="bg-orange-400 text-black w-full max-w-[500px] p-4 md:p-6 rounded-lg shadow-lg text-center mx-4">
        <div className="relative">
          <img
            src={
              cardData?.bannerImage
                ? `http://localhost:4500/api/template/getBanerImage/${cardData.bannerImage}`
                : "Shiv.jpg"
            }
            alt="Header"
            className="w-full h-24 md:h-40 object-cover rounded-t-2xl"
          />
          <div className="absolute top-16 md:top-28 left-1/2 transform -translate-x-1/2">
            <img
              src={
                cardData?.profilePicture
                  ? `http://localhost:4500/api/template/getprofileImage/${cardData.profilePicture}`
                  : "profile.jpg"
              }
              alt="Profile"
              className="w-20 md:w-28 h-20 md:h-28 rounded-full border-4 border-white shadow-lg transform hover:scale-105"
            />
          </div>
        </div>
        <div className="text-center mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {cardData?.firstName && cardData?.lastName
              ? `${cardData.firstName} ${cardData.lastName}`
              : "Mrs. ABC"}
          </h2>
          <p className="text-sm md:text-md text-gray-600">
            {cardData?.positionTitle || "Ex. Municipal Councillor, TMC (Shivsena)"}
          </p>
        </div>

        <div className="mt-4 md:mt-6 space-y-2 md:space-y-4 text-gray-800">
          {[
            `Birthdate: ${cardData?.dob ? new Date(cardData.dob).toLocaleDateString() : "19 August 1970"}`,
            `Contact: ${cardData?.phone || "+91 987654321"}`,
            `Email: ${cardData?.email || "Shivsena@gmail.com"}`,
            `Education: ${cardData?.education || "Graduate in Arts (BA)"}`,
          ].map((item, index) => (
            <p key={index} className="bg-gray-100 p-2 md:p-3 rounded-lg shadow-md">
              {item}
            </p>
          ))}
        </div>

        <div className="mt-4 md:mt-6">
          <h3 className="font-bold text-lg md:text-xl text-gray-800">Positions Held</h3>
          <ul className="list-disc ml-4 md:ml-6 space-y-1 md:space-y-2 text-gray-800">
            {(cardData?.positionsHeld || [
              "Municipal Councillor - TMC Ward No. 4B",
              "Member - Education Committee, TMC",
              "Special Executive Officer (SEO)",
              "Chairperson - Navayug Mitra Mandal (Reg. Thane)",
            ]).map((position, index) => (
              <li key={index}>{position}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 md:mt-6">
          <h3 className="font-bold text-lg md:text-xl text-gray-800">Family</h3>
          <ul className="list-disc ml-4 md:ml-6 space-y-1 md:space-y-2 text-gray-800">
            {(cardData?.family || [
              "Husband - Mr. ABC ",
              "Son - ABC",
              "Daughter - ABC",
              "Daughter-in-law - ABC",
            ]).map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>

        {Object.entries(imageCategories).map(([title, images]) => (
          <div key={title} className="mt-4 md:mt-6">
            <h2 className="text-black text-2xl md:text-3xl font-bold text-center mb-2 md:mb-4">
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
                    src={
                      cardData?.socialWorkImages && title === "Social Work"
                        ? `http://localhost:4500/api/template/getSocialWorkImage/${src}`
                        : cardData?.eventImages && title === "Moments"
                        ? `http://localhost:4500/api/template/getEventImage/${src.imageUrl || src}`
                        : cardData?.newsImages && title === "Newspaper Coverage"
                        ? `http://localhost:4500/api/template/getNewsImage/${src}`
                        : src
                    }
                    alt={`${title} Image`}
                    className="w-full h-32 md:h-64 object-cover rounded-lg cursor-pointer transform hover:scale-105"
                    onClick={() =>
                      handleImageClick(
                        cardData?.socialWorkImages && title === "Social Work"
                          ? `http://localhost:4500/api/template/getSocialWorkImage/${src}`
                          : cardData?.eventImages && title === "Moments"
                          ? `http://localhost:4500/api/template/getEventImage/${src.imageUrl || src}`
                          : cardData?.newsImages && title === "Newspaper Coverage"
                          ? `http://localhost:4500/api/template/getNewsImage/${src}`
                          : src
                      )
                    }
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
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
              ×
            </button>
            <img src={selectedImage} alt="Preview of the selected image" className="w-96 h-auto" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VCard;