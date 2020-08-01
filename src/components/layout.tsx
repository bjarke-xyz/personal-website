import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import DateFormatter from "./date";
import { useTheme } from "../hooks/theme-context";
import styles from "./layout.module.scss";

export default function Layout({
  children,
  home,
  title,
}: {
  children: React.ReactNode;
  home?: boolean;
  title: string;
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title} | Bjarke Tobiesen</title>
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Navbar() {
  const router = useRouter();
  const routes = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/projects",
      name: "Projects",
    },
    {
      path: "/contact",
      name: "Contact",
    },
  ];
  return (
    <div className={styles.navbar}>
      {routes.map((route) => (
        <Link href={route.path} key={route.name}>
          <a className={router.pathname == route.path ? styles.isActive : ""}>{route.name}</a>
        </Link>
      ))}
    </div>
  );
}

function Footer() {
  const { dark, toggle } = useTheme();
  const buttonLabel = dark ? "Switch to light mode" : "Switch to dark mode";
  const now = new Date().toISOString();
  return (
    <footer className={styles.footer}>
      <div>
        © <DateFormatter date={now} formatStr="yyyy" /> <a href="/">Bjarke Tobiesen</a>
      </div>
      <div>
        <span className="cursor-pointer" title={buttonLabel} onClick={toggle}>
          {dark ? "🌚" : "🌞"}
        </span>
      </div>
    </footer>
  );
}
