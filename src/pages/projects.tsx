import { parseISO } from "date-fns";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import { Layout } from "../components/layout";
import {
  getProjects,
  ProjectCollection,
  WebsiteProject,
} from "../lib/projects";
import styles from "./projects.module.scss";

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

export const getStaticProps: GetStaticProps<{
  projects: ProjectCollection;
}> = async (context) => {
  const projects = await getProjects();
  return {
    props: {
      projects,
    },
  };
};

const formatName = (name: string, dates: WebsiteProject["dates"]) => {
  const from = parseISO(dates.from);
  let dateStr = `${from.getFullYear()}`;
  if (dates.to) {
    const to = parseISO(dates.to);
    dateStr = `${dateStr} - ${to.getFullYear()}`;
  }
  return `${name} (${dateStr})`;
};

const renderProject = ({
  url,
  description,
  image,
  name,
  dates,
}: WebsiteProject) => (
  <div className={styles.projectContainer} key={url}>
    <h3>
      <a href={url}>{formatName(name, dates)}</a>
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
