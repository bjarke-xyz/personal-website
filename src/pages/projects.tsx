import { format, parse, parseISO } from "date-fns";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Layout } from "../components/layout";
import { getProjects, ProjectCollection } from "../lib/projects";
import { orderBy } from "lodash";
import styles from "./projects.module.scss";
import Image, { ImageLoaderProps } from "next/image";
import { GitHubIcon, Icon } from "../components/icon";

export default function Projects2({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const timelineItems: TimelineItem[] = projects.websites.map((x) => ({
    time: parseISO(x.dates.from),
    urls: x.urls,
    end: x.dates.to ? parseISO(x.dates.to) : null,
    description: x.description,
    title: x.name,
    image: x.image,
  }));
  return (
    <Layout title="Projects">
      <Timeline items={timelineItems} />
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

interface TimelineItem {
  title: string;
  urls: ProjectCollection["websites"][0]["urls"];
  description: string;
  time: Date;
  end: Date | null;
  image: ProjectCollection["websites"][0]["image"];
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ul className={styles.timeline}>
      {orderBy(items, (x) => x.time, "desc").map((item, i) => (
        <TimelineItem
          key={item.urls.main}
          item={item}
          direction={i % 2 === 0 ? "l" : "r"}
        />
      ))}
    </ul>
  );
}

const formatTime = (time: Date, end: Date | null) => {
  const formatStr = "MMM yyyy";
  if (!end) {
    return (
      <time dateTime={time.toISOString()} title={time.toISOString()}>
        {format(time, formatStr)}
      </time>
    );
  } else {
    return (
      <>
        <time dateTime={time.toISOString()} title={time.toISOString()}>
          {format(time, formatStr)}
        </time>
        {" - "}
        <time dateTime={end.toISOString()} title={time.toISOString()}>
          {format(end, formatStr)}
        </time>
      </>
    );
  }
};

function imageLoader({ src, width, quality }: ImageLoaderProps): any {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://bjarke.xyz";
  return `${baseUrl}${src}?w=${width}&q=${quality || 75}`;
}

function TimelineItem({
  item,
  direction,
}: {
  item: TimelineItem;
  direction: "l" | "r";
}) {
  const urls = Object.keys(item.urls).map((x) => ({
    name: x,
    url: item.urls[x] as string,
  }));
  return (
    <li>
      <div className={styles[`direction-${direction}`]}>
        <div className={styles["flag-wrapper"]}>
          <span className={styles.hexa}></span>
          <span className={styles.flag}>
            <a target="_blank" href={item.urls.main}>
              {item.title}
            </a>
          </span>
          <span className={styles.time}>{formatTime(item.time, item.end)}</span>
        </div>
        <div className={styles.desc}>
          <a href={`/img/projects/${item.image.file}`}>
            <Image
              loader={imageLoader}
              className={styles.image}
              width={item.image.width}
              height={item.image.height}
              alt={`Screenshot of ${item.title}`}
              src={`/img/projects/${item.image.file}`}
            />
          </a>
          <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
          {urls.length > 0 ? (
            <div className={`${styles.tags} ${styles[`tags-${direction}`]}`}>
              {urls.map((u) => (
                <span key={u.url} className={styles.tag}>
                  <a target="_blank" href={u.url}>
                    <Icon name={u.name} />
                  </a>
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <div></div>
      </div>
    </li>
  );
}
