import { Img } from "@chakra-ui/image";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

// Swiper.use([Navigation, Pagination]);

interface CustomerVoiceSliderProps {}

export const CustomerVoiceSlider: React.FC<CustomerVoiceSliderProps> = ({}) => {
  return (
    <Flex mx="auto" maxW={[null, null, "60%"]} zIndex={-1}>
      <Swiper
        style={{ zIndex: 0 }}
        navigation={true}
        effect={"coverflow"}
        centeredSlides={true}
        slidesPerView={
          typeof window !== "undefined" && window.innerWidth < 600 ? 1.6 : 3
        }
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
      >
        {" "}
        <SwiperSlide>
          <Img
            src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/pesto1.png"
            width="100%"
            style={{ margin: "auto" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Img
            src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/pesto2.png"
            width="100%"
            style={{ margin: "auto" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Img
            src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/pesto3.jpg"
            width="100%"
            style={{ margin: "auto" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Img
            src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/pesto4.png"
            width="100%"
            style={{ margin: "auto" }}
          />
        </SwiperSlide>
      </Swiper>
    </Flex>
  );
};
