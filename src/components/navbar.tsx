import { useRouter } from "next/router";
import Link from "next/link";

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
        (<Link
          href={route.path}
          key={route.name}
          className={`mr-4 text-body dark:text-body-dark ${
            router.pathname == route.path
              ? "text-highlight dark:text-highlight-dark"
              : ""
          }`}>

          {route.name}

        </Link>)
      ))}
    </div>
  );
};
