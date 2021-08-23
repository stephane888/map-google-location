import Vue from "vue";
import Vuex from "vuex";
import utilitie from "./Utilitie";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    configs: utilitie.getConfig(),
    /**
     * Contient les données de localisation choisie par l'utilisateur ou charger à partir de localstorage.
     */
    location: utilitie.getLocation()
  },
  mutations: {
    LOCATION: (state, payload) => {
      state.location = payload;
    },
    UpdateConfig: (state, payload) => {
      console.log("UpdateConfig : ", payload);
      state.configs = payload;
    }
  },
  actions: {
    setLocation({ commit }, payload) {
      localStorage.setItem("wbu-google-location", JSON.stringify(payload));
      commit("LOCATION", payload);
    },
    setUpdateConfig({ commit }, payload) {
      commit("UpdateConfig", payload);
    }
  },
  modules: {}
});
