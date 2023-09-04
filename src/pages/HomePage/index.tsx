import { useEffect } from "react";
import MissionsTable from "../../components/MissionsTable";
import styles from "./styles.module.css";
import { useHomePageData } from "./useHomePage";

function HomePage() {
  const { onLaunchNewMission } = useHomePageData();
  useEffect(() => {
    console.log('here homepage')
    return () => {
      console.log('here homepage unmount')
    }
  }, [])
  return (
    <div className={styles.container}>
      <h1 className="text-3xl font-bold underline text-[#dd0017]">HomeScreen</h1>
      <div>
        <button onClick={onLaunchNewMission}>Launch New Mission</button>
      </div>
      <MissionsTable />
    </div>
  );
}

export default HomePage;
