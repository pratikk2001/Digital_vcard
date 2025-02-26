import React, { useState, useEffect } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaQrcode } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import { useParams } from "react-router-dom"; // Updated to react-router-dom

const VCard = () => {
  const { userUrl } = useParams();
  const [cardData, setCardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.log("User URL:", userUrl);
        const response = await axios.get(`http://localhost:4500/api/template/getcardbyurl/${userUrl}`);
        setCardData(response.data.data);
        console.log("Card Data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userUrl]);

  // Modal handlers
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

  // Loading and error states
  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!cardData) {
    return <div className="text-center mt-10">No data found</div>;
  }

  return (
    <div className="bg-white flex flex-col items-center py-10 w-full">
      <div
        className="w-full max-w-[500px] p-4 md:p-6 rounded-lg shadow-lg text-center mx-4 relative"
        style={{
          background: "linear-gradient(to right, #FFA500, #D3D3D3, #32CD32)",
        }}
      >
        {/* Banner Image */}
        <div
          className="w-full h-40 md:h-52 rounded-t-lg relative"
          style={{
            backgroundImage: cardData?.bannerImage
              ? `url(http://localhost:4500/api/template/getBanerImage/${cardData.bannerImage})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "10px 10px 0 0",
          }}
        ></div>

        {/* Profile Image */}
        <div className="absolute top-[160px] left-1/2 transform -translate-x-1/2">
          <img
            src={
              cardData?.profilePicture
                ? `http://localhost:4500/api/template/getprofileImage/${cardData.profilePicture}`
                : "/default-profile.jpg"
            }
            alt="Profile"
            className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-lg"
          />
        </div>

        <div className="mt-14 md:mt-16">
          <h2 className="text-lg md:text-xl font-bold">
            {cardData.firstName} {cardData.lastName}
          </h2>
          <p className="text-xs md:text-sm text-black">{cardData.positionTitle}</p>

          <div className="mt-2 md:mt-4 text-left text-xs md:text-sm">
            <p><strong>Birth Date:</strong> {new Date(cardData.dob).toDateString()}</p>
            <p><strong>Contact Number:</strong> {cardData.phone}</p>
            <p><strong>Email:</strong> {cardData.email}</p>
            <p><strong>Education:</strong> {cardData.education}</p>
            <p><strong>Address:</strong> {cardData.address}</p>
          </div>

          {/* Positions Held */}
          <div className="mt-4 text-left text-sm">
            <h3 className="font-bold">Positions Held:</h3>
            <ul className="list-disc list-inside">
              {cardData.positionsHeld ? (
                cardData.positionsHeld.map((position, index) => (
                  <li key={index}>{position}</li>
                ))
              ) : (
                <>
                  <li>Municipal Councillor - TMC Ward No. 4</li>
                  <li>Member - Education Committee, TMC</li>
                  <li>Special Executive Officer (SEO)</li>
                  <li>Chairperson - Navayug Mitra Mandal (Reg. Thane)</li>
                </>
              )}
            </ul>
          </div>

          {/* Family Section */}
          <div className="mt-4 text-left text-sm">
            <h3 className="font-bold">Family:</h3>
            <ul className="list-disc list-inside">
              {cardData.family ? (
                cardData.family.map((member, index) => (
                  <li key={index}>{member}</li>
                ))
              ) : (
                <>
                  <li>Husband - ABC</li>
                  <li>Son - ABC (MBBS, MS General Surgery, FMAS, Oncology Surgery Fellowship, Head and Neck Cancer Surgery, AIIMS Rishikesh Breast Cancer Surgery Course, Fellow TNMC Mumbai Assistant)</li>
                  <li>Daughter - ABC (MBBS, DMRE (Radiologist))</li>
                  <li>Daughter-in-law - ABC (MBBS, DMRE (Radiologist))</li>
                </>
              )}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="mt-6 flex justify-around">
            <div className="text-center">
              <a href={`tel:${cardData.phone}`} aria-label="Call Mobile Number">
                <FaPhone className="text-2xl mx-auto" />
                <p className="text-sm">Mobile</p>
                <p className="text-sm">{cardData.phone || "+91 987654321"}</p>
              </a>
            </div>
            <div className="text-center">
              <a href={`mailto:${cardData.email}`} aria-label="Send Email">
                <FaEnvelope className="text-2xl mx-auto" />
                <p className="text-sm">Email</p>
                <p className="text-sm">{cardData.email || "bjp@gmail.com"}</p>
              </a>
            </div>
            <div className="text-center">
              <a
                href="https://www.google.com/maps/search/Thane,+Mumbai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Address on Google Maps"
              >
                <FaMapMarkerAlt className="text-2xl mx-auto" />
                <p className="text-sm">Address</p>
                <p className="text-sm">{cardData.address || "Thane, Mumbai"}</p>
              </a>
            </div>
          </div>

          {/* QR Code */}
          <div className="mt-10 text-center">
            <a
              href={cardData.qrLink || "https://your-link-here.com"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Scan QR Code"
            >
              <img
                src={cardData.qrCodeImage || "QR_code.png"}
                alt="QR Code"
                className="w-32 h-32 mx-auto"
              />
            </a>
            <p className="text-lg">QR Code</p>
          </div>

          {/* Social Work Section */}
          <div className="mt-6 text-left text-sm">
            <h2 className="text-black text-xl font-bold mb-4 text-center">Social Work:</h2>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              autoplay={{ delay: 1000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="rounded-lg overflow-hidden"
            >
              {(cardData.socialWorkImages || []).map((src, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`http://localhost:4500/api/template/getSocialWorkImage/${src}`}
                    alt={`Social work event ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg cursor-pointer"
                    onClick={() => handleImageClick(`http://localhost:4500/api/template/getSocialWorkImage/${src}`)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Event Section */}
          <div className="mt-6 text-left text-sm">
            <h2 className="text-black text-xl font-bold mb-4 text-center">Moments:</h2>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              autoplay={{ delay: 1000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="rounded-lg overflow-hidden"
            >
              {(cardData.eventImages || []).map((src, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`http://localhost:4500/api/template/getEventImage/${src.imageUrl || src}`}
                    alt={`Moment ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg cursor-pointer"
                    onClick={() => handleImageClick(`http://localhost:4500/api/template/getEventImage/${src.imageUrl || src}`)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* News Section */}
          <div className="mt-6 text-left text-sm">
            <h2 className="text-black text-xl font-bold mb-4 text-center">Newspaper Coverage:</h2>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              autoplay={{ delay: 10000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="rounded-lg overflow-hidden"
            >
              {(cardData.newsImages || []).map((src, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`http://localhost:4500/api/template/getNewsImage/${src}`}
                    alt={`News coverage ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg cursor-pointer"
                    onClick={() => handleImageClick(`http://localhost:4500/api/template/getNewsImage/${src}`)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
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