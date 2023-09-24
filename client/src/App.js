import "./App.css";

import React, { useState, useEffect } from "react";
import axios from "axios";

const base_url = process.env.REACT_APP_API_URL;

function App() {
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({
    sort: "warehouseAdditionTime",
    order: "desc",
  });
  const [filterGenre, setFilterGenre] = useState("All");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const url = `${base_url}/api/devices/?page=${page}&sort=${sort.sort},${
          sort.order
        }&linkedIndustry=${filterGenre.toString()}&search=${search}`;
        const { data } = await axios.get(url);
        setObj(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllMovies();
  }, [sort, filterGenre, page, search]);

  return (
    <div className="App">
      <h1>IoT App - MERN STACK</h1>
    </div>
  );
}

export default App;
