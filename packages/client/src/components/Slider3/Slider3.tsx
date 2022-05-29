import React, { useEffect, useRef, useState } from "react";
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from "swiper";
import videosSources from "../../../constants/videoSources";

import styles from "./Slider3.module.css";

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

interface Slider3Props {}

export const Slider3: React.FC<Slider3Props> = ({}) => {
  return (
    <div className={styles.parent}>
      <div className="inner-carousel">
        {videosSources.map((videoSrc) => (
          <div className="item" key={videoSrc.poster}>
            <video
              controls
              id="preview"
              src={videoSrc.src}
              style={{ margin: "auto" }}
              poster={videoSrc.poster}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
