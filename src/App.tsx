import styles from "./app.module.css";
import ApplicantList from "./components/applicant/ApplicantList";
import Header from "./components/Header/AppHeader";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import {
    fetchApplicantList,
    convertSortValueTokey,
} from "./controller/applicantController";
import { applicantFilteredListSelector } from "./features/applicant/applicantSlice";
import { sortHeaders } from "./utils/constants";
import { useSearchParams } from "react-router-dom";

/**
 * Check which d
 * @returns
 */
const toggleSortDirection = (function () {
    let _direction = false;
    return () => String((_direction = !_direction));
})();

const convertSortDirection = (val: string | undefined | null): boolean =>
    Boolean(!val || val === "false");

const convertSortKey = (val: unknown): string => (!val ? "" : String(val));

function App() {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParam] = useSearchParams();

    const candidates = useAppSelector(applicantFilteredListSelector);

    useEffect(() => {
        dispatch(fetchApplicantList());
    }, [dispatch]);

    const handleClick = (header: string) => () => {
        if (sortHeaders.includes(header)) {
            setSearchParam({
                sort: convertSortValueTokey(header),
                sortDirection: toggleSortDirection(),
                name: searchParams.get("name") || "",
                status: searchParams.get("status") || "",
                position: searchParams.get("position") || "",
            });
        }
    };

    const handleKeyUp = (header: string) => (e: KeyboardEvent) =>
        ["Space", "Enter"].includes(e.code) && handleClick(header)();

    return (
        <div className={styles.appContainer} tabIndex={-1}>
            <Header />
            <ApplicantList
                {...{
                    applicantList: candidates,
                    handleClick,
                    handleKeyUp,
                    sortKey: convertSortKey(searchParams.get("sort")),
                    sortDirection: convertSortDirection(
                        searchParams.get("sortDirection")
                    ),
                }}
            />
        </div>
    );
}

export default App;
