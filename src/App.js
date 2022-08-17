import logo from "./logo.svg";
import "./App.css";
import { createClient } from "contentful";
import { useState, useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import { ClockLoader, BarLoader } from "react-spinners";
import Single from "./components/Single.js";
import AllPosts from "./components/AllPosts.js";
import ByAuthor from "./components/ByAuthor.js";
import Search from "./components/Search.js";

const { REACT_APP_CONTENTFUL_API_KEY, REACT_APP_CONTENTFUL_SPACE_ID } =
  process.env;

const client = createClient({
  space: `${REACT_APP_CONTENTFUL_SPACE_ID}`,
  environment: "master",
  accessToken: `${REACT_APP_CONTENTFUL_API_KEY}`,
});

function App() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("blogData"))
  ) || {
    isLoading: false,
    author: "none",
    category: "none",
  };
  console.log("this was in local storage:", data);

  function fetchAllEntries(client) {
    console.log("fetching all....");
    setData((prev) => setData({ ...prev, isLoading: true }));
    client
      .getEntries()
      .then(function (response) {
        console.log("fetching all:", response.items);
        setData((prev) =>
          setData({ ...prev, allEntries: response.items, isLoading: false })
        );
        console.log("data after fetching all:", data);
        localStorage.setItem("blogData", JSON.stringify(data));
      })
      .catch((e) => console.log("fetching error:", e.message));
  }

  useEffect(() => {
    // fetchSingleEntry(client, "4WkmpGAZvKgBh99KvI96cp");
    fetchAllEntries(client);
    console.log("at the end of useEffect->data  :", data);
  }, []);

  return (
    <div className="App">
      {/*}
      <ClockLoader loading={data?.isloading} />
      <BarLoader loading={data?.isloading} height={40} width={500} />
  */}
      <nav>
        <span>
          <NavLink to="/all">All blogposts</NavLink>
        </span>{" "}
        |{" "}
        <span>
          <NavLink to="/search">Search by author or category</NavLink>
        </span>
      </nav>
      <Routes>
        <Route path="/all" element={<AllPosts articles={data?.allEntries} />} />
        <Route
          path="/all/:id"
          element={<Single articles={data?.allEntries} />}
        />
        <Route
          path="/search"
          element={<Search articles={data?.allEntries} />}
        />
      </Routes>
      <hr />
    </div>
  );
}

export default App;
