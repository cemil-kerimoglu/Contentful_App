import React from "react";

function ArticlesItem(props) {
  return <h2>{props.article.fields.title}</h2>;
}

export default ArticlesItem;
