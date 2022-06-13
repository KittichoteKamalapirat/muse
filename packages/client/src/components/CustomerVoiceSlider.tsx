import { Flex } from "@chakra-ui/layout";
import Image from "next/image";
import React from "react";
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

// Swiper.use([Navigation, Pagination]);

export const CustomerVoiceSlider = () => {
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
        <SwiperSlide>
          <Image
            src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/pesto1.webp"
            width={865}
            height={650}
            alt="customer voice 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/pesto2.webp"
            width={865}
            height={650}
            alt="customer voice 2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/pesto3.webp"
            width={865}
            height={650}
            alt="customer voice 3"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/pesto4.webp"
            width={865}
            height={650}
            alt="customer voice 4"
          />
        </SwiperSlide>
      </Swiper>
    </Flex>
  );
};
