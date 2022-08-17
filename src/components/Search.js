import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const contentful = require("contentful");

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

  console.log("all articles", articles);
  // console.log(articles[5].fields.author);
  console.log("selected author", author);
  
  let articlesToShowByAuthor = articles.filter((article) =>
      article.fields.author?.toLowerCase().includes(author?.toLowerCase())
    );
  console.log("articles by author", articlesToShowByAuthor);
  
  let articlesToShowByCategory = articles.filter((article) =>
      article.fields.categories?.includes(category)
    );
  console.log("articles by category", articlesToShowByCategory);
  

  return (
    <div className="App">
      <div className="author">
        <form onSubmit={submitHandler1}>
          <TextField id="search-form1" label="search author" variant="filled" />
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
          {articlesToShowByAuthor.map((article, i) => {
            return (
              <li key={i}>
                <NavLink to={`/all/${article.sys.id}`}>
                  {article.fields.title}
                </NavLink>
                {"by"}
                <NavLink to={`/byAuthor/${article.fields.author}`}>
                  {article.fields.author}
                </NavLink>{" "}
              </li>
            );
          })}
        </ul>
        <ul>
          {articlesToShowByCategory.map((article, i) => {
            return (
              <li key={i}>
                <NavLink to={`/all/${article.sys.id}`}>
                  {article.fields.title}
                </NavLink>
                {"by"}
                <NavLink to={`/byAuthor/${article.fields.author}`}>
                  {article.fields.author}
                </NavLink>{" "}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Search;
