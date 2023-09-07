import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Mission } from "../../components/MissionsTable/types";
import missionsApi from "../../api/missionsApi";
import Loader from "../../components/Loader/Loader";
import styles from "./styles.module.css";

function MissionDetailsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [apiInProgress, setApiInProgress] = useState(true);
  const [missionDetails, setMissionDetails] = useState<Mission | undefined>();

  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1)
  }

  const missionId = searchParams.get("id");
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    if (missionId) {
      setApiInProgress(true);
      missionsApi
        .getMission(missionId)
        .then((response: any) => {
          console.log({ response });
          const mission = response.data.data.mission || {};
          const missionData: Mission = {
            id: mission.id,
            name: mission.name,
            resumeFolderUrl: mission.resume_folder_url,
            skills: mission.skills,
            totalExperienceDetails: mission.total_experience_details,
            minCGPA: mission.min_cgpa,
            customSelectionCriteria: mission.custom_selection_criteria,
            reportUrl: mission.report_url,
            totalCount: mission.total_count,
            processedCount: mission.processed_count,
            status: mission.status,
            createdAt: mission.created_at,
            updatedAt: mission.updated_at,
          };
          setMissionDetails(missionData);
        })
        .catch((err) => console.log("Error in api: ", err.message))
        .finally(() => {
          setApiInProgress(false);
        });
    }
  };

  return apiInProgress ? (
    <div className={`${styles.loaderContainer}`}>
      <Loader />
    </div>
  ) : !missionDetails ? (
    <div>Mission not found</div>
  ) : (
    <div className="relative max-w-screen-md mx-auto p-[8px] ">
      <div className="bg-white rounded-lg border p-6 max-w-screen-md mx-auto mt-8">
      <div className="cursor-pointer absolute top-[55px] left-[25px] flex flex-row justify-center align-center" onClick={navigateBack}><img className="w-[20px] mr-[6px]" src="back-arrow.png" alt="back_arrow"/></div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          {missionDetails.name}
        </h1>
        <table className="w-full table-fixed text-start whitespace-normal align-top">
          <tbody>
            <tr className={`${styles.detailsRow} border-b pb-[8px]`}>
              <td className="w-1/3 font-semibold align-top">
                Resume Folder URL:
              </td>
              <td className="w-2/3">
                <a
                  href={missionDetails.resumeFolderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {missionDetails.resumeFolderUrl}
                </a>
              </td>
            </tr>
            <tr className="border-b pb-[8px]">
              <td className="w-1/3 font-semibold align-top">Report URL:</td>
              <td className="w-2/3">
                {missionDetails.reportUrl ? (
                  <a
                    href={missionDetails.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {missionDetails.reportUrl}
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
            </tr>
            {missionDetails.totalExperienceDetails && (
              <tr className="border-b pb-[8px]">
                <td className="w-1/3 font-semibold align-top">
                  Total Experience Details:
                </td>
                <td className="w-2/3">
                  {JSON.stringify(missionDetails.totalExperienceDetails)}
                </td>
              </tr>
            )}
            <tr className="border-b pb-[8px]">
              <td className="w-1/3 font-semibold align-top">Minimum CGPA:</td>
              <td className="w-2/3">{missionDetails.minCGPA}</td>
            </tr>
            <tr className="border-b pb-[8px]">
              <td className="w-1/3 font-semibold align-top">
                Skills Required:
              </td>
              <td className="w-2/3">{missionDetails.skills.join(", ")}</td>
            </tr>
            <tr className="border-b pb-[8px]">
              <td className="w-1/3 font-semibold align-top">Total Count:</td>
              <td className="w-2/3">{missionDetails.totalCount}</td>
            </tr>
            <tr className="border-b pb-[8px]">
              <td className="w-1/3 font-semibold align-top">
                Processed Count:
              </td>
              <td className="w-2/3">{missionDetails.processedCount}</td>
            </tr>
            <tr className="border-b pb-[8px]">
              <td className="w-1/3 font-semibold align-top">
                Custom Selection Criteria:
              </td>
              <td className="w-2/3">
                {missionDetails.customSelectionCriteria
                  ? missionDetails.customSelectionCriteria
                  : "N/A"}
              </td>
            </tr>
            <tr className="border-b pb-[8px]">
              <td className="w-1/3 font-semibold align-top">Status:</td>
              <td className="w-2/3">{missionDetails.status}</td>
            </tr>
            <tr className="border-b pb-[8px]">
              <td className="w-1/3 font-semibold align-top">Created At:</td>
              <td className="w-2/3">
                {new Date(missionDetails.createdAt * 1000).toLocaleString()}
              </td>
            </tr>
            <tr className="border-b py-8">
              <td className="w-1/3 font-semibold align-top">Updated At:</td>
              <td className="w-2/3">
                {new Date(missionDetails.updatedAt * 1000).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        className="bg-[#001C30] mt-[8px] text-[#fff] border-2 text-[16px] font-semibold px-[1rem] py-[0.5rem] inline-block hover:bg-transparent hover:border-[#001C30] hover:text-[#001C30] transition tracking-wider"
        onClick={() => fetchData()}
      >
        Refresh Status
      </button>
    </div>
  );
}

export default MissionDetailsPage;
