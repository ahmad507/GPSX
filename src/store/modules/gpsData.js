// import axios from "axios";

// const state = {
//     gpsData: []
// };
// const getters = {
//     allGpsData: state => state.gpsData
// };
// const actions = {
//     async getGpsData({ commit }) {
//         console.log('Loading Data')
//         const response = await axios.get('http://gps.test/api/tracking');
//         console.log(response.data);
//         commit('setDataGps', response.data);
//     }
// };
// const mutations = {
//     setDataGps: (state, gpsData) => (state.gpsData = gpsData.data)
// };

// export default {
//     namespaced: true,
//     state,
//     getters,
//     actions,
//     mutations
// }

