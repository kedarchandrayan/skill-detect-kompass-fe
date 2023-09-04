import { useNavigate } from "react-router-dom";


export function useHomePageData() {
    const navigate = useNavigate();

    function onLaunchNewMission() {
        navigate("/create")
    }

    return {
        onLaunchNewMission
    }
   
}