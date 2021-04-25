import { baseUrl } from "../../constants";
import axios from "../axios";

export default class ApiCalls {
  public static getLaunches(params: any) {
    return axios({
      url: `${baseUrl}/launches${params.upcoming ? "/upcoming" : ""}`,
      method: "GET",
      params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  public static getLauncheById(id: any) {
    return axios({
      url: `${baseUrl}/launches/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
