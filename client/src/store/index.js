import { createStore } from 'vuex';

export default createStore({
  state: {
    patientData: {
      ssn: '',
      hospitalId: null,
      phoneNumber: '',
      description: '',
    },
    // other state properties
  },
  getters: {
    patientData: state => state.patientData,
    // other getters
  },
  mutations: {
    updatePatientData(state, payload) {
      state.patientData = { ...state.patientData, ...payload };
    },
    // other mutations
  },
  actions: {
    updatePatientData({ commit }, payload) {
      commit('updatePatientData', payload);
    },
    // other actions
  },
  // modules, etc.
});