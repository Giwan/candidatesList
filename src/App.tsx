import styles from "./app.module.css";
import ApplicantList from "./components/applicant/ApplicantList";
import Header from "./components/Header/AppHeader";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import {
    fetchApplicantList,
    convertSortValueTokey,
} from "./controller/applicantController";
import {
    applicantFilteredListSelector,
    errorSelector,
} from "./features/applicant/applicantSlice";
import { sortHeaders } from "./utils/constants";
import { useSearchParams } from "react-router-dom";
import {
    convertSortKey,
    convertSortDirection,
} from "./controller/sortController";

/**
 * Check which d
 * @returns
 */
const toggleSortDirection = (function () {
    let _direction = false;
    return () => String((_direction = !_direction));
})();

function App() {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParam] = useSearchParams();
    const hasError = useAppSelector(errorSelector);

    const applicantList = useAppSelector(
        applicantFilteredListSelector(searchParams)
    );

    const _fetchApplicants = useCallback(
        () => dispatch(fetchApplicantList()),
        [dispatch]
    );
    const refreshClick = () => _fetchApplicants();

    useEffect(() => {
        _fetchApplicants();
    }, []);

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

    if (hasError) {
        return (
            <div className={styles.appErrorContainer} tabIndex={-1}>
                <p>Failed to load applicants data. </p>
                <button onClick={refreshClick}>Click here to try again</button>
            </div>
        );
    }

    return (
        <div className={styles.appContainer} tabIndex={-1}>
            <Header />
            <ApplicantList
                {...{
                    applicantList,
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
