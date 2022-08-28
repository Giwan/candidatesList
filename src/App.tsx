import styles from "./app.module.css";
import ApplicantList from "./components/applicant/applicantList";
import Header from "./components/Header/AppHeader";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { fetchApplicantList } from "./controller/applicantController";
import { applicantListSelector } from "./features/applicant/applicantSlice";

function App() {
    const dispatch = useAppDispatch();
    const candidates = useAppSelector(applicantListSelector);
    useEffect(() => {
        dispatch(fetchApplicantList());
    }, [dispatch]);

    return (
        <div className={styles.appContainer}>
            <Header />
            <ApplicantList {...{ applicantList: candidates }} />
        </div>
    );
}

export default App;
