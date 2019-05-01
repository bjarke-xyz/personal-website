import React from "react";
import { Card } from "./Card";

export const Project = props => (
  <Card
    name={props.project.name}
    description={props.project.description}
    img={props.project.img}
    url={props.project.url}
  />
);
