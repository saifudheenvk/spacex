import { baseUrl } from "../../constants";
import axios from "../axios";

export default class RocketActions {
  public static getRocketById(rocketId: string) {
    return axios({
      url: `${baseUrl}/rockets/${rocketId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
