import { Flex } from "@chakra-ui/layout";
import React from "react";
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import videosSources from "../../constants/videoSources";

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
      >
        {videosSources.map((videoSrc) => (
          <SwiperSlide key={videoSrc.poster}>
            <video
              controls
              width="100%"
              id="preview"
              src={videoSrc.src}
              style={{ margin: "auto" }}
              poster={videoSrc.poster}
              playsInline
              muted
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
};
