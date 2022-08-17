import React from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import RenderRTF from "./RenderRTF.js";

function Single({ articles }) {
  const nav = useNavigate();
  const { id } = useParams("id");
  console.log("in single, id = ", id);
  const single = articles.find((e) => e.sys.id === id);
  console.log(single);
  const article = single.fields;
  return (
    <>
      <button onClick={() => nav("/")}>Back to home</button>
      <p>
        "{article?.title}", written by{" "}
        <strong>
          <NavLink to={`/byAuthor/${article?.author}`}>
            {article?.author}
          </NavLink>
        </strong>{" "}
        published on {article?.publishDate}
      </p>
      Categories for this article:
      {article?.categories?.map((c, i) => (
        <span key={i}> {c} </span>
      ))}
      <hr />
      <img
        src={`https:${article?.mainPicture?.fields.file.url}`}
        alt="no pic 4 u"
      />
      <p>{article?.mainPicture?.fields.description}</p>
      <hr />
      {article?.content?.content?.map((c, i) => (
        <div key={i}>
          <RenderRTF obj={c} />
        </div>
      ))}
      <hr />
    </>
  );
}

export default Single;
