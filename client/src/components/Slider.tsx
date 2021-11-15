import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import React from "react";
import { Img } from "@chakra-ui/image";
import { Box, Flex } from "@chakra-ui/layout";

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);
import { Center, Square, Circle } from "@chakra-ui/react";

// Swiper.use([Navigation, Pagination]);

interface SliderProps {}

export const Slider: React.FC<SliderProps> = ({}) => {
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
          <video
            controls
            width="100%"
            id="preview"
            src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/Vokda_square.mp4"
            style={{ margin: "auto" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <video
            controls
            width="100%"
            id="preview"
            src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/Tenderloin_square.mp4"
            style={{ margin: "auto" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <video
            controls
            width="100%"
            id="preview"
            src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/Sausage_square.mp4"
            style={{ margin: "auto" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <video
            controls
            width="100%"
            id="preview"
            src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/Napolitana_square.mp4"
            style={{ margin: "auto" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <video
            controls
            width="100%"
            id="preview"
            src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/mentaiko_square.mp4"
            style={{ margin: "auto" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <video
            controls
            width="100%"
            id="preview"
            src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/corn+pesto_square.mp4"
            style={{ margin: "auto" }}
          />
        </SwiperSlide>
      </Swiper>
    </Flex>
  );
};
