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

  const d = new Date(props.date * 1000);
  const date =
    d.getDate() +
    "/" +
    (d.getMonth() + 1) +
    "/" +
    d.getFullYear() +
    " " +
    d.getHours() +
    ":" +
    d.getMinutes();
  return (
    <tr className="cursor-pointer" onClick={navigateToMissionDetailsPage}>
      <td className={elementStyle}>{props.name}</td>
      <td className={elementStyle}>{`${date}`}</td>
      <td className={`${styles.selectionCriteria} ${elementStyle}`}>
        {props.selectionCriteria}
      </td>
      <td className={elementStyle}>{`${props.resumeFolderUrl}`}</td>
      <td className={elementStyle}>{`${props.reportUrl}`}</td>
      <td className={elementStyle}>{`${props.status}`}</td>
    </tr>
  );
}
