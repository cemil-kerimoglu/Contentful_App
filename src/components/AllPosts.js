import React from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";

function AllPosts({ articles }) {
  const nav = useNavigate();
  const id = useParams("id");
  console.log("in AllPosts: id", id);
  console.log("in AllPosts: nav", nav);
  console.log("in AllPosts: articles:", articles);

  return (
    <>
      Well what the heck ?
      <button onClick={() => nav("/")}>Back to home </button>
      <p> Aaaaalllll the entries : </p>
      {articles?.map((e, i) => {
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
}

export default AllPosts;
