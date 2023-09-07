import { MissionRowProps } from "./types";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import appRouteNameConstants from "../../constants/routes";

const color = "#001C30ff";
const borderColor = "#001C3050";

export const elementStyle = `${styles.rowElement} border-b border-[${borderColor}] p-4 pl-8 text-[${color}]`;

export default function MissionRow(props: MissionRowProps) {
  const navigate = useNavigate();
  const navigateToMissionDetailsPage = () => {
    navigate(`${appRouteNameConstants.MISSION_DETAILS}?id=${props.id}`);
  };

  return (
    <tr className="cursor-pointer max-w-[100vw] hover:bg-gray-100" onClick={navigateToMissionDetailsPage}>
      <td className={elementStyle}>{`${new Date(props.date * 1000).toLocaleString()}`}</td>
      <td className={elementStyle}>{props.name}</td>
      <td className={`${elementStyle} break-all`}>{`${props.resumeFolderUrl}`}</td>
      <td className={`${elementStyle} break-all`}>{`${props.reportUrl}`}</td>
      <td className={elementStyle}>{`${props.status}`}</td>
    </tr>
  );
}
