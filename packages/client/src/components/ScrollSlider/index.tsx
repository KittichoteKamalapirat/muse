import React from "react";
import videosSources from "../../../constants/videoSources";
import styles from "./ScrollSlider.module.css";

export const ScrollSlider = () => {
  return (
    <div className={styles.parent}>
      <div className={styles.child}>
        {videosSources.map((videoSrc) => (
          <div key={videoSrc.poster}>
            <video
              className={styles.video}
              controls
              src={videoSrc.src}
              style={{ margin: "auto" }}
              poster={videoSrc.poster}
              playsInline
            />
          </div>
        ))}
      </div>
    </div>
  );
};
