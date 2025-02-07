import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const VCard = () => {
  const imageCategories = {
    "सामाजिक कार्य": ["sw-1.jpg", "sw-2.jpg", "sw-3.jpg"],
    "क्षणचित्रे:": ["cap-1.jpg", "cap-2.jpg", "cap-3.jpg"],
    "वर्तमान पत्रांनी घेतलेली दखल:": ["news-1.jpg", "news-2.jpg", "news-3.jpg"],
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
      <div className="bg-orange-400 text-black w-[500px] p-6 rounded-lg shadow-lg text-center">
        <div className="relative">
          <img
            src="Shiv.jpg"
            alt="Header"
            className="w-full h-40 object-cover rounded-t-2xl"
          />
          <div className="absolute top-28 left-1/2 transform -translate-x-1/2">
            <img
              src="profile.jpg"
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg transform hover:scale-105"
            />
          </div>
        </div>
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-800">श्री. लोकेश खानकरी</h2>
          <p className="text-md text-gray-600">मा. नगरसेवक ठा.म.पा.(Shivsena)</p>
        </div>

        <div className="mt-6 space-y-4 text-gray-800">
          {["वाढदिवस:: १९ ऑगस्ट 1970", "संपर्क: 7757022230", "ई-मेल: Shivsena@gmail.com", "शिक्षण: कला शाखेत पदवीधर (BA)"].map(
            (item, index) => (
              <p key={index} className="bg-gray-100 p-3 rounded-lg shadow-md">{item}</p>
            )
          )}
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-xl text-gray-800">भूषवलेले पदे:</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-800">
            {["नगरसेवक - ठा.म.पा. प्रभाग क्र. ४", "सदस्य - शिक्षण समिती ठा.म.पा.", "विशेष कार्यकारी अधिकारी (SEO)", "कार्यध्यक्ष - नवयुग मित्र मंडळ (रजि.ठाणे)"].map((position, index) => (
              <li key={index}>{position}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-xl text-gray-800">कुटुंब:</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-800">
            {["पत्नी - श्री. रमेश बाळू खानकरी", "मुलगा - डॉ. सागर रमेश खानकरी (MBBS, MS जनरल सर्जरी, FMAS, ऑनको सर्जरी फेलोशिप, हेड अँड नेक कॅन्सर सर्जरी, AIIMS ऋषिकेश ब्रेस्ट कॅन्सर सर्जरी कोर्स, फेलो TNMC मुंबई असिस्टंट)", "मुलगी - डॉ. स्नेहल रमेश खानकरी (MBBS, DMRE (रेडिओलॉजिस्ट))", "सून - डॉ. श्रुति रमेश खानकरी (MBBS, DMRE (रेडिओलॉजिस्ट))"].map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>

        {Object.entries(imageCategories).map(([title, images]) => (
          <div key={title} className="mt-6">
            <h2 className="text-black text-3xl font-bold text-center mb-4">{title}</h2>
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
    </div>
  );
};

export default VCard;
