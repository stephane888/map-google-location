<template>
  <div id="app">
    <div class="container-map-localisation">
      <h1>Localisation google</h1>
      <googleplace :configs="configs" />
    </div>
    <div>
      <manager-config />
    </div>
  </div>
</template>
<script>
import googleplace from "./components/googleplace.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
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
