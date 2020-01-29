import { handleResponse, requestOptions } from "./util";

const getProjects = () => async () => {
  let response = await fetch("/api/projects", requestOptions());
  const projects = await handleResponse(response);
  return projects;
};

export const projectsService = {
  getProjects
};
