import { APIService } from "../../services/APIService";
import { mockMissions, mockSkills } from "./mockData";

const EndPoints = {
  getMissions: "/missions",
  getSkills: "/missions/skills",
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

    // return apiService.get(EndPoints.getMissions, params);

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

  fetchSkills() {
    // const apiService: APIService = new APIService({
    //   baseURL: "https://localhost:3000/api/v1",
    // });

    // return apiService.get(EndPoints.getMissions, params);
    return new Promise((resolve, reject) => {
      return {
        success: true,
        skills: mockSkills,
      };
    });
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
