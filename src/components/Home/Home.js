import MainCard from "../Cards/MainCard";
import styles from "./Home.module.css";
const Home=()=>{
    return (
      <>
        <div className={styles.container}>
          <MainCard status="Resources" />
          <MainCard status="To Do" />
          <MainCard status="Doing" />
          <MainCard status="Done" />
        </div>
      </>
    );
}
export default Home;