import Image, { ImageLoaderProps } from "next/image";
import { useState } from "react";

function imageLoader({ src, width, quality }: ImageLoaderProps): any {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://bjarke.xyz";
  return `${baseUrl}${src}?w=${width}&q=${quality || 75}`;
}

interface CarouselProps {
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
}
export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((i) => (i + 1) % images.length);
  };
  const prev = () => {
    setIndex((i) => {
      if (i === 0) {
        return images.length - 1;
      } else {
        return i - 1;
      }
    });
  };

  const moreThanOne = images.length > 1;

  return (
    <div>
      <div
        className={`group relative mx-auto`}
        style={{ height: `${images[0].height}px` }}
      >
        {images.map((img, i) => (
          <div className={`group relative ${i !== index ? "hidden" : ""}`}>
            <a href={img.src}>
              <Image
                loader={imageLoader}
                width={img.width}
                height={img.height}
                alt={img.alt}
                src={img.src}
              />
            </a>
            {moreThanOne && (
              <div className="invisible absolute bottom-2 w-full bg-black/40 px-2 py-2 text-center text-white transition-all group-hover:visible">
                <div className="flex items-center justify-center space-x-4">
                  {images.map((_, j) => (
                    <div
                      className={`h-4 w-4 cursor-pointer rounded-full  ${
                        j === index
                          ? "bg-highlight dark:bg-highlight-dark"
                          : "bg-white"
                      }`}
                      onClick={() => setIndex(j)}
                    ></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {moreThanOne && (
          <a
            className="invisible absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer bg-black/30 p-2 text-white transition-all hover:bg-black/50 group-hover:visible"
            onClick={prev}
          >
            ❮
          </a>
        )}

        {moreThanOne && (
          <a
            className="invisible absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer bg-black/30 p-2 text-white transition-all hover:bg-black/50 group-hover:visible"
            onClick={next}
          >
            ❯
          </a>
        )}
      </div>
      <br />
    </div>
  );
};
