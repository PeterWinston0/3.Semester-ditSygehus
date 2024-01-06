// import Vue from 'vue';
// import Vuex from 'vuex';

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
      // Add fields relevant to the logged-in user
      ssn: '',
      // other user data fields
    }
    // other state properties
  },
  getters: {
    patientData: state => state.patientData,
    loggedInUser: state => state.loggedInUser,
    // other getters
  },
  mutations: {
    updatePatientData(state, payload) {
      state.patientData = { ...state.patientData, ...payload };
    },
    setLoggedInUser(state, userData) {
      state.loggedInUser = userData;
    },
    // other mutations
  },
  actions: {
    updatePatientData({ commit }, payload) {
      commit('updatePatientData', payload);
    },
    setLoggedInUser({ commit }, userData) {
      commit('setLoggedInUser', userData);
    },
    // other actions
  }
  // modules, etc.
});




// import { createStore } from 'vuex';

// export default createStore({
//   state: {
//     patientData: {
//       ssn: '',
//       hospitalId: null,
//       phoneNumber: '',
//       description: '',
//     },
//     // other state properties
//   },
//   getters: {
//     patientData: state => state.patientData,
//     // other getters
//   },
//   mutations: {
//     updatePatientData(state, payload) {
//       state.patientData = { ...state.patientData, ...payload };
//     },
//     setUserData(state, userData) {
//       // Assuming userData contains the SSN and other relevant information
//       if (userData.ssn) {
//         state.patientData.ssn = userData.ssn;
//       }
//       // Include other user data updates here if necessary
//     },
//     // other mutations
//   },
//   actions: {
//     updatePatientData({ commit }, payload) {
//       commit('updatePatientData', payload);
//     },
//     updateUserData({ commit }, userData) {
//       commit('setUserData', userData);
//     },
//     // other actions
//   },
//   // modules, etc.
// });






// import { createStore } from 'vuex';

// export default createStore({
//   state: {
//     patientData: {
//       ssn: '',
//       hospitalId: null,
//       phoneNumber: '',
//       description: '',
//     },
//     // other state properties
//   },
//   getters: {
//     patientData: state => state.patientData,
//     // other getters
//   },
//   mutations: {
//     updatePatientData(state, payload) {
//       state.patientData = { ...state.patientData, ...payload };
//     },
//     // other mutations
//   },
//   actions: {
//     updatePatientData({ commit }, payload) {
//       commit('updatePatientData', payload);
//     },
//     // other actions
//   },
//   // modules, etc.
// });