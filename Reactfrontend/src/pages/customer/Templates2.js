import React, { useState, useEffect } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useParams } from "react-router-dom";
import axios from "axios";

const VCard = () => {
  const { userUrl } = useParams();
  const [cardData, setCardData] = useState(null);
  const baseURL = "http://localhost:4500/api/template/getcardbyurl/";

  useEffect(() => {
    const fetchData = async () => {
      try {

        console.log("User URL:", userUrl);

        const response = await axios.get("http://localhost:4500/api/template/getcardbyurl/"+ userUrl);
        setCardData(response.data.data);

        console.log("Card Data:", response.data);
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userUrl]);

  if (!cardData) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="bg-white flex flex-col items-center py-10">
      <div
        className="bg-gradient-to-r from-orange-400 via-gray-200 to-green-300 text-black w-full max-w-[500px] p-4 md:p-6 rounded-lg shadow-lg text-center mx-4"
        style={{ backgroundImage: ``, backgroundSize: "cover" }}
      >
        <img
          src={cardData.profilePicture}
          alt="Profile Image"
          className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto -mt-10 md:-mt-12 border-4 border-white"
        />
        <h2 className="text-lg md:text-xl font-bold mt-2 md:mt-4">{cardData.firstName} {cardData.lastName}</h2>
        <p className="text-xs md:text-sm text-black">{cardData.positionTitle}</p>

        <div className="mt-2 md:mt-4 text-left text-xs md:text-sm">
          <p><strong>Birth Date:</strong> {new Date(cardData.dob).toDateString()}</p>
          <p><strong>Contact Number:</strong> {cardData.phone}</p>
          <p><strong>Email:</strong> {cardData.email}</p>
          <p><strong>Education:</strong> {cardData.education}</p>
          <p><strong>Address:</strong> {cardData.address}</p>
        </div>

        {/* Family Details */}
        <div className="mt-2 md:mt-4 text-left text-xs md:text-sm">
          <h3 className="font-bold">Family:</h3>
          <ul className="list-disc list-inside">
            {cardData.familyDetails.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>

        {/* Swiper for Images */}
        {/* <Swiper pagination={true} navigation={true} modules={[Pagination, Navigation]} className="my-5">
          {cardData.eventImages.map((img) => (
            <SwiperSlide key={img._id}>
              <img src={""} alt={img.caption} className="w-full h-48 object-cover rounded-lg" />
              <p className="text-sm text-center mt-1">{img.caption}</p>
            </SwiperSlide>
          ))}
        </Swiper> */}

        {/* Contact Details */}
        <div className="mt-4 md:mt-6 flex justify-around flex-wrap">
          <div className="text-center w-full md:w-auto">
            <a href={`tel:${cardData.phone}`} aria-label="Call Mobile Number">
              <FaPhone className="text-lg md:text-2xl mx-auto" />
              <p className="text-xs md:text-sm">Mobile</p>
              <p className="text-xs md:text-sm">{cardData.phone}</p>
            </a>
          </div>

          <div className="text-center w-full md:w-auto">
            <a href={`mailto:${cardData.email}`} aria-label="Send Email">
              <FaEnvelope className="text-lg md:text-2xl mx-auto" />
              <p className="text-xs md:text-sm">Email</p>
              <p className="text-xs md:text-sm">{cardData.email}</p>
            </a>
          </div>

          <div className="text-center w-full md:w-auto">
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(cardData.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Address"
            >
              <FaMapMarkerAlt className="text-lg md:text-2xl mx-auto" />
              <p className="text-xs md:text-sm">Address</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VCard;
