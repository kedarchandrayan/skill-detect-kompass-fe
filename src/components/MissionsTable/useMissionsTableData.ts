import { useEffect, useRef, useState } from "react";
import { Mission } from "./types";
import missionsApi from "../../api/missionsApi";

type State = {
  data: Array<Mission>
  isLoading: boolean,
  isLoadingMore: boolean
}
export default function useMissionsTableData() {
  const stateRef = useRef<State>({
      isLoading: true,
      isLoadingMore: false,
      data: [],
  })
  const [state, setState] = useState<State>(stateRef.current);
  const scrollRef = useRef<HTMLDivElement | null>();
  const hasMoreDataRef = useRef<boolean>(true);
  const onEndReachedCalledRef = useRef<boolean>(false);
  const currentPageNoRef = useRef<number>(0);
  const usedIdsMap = useRef<Record<string, boolean>>({});

  useEffect(() => {
    onNext();
    return () => {
      console.log("unmount");
    };
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
    console.log(stateRef.current)
    setState({...stateRef.current});
  }

  const onNext = () => {
    console.log("here");
    stateRef.current.isLoadingMore = true
    updateState();
    missionsApi
      .fetchMissions(currentPageNoRef.current)
      .then((response: any) => {
        console.log("Response: ", response)
        const data = response.data;
        const newMissions = data.missions || [];
        hasMoreDataRef.current = data.has_next_page;
        //filter ids
        const filteredNewMissions = filterNewMissions(newMissions);
        

        // create data
        const missionData: Array<Mission> = [];
        filteredNewMissions.forEach((mission: any) => {
          usedIdsMap.current[mission.id] = true;

          missionData.push({
            id: mission.id,
            name: mission.name,
            resumeFolder: mission.resume_folder,
            skillIds: mission.skill_ids,
            totalExperienceDetails: mission.total_experience_details,
            minCGPA: mission.minCGPA,
            customSelectionCriteria: mission.custom_selection_criteria,
            reportUrl: mission.report_url,
            totalResumes: mission.total_resumes,
            processedResumes: mission.processed_resumes,
            status: mission.status,
            createdAt: mission.created_at,
            updatedAt: mission.updated_at,
          });
        });
        console.log('filteredNewMissions: ', filteredNewMissions)
        stateRef.current.data = [...stateRef.current.data, ...missionData]
        console.log('stateRef.current.data ', stateRef.current.data )
        currentPageNoRef.current = currentPageNoRef.current + 1
        console.log('currentPageNoRef.current ', currentPageNoRef.current)
        onEndReachedCalledRef.current = false;
        console.log("usedIdsMap.current: ", usedIdsMap.current)
      })
      .catch((error: any) => {
        console.log("error in api", error);
      })
      .finally(() => {
        stateRef.current.isLoading = false
        stateRef.current.isLoadingMore = false;
        onEndReachedCalledRef.current = false;
        updateState();
      });
  };

  // Add proper type
  const filterNewMissions = (newMissions: Record<string, any>) => {
    console.log('usedIdsMap.current', usedIdsMap.current)
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

