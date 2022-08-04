import logo from "./logo.svg";
import "./App.css";
import { createClient } from "contentful";
import { useState, useEffect } from "react";

const { REACT_APP_CONTENTFUL_API_KEY, REACT_APP_CONTENTFUL_SPACE_ID } =
  process.env;

const client = createClient({
  space: `${REACT_APP_CONTENTFUL_SPACE_ID}`,
  accessToken: `${REACT_APP_CONTENTFUL_API_KEY}`,
});

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    client.getEntry("4WkmpGAZvKgBh99KvI96cp").then(function (entry) {
      // logs the entry metadata
      console.log(entry.fields);
      setData(entry.fields);
      // logs the field with ID title
      console.log(entry.fields.title);
      console.log(entry.fields.mainPicture.fields.file.url);
      console.log(entry.fields.mainPicture.fields.description);
    });
  }, []);

  return (
    <div className="App">
      <p> Hello there, contentful </p>{" "}
      <p> api key: {REACT_APP_CONTENTFUL_API_KEY} </p>{" "}
      <p> space id: {REACT_APP_CONTENTFUL_SPACE_ID} </p>{" "}
      <p>
        {" "}
        "{data?.title}", written by <strong>{data?.author}</strong> published on{" "}
        {data?.publishDate}
      </p>
      {`https:${data?.mainPicture?.fields.file.url}`}
      <img
        src={`https:${data?.mainPicture?.fields.file.url}`}
        alt="no pic 4 u"
      />
      <p>{data?.mainPicture?.fields.description}</p>
      <p> Text:"{data?.content?.content[0].content[0].value}" </p>
    </div>
  );
}

export default App;
