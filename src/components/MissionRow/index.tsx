import { MissionRowProps } from "./types";
import styles from "./styles.module.css";

const color = '#001C30ff'
const borderColor = '#001C3050'
export const elementStyle = `${styles.rowElement} border-b border-[${borderColor}] dark:border-[${borderColor}] p-4 pl-8 text-[${color}] dark:text-[${color}]`;
export default function MissionRow(props: MissionRowProps) {
  return (
    <tr>
      <td
        className={elementStyle}
      >
        {props.name}
      </td>
      <td
        className={elementStyle}
      >{`${props.date}`}</td>
      <td
        className={`${styles.selectionCriteria} ${elementStyle}`}
      >
        {props.selectionCriteria}
      </td>
      <td
        className={elementStyle}
      >{`${props.resumeFolderUrl}`}</td>
      <td
        className={elementStyle}
      >{`${props.reportUrl}`}</td>
      <td
        className={elementStyle}
      >{`${props.status}`}</td>
    </tr>
  );
}
