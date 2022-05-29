import React, { useEffect, useRef, useState } from "react";
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from "swiper";
import { motion } from "framer-motion";

import styles from "./Slider2.module.css";
import videosSources from "../../../constants/videoSources";

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

interface Slider2Props {}

export const Slider2: React.FC<Slider2Props> = ({}) => {
  const [width, setWidth] = useState(0);

  const carousel = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setWidth(carousel.current!.scrollWidth - carousel.current!.offsetWidth); // TODO remove bang and fix type
  }, [carousel]);
  return (
    <motion.div ref={carousel} className={styles.carousel}>
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        whileTap={{ cursor: "grabbing" }}
        className="inner-carousel"
      >
        {videosSources.map((videoSrc) => (
          <motion.div className="item" key={videoSrc.poster}>
            <video
              controls
              id="preview"
              src={videoSrc.src}
              style={{ margin: "auto" }}
              poster={videoSrc.poster}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
