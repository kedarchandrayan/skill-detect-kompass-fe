import MissionRow, { elementStyle } from "../MissionRow";
import useMissionsTableData from "./useMissionsTableData";
import styles from "./styles.module.css";
import rowStyles from "../MissionRow/styles.module.css";
import Loader from "../Loader/Loader";
import useIsMounted from "../../hooks/useIsMounted";

function Header() {
  return (
    <tr className={`${styles.headerContainer}`}>
      <th className={elementStyle}>Date</th>
      <th className={elementStyle}>Mission Name</th>
      <th className={elementStyle}>Resume Folder</th>
      <th className={elementStyle}>Report</th>
      <th
        className={elementStyle}
      >
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
      className={`${styles.container} mt-[50px] mb-[30px] !p-0 ${
        !isLoading ? "border rounded-tr-[25px] rounded-tl-[25px]" : ""
      }`}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <table className="table-fixed whitespace-normal max-w-[80vw]">
          <thead className="sticky top-0 bg-slate-50">
            <Header />
          </thead>
          <tbody className="bg-white">
            {data.map((value, idx) => {
              return (
                <MissionRow
                  key={value.id}
                  id={value.id}
                  name={value.name}
                  date={value.createdAt}
                  selectionCriteria={value.customSelectionCriteria}
                  reportUrl={value.reportUrl}
                  resumeFolderUrl={value.resumeFolderUrl}
                  status={value.status}
                />
              );
            })}
          </tbody>
        </table>
      )}
      {!isLoading && isLoadingMore && (
        <div className={`${styles.loaderContainer}`}>
          <Loader />
        </div>
      )}
    </div>
  );
}
