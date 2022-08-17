import React from "react";

function RenderRTF({ obj }) {
  console.log("rendering a :", obj.nodeType);
  console.log("data of RTF node is this:", obj);
  switch (obj.nodeType) {
    case "table":
      return (
        <>
          <table>
            {obj.content.map((e, i) => (
              <RenderRTF obj={e} />
            ))}
          </table>
        </>
      );
    case "table-row":
      return (
        <>
          <tr>
            {obj.content.map((e, i) => (
              <RenderRTF obj={e} />
            ))}
          </tr>
        </>
      );

      break;
    case "table-cell":
      return (
        <>
          <td>
            {obj.content.map((e, i) => (
              <RenderRTF obj={e} />
            ))}
          </td>
        </>
      );

      break;
    case "hyperlink":
      return <a href={obj.data.uri}>{obj.content[0].value}</a>;
      break;
    case "text":
      // convert all "\n" to <br>
      return (
        <span>
          {/*
                      NodeType ={obj.nodeType}
      */}
          {obj.value.split("\n").map((e, i) => (
            <span key={i}>
              {e}
              <br />
            </span>
          ))}
        </span>
      );
      break;
    case "paragraph":
      // recursively render it's sub-elements
      return (
        <>
          {obj.content.map((e, i) => (
            <p key={i}>
              {" "}
              <RenderRTF obj={e} />{" "}
            </p>
          ))}
        </>
      );
      break;
    case "heading-1":
      return <h1>{obj.content[0].value}</h1>;
      break;
    case "heading-2":
      return <h2>{obj.content[0].value}</h2>;
      break;
    case "heading-3":
      return <h3>{obj.content[0].value}</h3>;
      break;
    case "unordered-list":
      return (
        <ul>
          {obj.content.map((e, i) => (
            <li key={i}>
              {" "}
              <RenderRTF obj={e} />{" "}
            </li>
          ))}
        </ul>
      );
      break;
    case "list-item":
      return (
        <>
          {obj.content.map((e, i) => (
            <li key={i}>
              {" "}
              <RenderRTF obj={e} />{" "}
            </li>
          ))}
        </>
      );
      break;
    case "embedded-asset-block":
      return (
        <>
          <h4>{obj.data.target.fields.title}</h4>
          <img
            src={obj.data.target.fields.file.url}
            alt={obj.data.target.fields.description}
          />
          <h5>{obj.data.target.fields.description} </h5>
        </>
      );
      break;

    default:
      console.log(
        "Whoops, some kind of rich text I haven't seen before. Shame on me, I guess...",
        obj.nodeType
      );
      break;
  }
}

export default RenderRTF;
