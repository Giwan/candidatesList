import Filter from "../Filter/Filter";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => (
    <header className={styles.headerContainer}>
        <h1>
            <Link to="/">Applicants</Link>
        </h1>
        <Filter />
    </header>
);

export default Header;
