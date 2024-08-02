const actions = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",

  loginSuccess: (token) => {
    return {
      type: actions.LOGIN_SUCCESS,
      token,
    };
  },

  logoutSuccess: () => {
    return {
      type: actions.LOGOUT_SUCCESS,
    };
  },
};

export default actions;
