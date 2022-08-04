import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
const contentful = require('contentful');

function App() {

  /*
  const [article, setArticle] = useState()

  useEffect( () => {
    const { REACT_APP_SPACE_ID, REACT_APP_ACCESS_TOKEN } = process.env;
  }, [])
  */
  

  const { REACT_APP_SPACE_ID, REACT_APP_ACCESS_TOKEN } = process.env;




  var client = contentful.createClient({
    space: `${REACT_APP_SPACE_ID}`,
    accessToken: `${REACT_APP_ACCESS_TOKEN}`,
  });

  client.getEntry('5HglAXgjMJTSk62cHJKZVE').then(function (entry) {
    // logs the entry metadata
    console.log(entry.sys);
  
    // logs the field with ID title
    console.log(entry.fields.productName);
  });


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
