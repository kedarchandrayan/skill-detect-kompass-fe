import { useNavigate } from "react-router-dom";
import appRouteNameConstants from "../../constants/routes";


export function useHomePageData() {
    const navigate = useNavigate();

    function onLaunchNewMission() {
        navigate(appRouteNameConstants.CREATE)
    }

    return {
        onLaunchNewMission
    }
   
}