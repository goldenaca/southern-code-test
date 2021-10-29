import "./App.css";
import Nav from "./components/Nav";
import Filters from "./components/Filters";
import React from "react";
import QueryContext from "./context/MarsPhotosContext";
import Gallery from "./components/Gallery";

function App() {
  const [query, setQuery] = React.useState(null);

  return (
    <QueryContext.Provider value={[query, setQuery]}>
      <div className="App">
        <Nav />
        <Filters />
        <Gallery />
      </div>
    </QueryContext.Provider>
  );
}

export default App;
