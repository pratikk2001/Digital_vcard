import React, { useState, useEffect, useRef } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaQrcode } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import axios from "axios"; // Added axios import
import { useParams } from "react-router"; // Added useParams import

const VCard = () => {
  const vCardRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { userUrl } = useParams(); // Get userUrl from route params
  const [cardData, setCardData] = useState(null); // State for fetched data
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch dimensions of the card
  useEffect(() => {
    if (vCardRef.current) {
      setDimensions({
        width: vCardRef.current.offsetWidth,
        height: vCardRef.current.offsetHeight,
      });
    }
  }, [cardData]); // Depend on cardData to update dimensions after data loads

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

  const socialWorkImages = ["sw-1.jpg", "sw-2.jpg", "sw-3.jpg"];
  const momentsImages = ["cap-1.jpg", "cap-2.jpg", "cap-3.jpg"];
  const newsImages = ["news-1.jpg", "news-2.jpg", "news-3.jpg"];

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
      <div
        ref={vCardRef}
        className="bg-gradient-to-r from-orange-400 via-gray-200 to-green-300 text-black w-full max-w-[500px] p-4 md:p-6 rounded-lg shadow-lg text-center mx-4"
        style={{
          backgroundImage: `('BJP.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Header Image */}
        <img
          src={
            cardData.bannerImage
              ? `http://localhost:4500/api/template/getBanerImage/${cardData.bannerImage}`
              : "bg.jpg"
          }
          alt="Background Image"
          className="w-full h-24 md:h-32 object-cover rounded-t-lg"
        />
        {/* Profile Image */}
        <img
          src={
            cardData.profilePicture
              ? `http://localhost:4500/api/template/getprofileImage/${cardData.profilePicture}`
              : "profile.jpg"
          }
          alt="Profile Image"
          className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto -mt-10 md:-mt-12 border-4 border-white"
        />
        <h2 className="text-lg md:text-xl font-bold mt-2 md:mt-4">
          {cardData.firstName} {cardData.lastName}
        </h2>
        <p className="text-xs md:text-sm text-black">{cardData.positionTitle || "मा. नगरसेवक ठा.म.पा. (भारतीय जनता पार्टी)"}</p>

        {/* Personal Information */}
        <div className="mt-2 md:mt-4 text-left text-xs md:text-sm">
          <p>
            <strong>वाढदिवस:</strong>{" "}
            {cardData.dob ? new Date(cardData.dob).toLocaleDateString("mr-IN") : "१९ ऑगस्ट १९७०"}
          </p>
          <p>
            <strong>संपर्क:</strong> {cardData.phone || "+91 987654321"}
          </p>
          <p>
            <strong>ई-मेल:</strong> {cardData.email || "bjp@gmail.com"}
          </p>
          <p>
            <strong>शिक्षण:</strong> {cardData.education || "कला शाखेत पदवीधर (BA)"}
          </p>
        </div>

        {/* Positions Held */}
        <div className="mt-2 md:mt-4 text-left text-xs md:text-sm">
          <h3 className="font-bold">भूषवलेले पदे:</h3>
          <ul className="list-disc list-inside">
            {cardData.positionsHeld ? (
              cardData.positionsHeld.map((position, index) => <li key={index}>{position}</li>)
            ) : (
              <>
                <li>नगरसेवक - ठा.म.पा. प्रभाग क्र. ४</li>
                <li>सदस्य - शिक्षण समिती ठा.म.पा.</li>
                <li>विशेष कार्यकारी अधिकारी (SEO)</li>
                <li>कार्यध्यक्ष - नवयुग मित्र मंडळ (रजि.ठाणे)</li>
              </>
            )}
          </ul>
        </div>

        {/* Family Section */}
        <div className="mt-2 md:mt-4 text-left text-xs md:text-sm">
          <h3 className="font-bold">कुटुंब:</h3>
          <ul className="list-disc list-inside">
            {cardData.family ? (
              cardData.family.map((member, index) => <li key={index}>{member}</li>)
            ) : (
              <>
                <li>पत्नी - ABC </li>
                <li>
                  मुलगा - ABC (MBBS, MS जनरल सर्जरी, FMAS, ऑनको सर्जरी फेलोशिप, हेड अँड नेक कॅन्सर सर्जरी, AIIMS
                  ऋषिकेश ब्रेस्ट कॅन्सर सर्जरी कोर्स, फेलो TNMC मुंबई असिस्टंट)
                </li>
                <li>मुलगी - ABC (MBBS, DMRE (रेडिओलॉजिस्ट))</li>
                <li>सून - ABC (MBBS, DMRE (रेडिओलॉजिस्ट))</li>
              </>
            )}
          </ul>
        </div>

        {/* Contact Details */}
        <div className="mt-4 md:mt-6 flex justify-around flex-wrap">
          {/* Mobile Section */}
          <div className="text-center w-full md:w-auto">
            <a href={`tel:${cardData.phone || "+919870447272"}`} aria-label="Call Mobile Number">
              <FaPhone className="text-lg md:text-2xl mx-auto" />
              <p className="text-xs md:text-sm">Mobile</p>
              <p className="text-xs md:text-sm">{cardData.phone || "+91 987654321"}</p>
            </a>
          </div>

          {/* Email Section */}
          <div className="text-center w-full md:w-auto">
            <a href={`mailto:${cardData.email || "bjpkaryalay04@gmail.com"}`} aria-label="Send Email">
              <FaEnvelope className="text-lg md:text-2xl mx-auto" />
              <p className="text-xs md:text-sm">Email</p>
              <p className="text-xs md:text-sm">{cardData.email || "bjp@gmail.com"}</p>
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
              <p className="text-xs md:text-sm">{cardData.address || "Thane, Mumbai"}</p>
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
          <p className="text-large">QR Code</p>
        </div>

        {/* Social Work Section */}
        <div className="mt-6 text-left text-sm">
          <h2 className="text-black text-xl font-bold mb-4 text-center">सामाजिक कार्य:</h2>
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
            {(cardData.socialWorkImages || socialWorkImages).map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  src={
                    cardData.socialWorkImages
                      ? `http://localhost:4500/api/template/getSocialWorkImage/${src}`
                      : src
                  }
                  alt={`Social work event ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg cursor-pointer"
                  onClick={() =>
                    handleImageClick(
                      cardData.socialWorkImages
                        ? `http://localhost:4500/api/template/getSocialWorkImage/${src}`
                        : src
                    )
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Event Section */}
        <div className="mt-6 text-left text-sm">
          <h2 className="text-black text-xl font-bold mb-4 text-center">क्षणचित्रे:</h2>
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
            {(cardData.eventImages || momentsImages).map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  src={
                    cardData.eventImages
                      ? `http://localhost:4500/api/template/getEventImage/${src.imageUrl || src}`
                      : src
                  }
                  alt={`Moment ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg cursor-pointer"
                  onClick={() =>
                    handleImageClick(
                      cardData.eventImages
                        ? `http://localhost:4500/api/template/getEventImage/${src.imageUrl || src}`
                        : src
                    )
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* News Section */}
        <div className="mt-6 text-left text-sm">
          <h2 className="text-black text-xl font-bold mb-4 text-center">
            वर्तमान पत्रांनी घेतलेली दखल:
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
            {(cardData.newsImages || newsImages).map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  src={
                    cardData.newsImages
                      ? `http://localhost:4500/api/template/getNewsImage/${src}`
                      : src
                  }
                  alt={`News coverage ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg cursor-pointer"
                  onClick={() =>
                    handleImageClick(
                      cardData.newsImages
                        ? `http://localhost:4500/api/template/getNewsImage/${src}`
                        : src
                    )
                  }
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
              ×
            </button>
            <img src={selectedImage} alt="Preview of the selected image" className="w-96 h-auto" />
          </div>
        </div>
      )}
      <p className="mt-4 text-sm text-gray-600">
        Template Width: {dimensions.width}px | Height: {dimensions.height}px
      </p>
    </div>
  );
};

export default VCard;