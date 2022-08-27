import styles from "./app.module.css";

function App() {
  return (
    <div className={styles.appContainer}>
      <Header />
    </div>
  );
}

export default App;

export const Header = () => (
  <header>
    <h1>Applicants</h1>
  </header>
);
