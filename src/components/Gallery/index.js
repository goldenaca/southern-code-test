import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import QueryContext from "../../context/MarsPhotosContext";
import { getMarsPhotos } from "../../api";
import "./gallery.css";

const Gallery = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useContext(QueryContext);
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    const apiCall = async () => {
      if (query.page === 1) {
        const waitApi = await getMarsPhotos(query);
        if (waitApi === []) return;
        setApiData(waitApi);
        setLoading(false);
      } else {
        const waitApi = await getMarsPhotos(query);
        if (waitApi === []) return;
        if (waitApi.length < 25) setLoading(true);
        else setLoading(false);
        setApiData((oldData) => [...oldData, ...waitApi]);
      }
    };
    apiCall();
  }, [query]);

  const displayGallery = () => {
    if (apiData.length === 0) return <h2>No available photos</h2>;
    return apiData.map((data) => (
      <a
        key={data.id}
        className="shadow-md h-full image-box"
        href={data.img_src}
        target={"_blank"}
        rel="noreferrer"
      >
        <img className="w-full" src={data.img_src} alt="Mars"></img>
      </a>
    ));
  };

  const loader = useRef(null);
  const loadMore = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        if (loading) return;
        const lastPage = query.page;
        setQuery({ ...query, page: lastPage + 1 });
      }
    },
    [loading, query, setQuery]
  );

  useEffect(() => {
    if (!apiData) return;
    let observerRefValue = null;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    };
    const observer = new IntersectionObserver(loadMore, options);

    if (loader && loader.current) {
      observer.observe(loader.current);
      observerRefValue = loader.current;
    }

    return () => observer.unobserve(observerRefValue);
  }, [loader, loadMore, apiData]);

  const displayLoader = () => {
    if (loading) return { display: "none" };
    if (apiData.length < 25) return { display: "none" };
    else return { display: "block" };
  };

  return (
    <div>
      <div className="grid sm:grid-cols-5 sm:m-8 gap-5 grid-cols-1">
        {displayGallery()}
      </div>
      <div className="loader w-full" ref={loader} style={displayLoader()}>
        LOADING...
      </div>
    </div>
  );
};

export default Gallery;
