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
    <div className="mb-4">
      {routes.map((route) => (
        <Link href={route.path} key={route.name}>
          <a
            className={`text-body dark:text-body-dark mr-4 ${
              router.pathname == route.path
                ? "text-highlight dark:text-highlight-dark"
                : ""
            }`}
          >
            {route.name}
          </a>
        </Link>
      ))}
    </div>
  );
};
