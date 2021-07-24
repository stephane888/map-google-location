<template>
  <div id="app">
    <div class="container-map-localisation">
      <h1>Localisation google</h1>
      <googleplace :configs="configs"></googleplace>
      <div id="mapGoogleLocalisation" class="map-localisation-wbu">
        <mapgoogle :configs="configs"></mapgoogle>
      </div>
    </div>
    <div>
      <manager-config></manager-config>
    </div>
  </div>
</template>

<script>
import mapgoogle from "./components/mapgoogle.vue";
import googleplace from "./components/googleplace.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    //mapgoogle: () => import("./components/mapgoogle.vue"),
    mapgoogle,
    googleplace,
    managerConfig: () => import("./components/admin/manage-config.vue"),
  },
  data() {
    return {
      asset_url: "",
      url_good: "",
      url_bad: "",
    };
  },
  computed: {
    ...mapState(["configs"]),
  },
};
</script>

<style lang="scss" scoped>
@import "./components/scss/micromodal.scss";
@import "./components/scss/google-place.scss";
</style>
