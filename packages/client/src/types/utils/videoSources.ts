interface VideoSource {
  src: string;
  poster: string;
}
const videosSources: VideoSource[] = [
  {
    src: "https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/Vokda_square.mp4",
    poster: "https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/vodka.png",
  },

  {
    src: "https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/Tenderloin_square.mp4",
    poster:
      "https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/tenderloin.png",
  },

  {
    src: "https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/Sausage_square.mp4",
    poster:
      "https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/norcina.png",
  },

  {
    src: "https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/Napolitana_square.mp4",
    poster:
      "https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/napolitan.png",
  },

  {
    src: "https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/mentaiko_square.mp4",
    poster:
      "https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/mentaiko.png",
  },

  {
    src: "https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/corn+pesto_square.mp4",
    poster: "https://cookknow.s3.ap-southeast-1.amazonaws.com/assets/corn.png",
  },
];

export default videosSources;
