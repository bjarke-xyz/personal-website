import { handleResponse, requestOptions } from "./util";

const getProjects = () => async () => {
  let response = await fetch("/static/data/projects.json", requestOptions());
  const projects = await handleResponse(response);
  return projects;
};

export const projectsService = {
  getProjects
};
