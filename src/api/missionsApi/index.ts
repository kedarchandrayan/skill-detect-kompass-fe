import { APIService } from "../../services/APIService";
import { mockMissions } from "./mockData";

const EndPoints = {
  missions: "/missions",
};

class MissionsApi {
  fetchMissions(pageNo: number) {
    console.log({ pageNo });
    // const params = {
    //   page: pageNo,
    // };

    // const apiService: APIService = new APIService({
    //   baseURL: "https://localhost:3000/api/v1",
    // });

    // return apiService.get(EndPoints.missions, params);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let size = 20;
        let hasMoreData = true;
        const nextData = mockMissions.slice(
          pageNo * size,
          pageNo * size + size
        );
        if (pageNo * size + size > 50) {
          hasMoreData = false;
        }
        resolve({
          success: true,
          data: {
            missions: nextData,
            has_next_page: hasMoreData,
            skills: {},
          },
        });
      }, 3000);
    });
  }

  postMission({
    name,
    resumeFolderLink,
    skills,
    totalExp,
    minCGPA,
    selectionCriteria,
  }: any) {
    const params: any = {};

    if (name) {
      params["name"] = name;
    }

    if (resumeFolderLink) {
      params["resume_folder_url"] = resumeFolderLink;
    }

    if (skills) {
      params["skills"] = skills;
    }

    if (totalExp) {
      params["total_experience_details"] = totalExp;
    }

    if (minCGPA !== undefined) {
      params["min_cgpa"] = minCGPA;
    }

    if (selectionCriteria) {
      params["custom_selection_criteria"] = selectionCriteria;
    }

    const apiService: APIService = new APIService({});

    console.log("API: params", params)
    return apiService.post(EndPoints.missions, params);

    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     reject({ message: "error in requ" });
    //   }, 3000);
    // });
  }
}

const missionsApi = new MissionsApi();
export default missionsApi;
// setTimeout(() => {
//   setData((data) => {
//     console.log("on Next index:", data.length);
//     console.log("on Next index + :", data.length + 10);
//   });
//   setIsLoadingMore(false);
//   onEndReachedCalled.current = false;
// }, 3000);
