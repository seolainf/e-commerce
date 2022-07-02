import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { sliderData } from "../../assets/data/sliderData";
import "./slider.scss";

const Slider = () => {
  return (
    <div className="slider">
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="slider__swiper"
      >
        {sliderData &&
          sliderData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <img src={slide.img} alt="" />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;
