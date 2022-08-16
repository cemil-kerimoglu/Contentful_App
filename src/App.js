import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import Search from './components/Search.js';
const contentful = require('contentful');


function App() {

  const { REACT_APP_SPACE_ID, REACT_APP_ACCESS_TOKEN } = process.env;
  var client = contentful.createClient({
    space: `${REACT_APP_SPACE_ID}`,
    accessToken: `${REACT_APP_ACCESS_TOKEN}`,
  });

  /*
  client.getEntry('5HglAXgjMJTSk62cHJKZVE').then(function (entry) {
    console.log(entry.fields.title);
    console.log(entry.fields);
  });

  client.getEntries().then(function (entries) {
    console.log(entries);
    console.log(entries.items[1].fields.mainPicture.fields.file.url);
  });
  */

  const [allArticles, setAllArticles] = useState([]);

  useEffect( () => {
    const fetchingArticles = async () => {
      const entries = await client.getEntries();
      // console.log(entries);
      // console.log(entries.items);
      setAllArticles(entries.items);
    }
    fetchingArticles();
  }, [])

  return (
    <div className="App">
      <Search articles={allArticles} />
    </div>
  );
}

export default App;
