import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./navbar.module.scss";

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

export const Navbar = () => {
  const router = useRouter();
  return (
    <div className={styles.navbar}>
      {routes.map((route) => (
        <Link href={route.path} key={route.name}>
          <a className={router.pathname == route.path ? styles.isActive : ""}>{route.name}</a>
        </Link>
      ))}
    </div>
  );
};
