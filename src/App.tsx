import styles from "./app.module.css";
import ApplicantList from "./components/applicant/applicantList";

function App() {
    return (
        <div className={styles.appContainer}>
            <Header />
            <ApplicantList />
        </div>
    );
}

export default App;

export const Header = () => (
    <header>
        <h1>Applicants</h1>
    </header>
);
