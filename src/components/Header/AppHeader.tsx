import Filter from "../Filter/Filter";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => (
    <header className={styles.headerContainer}>
        <Link className={styles.title} to="/" aria-label="Homepage">
            Applicants
        </Link>
        <Filter />
    </header>
);

export default Header;
