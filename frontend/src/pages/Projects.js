import React from "react";
import { projectsService } from "../services";
import { Project, Fetcher } from "../components";

const renderProjects = projects => {
  return (
    <div>
      {projects.websites.map(proj => (
        <Project key={proj.name} project={proj} />
      ))}
    </div>
  );
};

export const Projects = props => {
  return (
    <div>
      <h2>Projects</h2>
      <Fetcher action={projectsService.getProjects()}>
        {data => renderProjects(data)}
      </Fetcher>
    </div>
  );
};
