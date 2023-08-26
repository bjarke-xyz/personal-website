import Head from "next/head";
import { useTheme } from "../hooks/theme-context";
import { Navbar } from "./navbar";

type LayoutProps = {
  children: React.ReactNode;
  home?: boolean;
  title: string;
};
export const Layout = ({ children, home, title }: LayoutProps) => {
  const fullTitle = `${title} | Bjarke`;
  return (
    <div className="container mx-auto max-w-4xl px-4 pt-4">
      <Head>
        <title>{fullTitle}</title>
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

const Footer = () => {
  const { theme, toggle } = useTheme();
  return (
    <footer className="mt-14 mb-4 flex justify-between text-sm">
      <div></div>
      <div>
        <span
          className="cursor-pointer"
          title={"Toggle theme"}
          onClick={toggle}
        >
          {theme === "auto" && "🌓"}
          {theme === "dark" && "🌚"}
          {theme === "light" && "🌞"}
        </span>
      </div>
    </footer>
  );
};
