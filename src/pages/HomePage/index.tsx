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
      <h1 className="text-[30px] font-semibold text-[#001C30]">Smart Talent Rover</h1>
      <div>
        <button onClick={onLaunchNewMission} className="bg-[#001C30] mt-[16px] text-[#fff] border-2 text-[18px] font-semibold px-[1.5rem] py-[1rem] inline-block hover:bg-transparent hover:border-[#001C30] hover:text-[#001C30] transition tracking-wider">Launch New Mission</button>
      </div>
      <MissionsTable />
    </div>
  );
}

export default HomePage;
