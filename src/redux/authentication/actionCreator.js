import actions from "./actions";
import { notification } from "antd";
import { DataService } from "../../config/dataService/dataService";
import Cookies from "js-cookie";

const { loginSuccess, logoutSuccess } = actions;

const Login = (data) => {
  return async (dispatch) => {
    try {
      const response = await DataService.post(
        `${process.env.REACT_APP_LOGIN_ENDPOINT}`,
        data
      );

      if (!response.data.isValid) {
        response.data.errorMessages?.forEach((msg) => {
          notification.error({
            message: msg,
          });
        });
      } else {
        Cookies.set("access_token", response.data.model.token);
        Cookies.set("userId", response.data.model.userId);
        localStorage.clear();
        dispatch(loginSuccess(response.data.model.token));
      }
    } catch {
      notification.error({
        message: "İşleminiz Sırasında Bir Hata Meydana Geldi",
      });
    }
  };
};

const Logout = () => {
  return async (dispatch) => {
    Cookies.set("access_token", "");
    Cookies.set("userId", "");
    localStorage.clear();
    dispatch(logoutSuccess());
  };
};

export { Login, Logout };
