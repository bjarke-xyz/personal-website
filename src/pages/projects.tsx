import { format, parseISO } from "date-fns";
import { orderBy } from "lodash";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image, { ImageLoaderProps } from "next/image";
import { Carousel } from "../components/carousel";
import { Icon } from "../components/icon";
import { Layout } from "../components/layout";
import { getProjects, ProjectCollection } from "../lib/projects";

type Direction = "left" | "right";

function imageLoader({ src, width, quality }: ImageLoaderProps): any {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://bjarke.xyz";
  return `${baseUrl}${src}?w=${width}&q=${quality || 75}`;
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
        <time dateTime={end.toISOString()} title={end.toISOString()}>
          {format(end, formatStr)}
        </time>
      </>
    );
  }
};
interface TimelineItem {
  title: string;
  urls: ProjectCollection["websites"][0]["urls"];
  description: string;
  time: Date;
  end: Date | null;
  images: ProjectCollection["websites"][0]["images"];
}

export default function Projects({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const timelineItems: TimelineItem[] = projects.websites.map((x) => ({
    time: parseISO(x.dates.from),
    urls: x.urls,
    end: x.dates.to ? parseISO(x.dates.to) : null,
    description: x.description,
    title: x.name,
    images: x.images,
  }));
  return (
    <Layout title="Projects">
      <Timeline items={timelineItems} />
    </Layout>
  );
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="mx-auto flex grid-cols-9 flex-col p-2 md:grid">
      {orderBy(items, (x) => x.time, "desc").map((item, i) => (
        <TimelineItem
          key={item.urls.main}
          item={item}
          direction={i % 2 === 0 ? "left" : "right"}
        />
      ))}
    </div>
  );
}

function TimelineItemContent({
  item,
  direction,
}: {
  item: TimelineItem;
  direction: Direction;
}) {
  const urls = Object.keys(item.urls).map((x) => ({
    name: x,
    url: item.urls[x] as string,
  }));
  const carouselImages = item.images.map((image) => ({
    src: `/img/projects/${image.file}`,
    alt: image.alt ?? `Screenshot of ${item.title}`,
    width: image.width,
    height: image.height,
  }));
  return (
    <div className="flex flex-col">
      <h3 className="mb-1 text-xl font-semibold">
        <a target="_blank" href={item.urls.main}>
          {item.title}
        </a>
      </h3>
      <p className="mb-4 text-sm italic">{formatTime(item.time, item.end)}</p>
      <div className="mb-4 self-center">
        <Carousel images={carouselImages} />
      </div>
      <p
        className="mb-4 text-justify leading-tight"
        dangerouslySetInnerHTML={{ __html: item.description }}
      ></p>
      {urls.length > 0 ? (
        <div className="flex flex-row-reverse items-center space-x-2 space-x-reverse">
          {urls.map((u) => (
            <span
              key={u.url}
              className="rounded-md bg-background p-2 dark:bg-background-dark"
            >
              <a target="_blank" href={u.url}>
                <Icon name={u.name} />
              </a>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function TimelineItemLine() {
  return (
    <div className="relative col-start-5 col-end-6 mr-10 md:mx-auto">
      <div className="flex h-full w-6 items-center justify-center">
        <div className="pointer-events-none h-full w-1 bg-body-alt dark:bg-body-alt-dark "></div>
      </div>
      <div className="absolute top-1/2 -mt-3 h-6 w-6 rounded-full bg-highlight shadow hover:animate-ping dark:bg-highlight-dark"></div>
    </div>
  );
}

function TimelineItem({
  item,
  direction,
}: {
  item: TimelineItem;
  direction: Direction;
}) {
  if (direction === "left") {
    return (
      <div className="flex flex-row-reverse md:contents">
        <div className="col-start-1 col-end-5 my-4 ml-auto rounded-xl bg-body-alt p-4 shadow-md dark:bg-body-alt-dark">
          <TimelineItemContent item={item} direction={direction} />
        </div>
        <TimelineItemLine />
      </div>
    );
  } else {
    return (
      <div className="flex md:contents">
        <TimelineItemLine />
        <div className="col-start-6 col-end-10 my-4 mr-auto rounded-xl bg-body-alt p-4 shadow-md dark:bg-body-alt-dark">
          <TimelineItemContent item={item} direction={direction} />
        </div>
      </div>
    );
  }
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
