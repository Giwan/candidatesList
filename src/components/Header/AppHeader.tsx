import Filter from "../Filter/Filter";
import styles from "./Header.module.css";

const Header = () => (
    <header className={styles.headerContainer}>
        <h1>Applicants</h1>
        <Filter />
    </header>
);

export default Header;
