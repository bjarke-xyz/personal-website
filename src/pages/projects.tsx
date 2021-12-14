import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Layout } from "../components/layout";
import styles from "./projects.module.scss";
import {
  getProjects,
  WebsiteProject,
  ProjectCollection,
} from "../lib/projects";
import Image from "next/image";

export default function Projects({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Projects">
      <h2>Projects</h2>
      {projects.websites.map(renderProject)}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<{ projects: ProjectCollection }> =
  async (context) => {
    const projects = await getProjects();
    return {
      props: {
        projects,
      },
    };
  };

const renderProject = ({ url, description, image, name }: WebsiteProject) => (
  <div className={styles.projectContainer} key={url}>
    <h3>
      <a href={url}>{name}</a>
    </h3>
    <div>
      <p dangerouslySetInnerHTML={{ __html: description }} />
      <a href={`/img/projects/${image.file}`}>
        <Image
          width={image.width}
          height={image.height}
          alt={`Screenshot of ${name}`}
          src={`/img/projects/${image.file}`}
        />
      </a>
    </div>
  </div>
);
