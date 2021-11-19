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

interface SliderProps {}

export const Slider: React.FC<SliderProps> = ({}) => {
  return (
    <Flex mx="auto" maxW={[null, null, "60%"]} zIndex={-1} className="welcome">
      <Swiper
        style={{ zIndex: 0 }}
        navigation={true}
        effect={"coverflow"}
        centeredSlides={true}
        slidesPerView={
          typeof window !== "undefined" && window.innerWidth < 600 ? 1.3 : 3
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
            poster="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/vodka.png"
          />
        </SwiperSlide>
        <SwiperSlide>
          <video
            controls
            width="100%"
            id="preview"
            src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/Tenderloin_square.mp4"
            style={{ margin: "auto" }}
            poster="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/tenderloin.png"
          />
        </SwiperSlide>
        <SwiperSlide>
          <video
            controls
            width="100%"
            id="preview"
            src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/Sausage_square.mp4"
            style={{ margin: "auto" }}
            poster="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/norcina.png"
          />
        </SwiperSlide>
        <SwiperSlide>
          <video
            controls
            width="100%"
            id="preview"
            src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/Napolitana_square.mp4"
            style={{ margin: "auto" }}
            poster="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/napolitan.png"
          />
        </SwiperSlide>
        <SwiperSlide>
          <video
            controls
            width="100%"
            id="preview"
            style={{ margin: "auto" }}
            src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/mentaiko_square.mp4"
            poster="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/mentaiko.png"
          ></video>
        </SwiperSlide>
        <SwiperSlide>
          <video
            controls
            width="100%"
            id="preview"
            src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/corn+pesto_square.mp4"
            style={{ margin: "auto" }}
            poster="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/corn.png"
          />
        </SwiperSlide>
      </Swiper>
    </Flex>
  );
};
