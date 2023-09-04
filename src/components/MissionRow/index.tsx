import { MissionRowProps } from "./types";
import styles from "./styles.module.css";

export default function MissionRow(props: MissionRowProps) {
  return (
    <tr>
      <td className={styles.rowElement}>{props.name}</td>
      <td className={styles.rowElement}>{`${props.date}`}</td>
      <td className={`${styles.rowElement} ${styles.selectionCriteria}`}>{props.selectionCriteria}</td>
      <td className={styles.rowElement}>{`${props.resumeFolderUrl}`}</td>
      <td className={styles.rowElement}>{`${props.reportUrl}`}</td>
      <td className={styles.rowElement}>{`${props.status}`}</td>
    </tr>
  );
}
