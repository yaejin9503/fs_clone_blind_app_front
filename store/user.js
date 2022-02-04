export const state = () => ({
  email: null,
  nickname: null,
});
export const mutations = {
  SET_USER(state, { email, nickname, token }) {
    state.email = email;
    state.nickname = nickname;
    if (token) localStorage.setItem("token", token);
  },
  SET_USER_LOGOUT(state) {
    state.email = false;
    localStorage.removeItem("token");
  },
};
export const actions = {};
