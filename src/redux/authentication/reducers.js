import actions from "./actions";

const { LOGIN_SUCCESS, LOGOUT_SUCCESS } = actions;

const initialState = {
  token: "",
};

const Reducer = (state = initialState, action) => {
  const { type, token } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: "",
      };
    default:
      return state;
  }
};

export { Reducer };
