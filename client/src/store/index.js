import { createStore } from 'vuex';

export default createStore({
  state: {
    patientData: {
      ssn: '',
      hospitalId: null,
      phoneNumber: '',
      description: '',
    },
    loggedInUser: {
      
      ssn: '',
      
    }
    
  },
  getters: {
    patientData: state => state.patientData,
    loggedInUser: state => state.loggedInUser,
    
  },
  mutations: {
    updatePatientData(state, payload) {
      state.patientData = { ...state.patientData, ...payload };
    },
    setLoggedInUser(state, userData) {
      state.loggedInUser = userData;
    },
    
  },
  actions: {
    updatePatientData({ commit }, payload) {
      commit('updatePatientData', payload);
    },
    setLoggedInUser({ commit }, userData) {
      commit('setLoggedInUser', userData);
    },
    
  }
});


