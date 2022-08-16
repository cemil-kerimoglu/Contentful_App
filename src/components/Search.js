import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
const contentful = require('contentful');

const Search = ({ articles }) => {

    const [author, setAuthor] = useState();
    const [category, setCategory] = useState();

    const submitHandler1 = (e) => {
        e.preventDefault();
        const text = document.getElementById("search-form1");
        console.log("input string:", text.value);
        setAuthor(text.value);
        text.value = "";
      };

      const submitHandler2 = (e) => {
        e.preventDefault();
        const text = document.getElementById("search-form2");
        console.log("input string:", text.value);
        setCategory(text.value);
        text.value = "";
      };

      console.log(articles);
      // console.log(articles[5].fields.author);
      console.log(author);

      let articlesToShow = articles.filter(article => article.fields.author?.toLowerCase().includes(author?.toLowerCase()));
      console.log(articlesToShow);

      return (
        <div className="App">
          <div className="author">
            <form onSubmit={submitHandler1}>
              <TextField
                id="search-form1"
                label="search author"
                variant="filled"
              />
              <Button
                onClick={submitHandler1}
                variant="outlined"
                size="large"
                startIcon={<SearchIcon />}
              >
                Search
              </Button>
            </form>
          </div>
          <div className="category">
            <form onSubmit={submitHandler2}>
              <TextField
                id="search-form2"
                label="search category"
                variant="filled"
              />
              <Button
                onClick={submitHandler2}
                variant="outlined"
                size="large"
                startIcon={<SearchIcon />}
              >
                Search
              </Button>
            </form>
          </div>

          <div>
            <ul>
              {articlesToShow.map(article => {
                return <li>{article.fields.title} {"by"} {article.fields.author} </li>
              })}
            </ul>
          </div>

        </div>
      );
}

export default Search;

