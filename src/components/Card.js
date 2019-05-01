import React from "react";
import styled from "@emotion/styled";

const CardContainer = styled("div")`
  margin-top: 15px;
  div {
    display: flex;
    flex-direction: row;

    p {
      max-width: 300px;
      margin-right: 40px;
    }

    a {
      img {
        max-width: 300px;
        box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
      }
    }
  }
`;

export const Card = props => (
  <CardContainer>
    <h3>
      <a href={props.url}>{props.name}</a>
    </h3>
    <div>
      <p dangerouslySetInnerHTML={{ __html: props.description }} />
      <a href={`/img/${props.img}`}>
        <img src={`/img/${props.img}`} alt="Project" />
      </a>
    </div>
  </CardContainer>
);
