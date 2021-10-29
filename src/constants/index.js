export const ROVERS = {
  CURIOSITY: "curiosity",
  OPPORTUNITY: "opportunity",
  SPIRIT: "spirit",
};

export const ROVER_CAMERAS = {
  [ROVERS.CURIOSITY]: [
    "FHAZ",
    "RHAZ",
    "MAST",
    "CHEMCAM",
    "MAHLI",
    "MARDI",
    "NAVCAM",
  ],
  [ROVERS.OPPORTUNITY]: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
  [ROVERS.SPIRIT]: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
};
