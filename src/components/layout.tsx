import Head from "next/head";
import { useTheme } from "../hooks/theme-context";
import styles from "./layout.module.scss";
import { DateFormatter } from "./date";
import { Navbar } from "./navbar";

type LayoutProps = {
  children: React.ReactNode;
  home?: boolean;
  title: string;
};
export const Layout = ({ children, home, title }: LayoutProps) => (
  <div className={styles.container}>
    <Head>
      <title>{title} | Bjarke Tobiesen</title>
    </Head>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);

const Footer = () => {
  const { dark, toggle } = useTheme();
  return (
    <footer className={styles.footer}>
      <div>
        {/* © <DateFormatter formatStr="yyyy" /> <a href="/">Bjarke Tobiesen</a> */}
      </div>
      <div>
        <span
          className="cursor-pointer"
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggle}
        >
          {dark ? "🌚" : "🌞"}
        </span>
      </div>
    </footer>
  );
};
