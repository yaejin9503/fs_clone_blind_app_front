export const state = () => ({
  login: { show: false, directLogin: false },
  signup: { show: false },
});
export const mutations = {
  SET_LOGIN_MODAL_OPEN(state) {
    state.login.show = true;
  },
  SET_LOGIN_MODAL_DIRECT_LOGIN(state) {
    state.login.directLogin = true;
  },
  SET_LOGIN_MODAL_CLOSE(state) {
    (state.login = {
      show: false,
      directLogin: false,
    }),
      (state.signup.show = false);
  },
  SET_SIGHUP_MODAL_OPEN(state) {
    state.signup.show = true;
  },
};
export const actions = {};
