import React from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";

function ByAuthor({ articles }) {
  const nav = useNavigate();
  const { aut } = useParams("aut");
  console.log("in ByAuthor: articles:", articles);
  console.log("in ByAuthor: aut:", aut);
  const articlesByAuthor = articles.filter((e) => e.fields.author === aut);
  console.log(articlesByAuthor);
  if (aut) {
    return (
      <>
        Well what the heck ?
        <button onClick={() => nav("/")}>Backo home </button>
        <p> Articles by Author {aut}: </p>
        {articlesByAuthor?.map((e, i) => {
          return (
            <div key={i}>
              <NavLink to={`/all/${e.sys.id}`}> {e.fields.title} </NavLink>
              by{" "}
              <NavLink to={`/byAuthor/${e.fields.author}`}>
                {" "}
                {e.fields.author}{" "}
              </NavLink>
              published on {e.fields.publishDate}
              <hr />
            </div>
          );
        })}
      </>
    );
  } else return <>I dont know this guy....</>;
}

export default ByAuthor;
