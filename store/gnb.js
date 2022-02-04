export const state = () => ({
  company: false,
  story: false,
});
export const mutations = {
  OPEN_GNBMENU(state, name) {
    state[name] = true;
  },
  CLOSE_GNBMENU(state, name) {
    state[name] = false;
  },
  CLOSE_ALLMENU(state) {
    (state.company = false), (state.story = false);
  },
};
export const actions = {};
