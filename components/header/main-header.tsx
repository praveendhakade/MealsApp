import Link from "next/link";
import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import Image from "next/image";
import { NavLink } from "./nav-link";

export const MainHeader = () => {
  return (
    <header className={classes.header}>
      <Link href="/" className={classes.logo}>
        <Image src={logoImg} alt="A plate with food on it" priority />
        NextLevel Food
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink path="/meals" text="Browse Meals" />
          </li>

          <li>
            <NavLink path="/community" text="Foodies Community" />
          </li>
        </ul>
      </nav>
    </header>
  );
};
