const { REACT_APP_NASA_API_KEY } = process.env;
const NASA_API_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers";
let data = [];

export const getMarsPhotos = async ({
  rover,
  cameraFilter,
  timeData,
  page,
}) => {
  console.log("Api call");
  const searchUrl = new URL(`${NASA_API_URL}/${rover}/photos?`);
  searchUrl.searchParams.append("api_key", REACT_APP_NASA_API_KEY);
  searchUrl.searchParams.append("page", page);

  if (cameraFilter !== "ALL")
    searchUrl.searchParams.append("camera", cameraFilter.toLowerCase());

  if (timeData.type === "earth")
    searchUrl.searchParams.append("earth_date", timeData.earthTime);
  else searchUrl.searchParams.append("sol", timeData.solTime);
  const res = await fetch(searchUrl.href);
  data = await res.json();
  if (data.photos.length >= 1) return data.photos;
  else return [];
};
