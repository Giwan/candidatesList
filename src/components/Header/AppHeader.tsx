import { useEffect, useRef } from "react";
import Filter from "../Filter/Filter";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
    const applicantsLink = useRef<HTMLAnchorElement>(null);
    useEffect(() => {
        const handleKeyup = (event: KeyboardEvent) => {
            if (Number(event.key) === 1) {
                applicantsLink?.current?.click();
                applicantsLink?.current?.focus();
            }
        };

        document.addEventListener("keyup", handleKeyup);
        return () => document.removeEventListener("keyup", handleKeyup);
    }, []); // fire on mount

    return (
        <header className={styles.headerContainer}>
            <Link
                to="/"
                className={styles.title}
                aria-label="Homepage"
                tabIndex={0}
                ref={applicantsLink}
            >
                Applicants
            </Link>
            <Filter />
        </header>
    );
};

export default Header;
