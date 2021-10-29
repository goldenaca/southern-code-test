import React, { useState, useEffect, useContext } from "react";
import { ROVER_CAMERAS, ROVERS } from "../../constants";
import Moment from "moment";
import "./filters.css";
import QueryContext from "../../context/MarsPhotosContext";

const Filters = () => {
  const [memory, setMemory] = useState(
    JSON.parse(localStorage.getItem("memory")) || []
  );
  const [, setQuery] = useContext(QueryContext);
  const [rover, setRover] = useState(ROVERS.CURIOSITY);
  const [availableCameras, setAvailableCameras] = useState(
    ROVER_CAMERAS[rover]
  );
  const [cameraFilter, setCameraFilter] = useState("ALL");
  const [timeData, setTimeData] = useState({
    type: "earth",
    earthTime: Moment().format("YYYY-MM-DD"),
    solTime: 1000,
  });

  const displayAvailableCameras = () => {
    return availableCameras.map((cameraName) => (
      <option key={cameraName} value={cameraName}>
        {cameraName}
      </option>
    ));
  };

  const displayDateInput = () => {
    if (timeData.type === "earth")
      return (
        <input
          className="earth-date mt-4"
          type="date"
          max={Moment().format("YYYY-MM-DD")}
          value={timeData.earthTime}
          onChange={(e) => {
            setTimeData({ ...timeData, earthTime: e.target.value });
          }}
        />
      );
    else
      return (
        <input
          className="sol-date mt-4"
          value={timeData.solTime}
          onChange={(e) =>
            setTimeData({ ...timeData, solTime: e.target.value })
          }
          type="number"
          min="0"
        />
      );
  };

  const closeMemoryBtn = (e) => {
    const newMemo = [...memory];
    newMemo.splice(e.target.parentElement.id, 1);
    setMemory([...newMemo]);
  };

  const setMemoryHandler = (e) => {
    const setMemo = memory[e.target.parentElement.id];
    setRover(setMemo.rover);
    setCameraFilter(setMemo.camera);
    setTimeData(setMemo.date);
  };

  const saveBtnHandler = () => {
    setMemory([
      ...memory,
      { rover: rover, camera: cameraFilter, date: timeData },
    ]);
  };

  const displaySavedData = () => {
    return memory.map((data, index) => (
      <li className="memory-item flex justify-between" key={index} id={index}>
        <p className="memory-info" onClick={setMemoryHandler}>
          {data.rover} / {data.camera} /{" "}
          {data.date.type === "earth" ? data.date.earthTime : data.date.solTime}
        </p>
        <p onClick={closeMemoryBtn} className="memory-btn">
          X
        </p>
      </li>
    ));
  };

  useEffect(() => {
    setAvailableCameras(ROVER_CAMERAS[rover]);
  }, [rover]);

  //Context to share
  useEffect(() => {
    setQuery({ rover, cameraFilter, timeData, page: 1 });
  }, [cameraFilter, rover, setQuery, timeData]);

  useEffect(() => {
    localStorage.setItem("memory", JSON.stringify(memory));
  }, [memory]);

  return (
    <div className="filter-container">
      <h2 className="flex justify-center m-8 filter-text"> FILTERS </h2>
      <div className="flex justify-evenly filters">
        <div className="individual-filter">
          <p className="flex justify-center"> ROVER </p>
          <select
            value={rover}
            onChange={(e) => {
              setRover(e.target.value);
              setCameraFilter("ALL");
            }}
            id="rover-filter"
            className="cursor-pointer border border-gray-300  text-gray-600 h-10 pl-4 pr-4 bg-white hover:border-gray-400 focus:outline-none "
          >
            <option value={ROVERS.CURIOSITY}>CURIOSITY</option>
            <option value={ROVERS.OPPORTUNITY}>OPORTUNITY</option>
            <option value={ROVERS.SPIRIT}>SPIRIT</option>
          </select>
        </div>

        <div className="individual-filter">
          <p className="flex justify-center"> CAMERAS</p>
          <select
            value={cameraFilter}
            onChange={(e) => setCameraFilter(e.target.value)}
            className="cursor-pointer border border-gray-300  text-gray-600 h-10 pl-4 pr-4 bg-white hover:border-gray-400 focus:outline-none "
          >
            <option value="ALL">ALL CAMERAS</option>
            {displayAvailableCameras()}
          </select>
        </div>

        <div className="flex flex-col individual-filter">
          <p className="flex justify-center"> TYPE OF DATE</p>
          <select
            value={timeData.type}
            onChange={(e) => setTimeData({ ...timeData, type: e.target.value })}
            className="cursor-pointer border border-gray-300  text-gray-600 h-10 pl-4 pr-4 bg-white hover:border-gray-400 focus:outline-none "
          >
            <option value="earth">EARTH DATE</option>
            <option value="sol">SOL DATE</option>
          </select>
          {displayDateInput()}
        </div>

        <div className="flex flex-col individual-filter">
          <p className="flex justify-center"> FILTER MEMORY</p>
          <div>
            <button onClick={saveBtnHandler} className="save-btn">
              SAVE FILTERS
            </button>
          </div>
        </div>
        <div
          className="flex flex-col"
          style={
            memory.length === 0 ? { display: "none" } : { display: "block" }
          }
        >
          <p className="flex justify-center"> SAVED DATA</p>
          <ul className="memory-container">{displaySavedData()}</ul>
        </div>
      </div>
    </div>
  );
};

export default Filters;
