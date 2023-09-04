import MissionRow from "../MissionRow";
import useMissionsTableData from "./useMissionsTableData";
import styles from "./styles.module.css";
import rowStyles from "../MissionRow/styles.module.css";

function Header() {
  return (
    <tr className={`${styles.headerContainer}`}>
      <th className={`${rowStyles.rowElement}  ${styles.headerHeading}`}>
        Name
      </th>
      <th className={`${rowStyles.rowElement} ${styles.headerHeading}`}>
        Date
      </th>
      <th
        className={`${rowStyles.rowElement} ${rowStyles.selectionCriteria} ${styles.headerHeading}`}
      >
        Selection Criteria
      </th>
      <th className={`${rowStyles.rowElement} ${styles.headerHeading}`}>
        Resume Folder URL
      </th>
      <th className={`${rowStyles.rowElement} ${styles.headerHeading}`}>
        Report URL
      </th>
      <th className={`${rowStyles.rowElement} ${styles.headerHeading}`}>
        Status
      </th>
    </tr>
  );
}
export default function MissionsTable() {
  const { data, onScroll, scrollRef, isLoadingMore, isLoading } =
    useMissionsTableData();
    
  return (
    <div
      onScroll={onScroll}
      ref={(ref) => (scrollRef.current = ref)}
      id="scrollableDiv"
      className={`${styles.container}`}
    >
      {isLoading ? (
        <h4>Loading...</h4>
      ) : (
        <table>
          <thead>
            <Header />
          </thead>
          <tbody>
            {data.map((value, idx) => {
              return (
                <MissionRow
                  key={value.id}
                  id={value.id}
                  name={value.name}
                  date={value.createdAt}
                  selectionCriteria={value.customSelectionCriteria}
                  reportUrl={value.reportUrl}
                  resumeFolderUrl={value.resumeFolder}
                  status={value.status}
                />
              );
            })}
          </tbody>
        </table>
      )}
      {!isLoading && isLoadingMore && <h4>Loading...</h4>}
    </div>
  );
}
