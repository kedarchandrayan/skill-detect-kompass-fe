import { useEffect, useRef, useState } from "react";
import { Mission } from "./types";
import missionsApi from "../../api/missionsApi";
import useIsMounted from "../../hooks/useIsMounted";

type State = {
  data: Array<Mission>;
  isLoading: boolean;
  isLoadingMore: boolean;
};
export default function useMissionsTableData() {
  const stateRef = useRef<State>({
    isLoading: true,
    isLoadingMore: false,
    data: [],
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState<State>(stateRef.current);
  const scrollRef = useRef<HTMLDivElement | null>();
  const hasMoreDataRef = useRef<boolean>(true);
  const onEndReachedCalledRef = useRef<boolean>(false);
  const currentPageNoRef = useRef<number>(1);
  const usedIdsMap = useRef<Record<string, boolean>>({});
  const mounted = useIsMounted();

  useEffect(() => {
    onNext();
  }, []);

  const onScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      console.log({ scrollTop, scrollHeight, clientHeight });
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        if (hasMoreDataRef.current && !onEndReachedCalledRef.current) {
          onEndReachedCalledRef.current = true;
          // This will be triggered after hitting the last element.
          // API call should be made here while implementing pagination.
          console.log("onEndReached");
          onNext();
        }
      }
    }
  };

  const updateState = () => {
    console.log(stateRef.current);
    setState({ ...stateRef.current });
  };

  const onNext = () => {
    stateRef.current.isLoadingMore = true;
    updateState();
    missionsApi
      .fetchMissions(currentPageNoRef.current)
      .then((response: any) => {
        if (mounted) {
          console.log("Response: ", response);
          const data = response.data.data;
          const newMissions = data.missions || [];
          hasMoreDataRef.current = data.has_next_page;
          //filter ids
          const filteredNewMissions = filterNewMissions(newMissions);
          console.log({ filterNewMissions });
          // create data
          const missionData: Array<Mission> = [];
          filteredNewMissions.forEach((mission: any) => {
            usedIdsMap.current[mission.id] = true;

            missionData.push({
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
            });
          });
          stateRef.current.data = [...stateRef.current.data, ...missionData];
          currentPageNoRef.current = currentPageNoRef.current + 1;
          onEndReachedCalledRef.current = false;
        }
      })
      .catch((error: any) => {
        console.log("error in api", error);
      })
      .finally(() => {
        if (mounted) {
          stateRef.current.isLoading = false;
          stateRef.current.isLoadingMore = false;
          onEndReachedCalledRef.current = false;
          updateState();
        }
      });
  };

  // Add proper type
  const filterNewMissions = (newMissions: Record<string, any>) => {
    return newMissions.filter(
      (data: Record<string, any>) => !usedIdsMap.current[data.id]
    );
  };

  return {
    data: stateRef.current.data,
    onNext,
    onScroll,
    scrollRef,
    isLoadingMore: stateRef.current.isLoadingMore,
    isLoading: stateRef.current.isLoading,
  };
}
