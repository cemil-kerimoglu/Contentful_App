import logo from "./logo.svg";
import "./App.css";
import { createClient } from "contentful";
import { useState, useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import { ClockLoader, BarLoader } from "react-spinners";
import Single from "./components/Single.js";
import AllPosts from "./components/AllPosts.js";
import ByAuthor from "./components/ByAuthor.js";

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

  function fetchSingleEntry(client, id) {
    console.log("fetching one....");
    setData((prev) => setData({ ...prev, isLoading: true }));
    client
      .getEntry(id)
      .then(function (entry) {
        console.log("fetching single:", entry.fields);
        setData((prev) =>
          setData({
            ...prev,
            singleEntry: entry.fields,
            isLoading: false,
            author: "cemil",
          })
        );
        console.log("local storing single:", entry.fields);
        console.log("our state is now:", data);
        localStorage.setItem("blogData", JSON.stringify(data));
      })
      .catch((e) => console.log("fetching error:", e.message));
  }
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
          <NavLink to="/">Home</NavLink>
        </span>
        |
        <span>
          <NavLink to="/all">All blogposts</NavLink>
        </span>
        |
        <span>
          <NavLink to="/byAuthor">All posts by an author</NavLink>
        </span>
        |
        <span>
          <NavLink to="/byCategory">All posts in a category</NavLink>
        </span>
      </nav>
      <Routes>
        {/*}
        <Route path="/" element={<App />} />
      */}
        <Route path="/all" element={<AllPosts articles={data?.allEntries} />} />
        <Route
          path="/all/:id"
          element={<Single articles={data?.allEntries} />}
        />
        <Route
          path="/byAuthor"
          element={<ByAuthor articles={data?.allEntries} />}
        />
        <Route
          path="/byAuthor/:aut"
          element={<ByAuthor articles={data?.allEntries} />}
        />
        <Route path="/byCategory" element={<AllPosts />} />
      </Routes>
      <p> Hello there, contentful </p>{" "}
      <p> api key: {REACT_APP_CONTENTFUL_API_KEY} </p>{" "}
      <p> space id: {REACT_APP_CONTENTFUL_SPACE_ID} </p>{" "}
      <p>
        {" "}
        "{data?.singleEntry?.title}", written by{" "}
        <strong>{data?.singleEntry?.author}</strong> published on{" "}
        {data?.singleEntry?.publishDate}
      </p>
      {`https:${data?.singleEntry?.mainPicture?.fields.file.url}`}
      <img
        src={`https:${data?.singleEntry?.mainPicture?.fields.file.url}`}
        alt="no pic 4 u"
      />
      <p>{data?.singleEntry?.mainPicture?.fields.description}</p>
      <p> Text:"{data?.singleEntry?.content?.content[0].content[0].value}" </p>
      <hr />
    </div>
  );
}

export default App;
