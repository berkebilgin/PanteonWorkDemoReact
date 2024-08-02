import axios from "axios";
import { getItem } from "../../utils/localStorageControl";

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}`;

const client = axios.create({
  baseURL: API_ENDPOINT,
});

const contentType = (useJSONInBody = false) => ({
  "Content-Type": useJSONInBody ? "application/json" : "multipart/form-data",
});

class DataService {
  static async get(path = "", params = {}, useJSONInBody = true) {
    return client({
      method: "GET",
      url: path,
      params: useJSONInBody ? params : this.getFormData(params),
      headers: { ...contentType(useJSONInBody) },
    });
  }

  static async post(path = "", data = {}, useJSONInBody = true) {
    return client({
      method: "POST",
      url: path,
      data: useJSONInBody ? data : this.getFormData(data),
      headers: { ...contentType(useJSONInBody) },
    });
  }

  static async patch(path = "", data = {}, useJSONInBody = true) {
    return client({
      method: "PATCH",
      url: path,
      data: useJSONInBody ? data : this.getFormData(data),
      headers: { ...contentType(useJSONInBody) },
    });
  }

  static async put(path = "", data = {}, useJSONInBody = true) {
    return client({
      method: "PUT",
      url: path,
      data: useJSONInBody ? data : this.getFormData(data),
      headers: { ...contentType(useJSONInBody) },
    });
  }

  static getFormData(data = {}) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    return formData;
  }
}

client.interceptors.request.use((config) => {
  const requestConfig = config;
  const { headers } = config;
  const accessToken = getItem("access_token");
  requestConfig.headers = {
    ...headers,
    token: accessToken ? `${accessToken}` : "",
  };

  return requestConfig;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    /**
     * Do something in case the response returns an error code [3**, 4**, 5**] etc
     * For example, on token expiration retrieve a new access token, retry a failed request etc
     */
    const { response } = error;
    const originalRequest = error.config;
    if (response) {
      if (response.status === 500) {
        // do something here
      } else if (response.status === 400) {
        return response;
      } else {
        return originalRequest;
      }
    }
    return Promise.reject(error);
  }
);

export { DataService };
