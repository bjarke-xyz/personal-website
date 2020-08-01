import { GetStaticProps, InferGetStaticPropsType } from "next";
import fs from "fs";
import { promisify } from "util";
import path from "path";
import Layout from "../components/layout";
import styles from "./projects.module.scss";

export default function Projects({ projects }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Projects">
      <h2>Projects</h2>
      {projects.websites.map(renderProject)}
    </Layout>
  );
}

function renderProject({ url, description, img, name }: WebsiteProject) {
  return (
    <div className={styles.projectContainer} key={url}>
      <h3>
        <a href={url}>{name}</a>
      </h3>
      <div>
        <p dangerouslySetInnerHTML={{ __html: description }} />
        <a href={`/img/projects/${img}`}>
          <img src={`/img/projects/${img}`} alt="Project" />
        </a>
      </div>
    </div>
  );
}

interface WebsiteProject {
  description: string;
  disabled: boolean;
  img: string;
  name: string;
  url: string;
}
interface ProjectCollection {
  websites: WebsiteProject[];
}

export const getStaticProps: GetStaticProps<{ projects: ProjectCollection }> = async (context) => {
  const projectsFile = path.join(process.cwd(), "public", "data", "projects.json");
  const projectsJson = await promisify(fs.readFile)(projectsFile, "utf8");
  const projects: ProjectCollection = JSON.parse(projectsJson);
  return {
    props: {
      projects,
    },
  };
};
