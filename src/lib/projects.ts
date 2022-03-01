import { promises as fs } from "fs";
import path from "path";

export const getProjects = async (): Promise<ProjectCollection> => {
  const projectsFile = path.join(
    process.cwd(),
    "public",
    "data",
    "projects.json"
  );
  const projectsJson = await fs.readFile(projectsFile, "utf-8");
  return JSON.parse(projectsJson);
};

export interface WebsiteProject {
  description: string;
  disabled: boolean;
  image: {
    file: string;
    width: number;
    height: number;
  };
  dates: {
    from: string;
    to: string;
  };
  name: string;
  urls: {
    main: string;
    github?: string;
  };
}
export interface ProjectCollection {
  websites: WebsiteProject[];
}
