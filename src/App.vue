<template>
  <div id="app">
    <div class="container-map-localisation">
      <h1>Localisation google</h1>
      <googleplace></googleplace>
      <div id="mapGoogleLocalisation" class="map-localisation-wbu">
        <mapgoogle
          :image="asset_url"
          :url_good="url_good"
          :url_bad="url_bad"
        ></mapgoogle>
      </div>
    </div>
  </div>
</template>

<script>
import mapgoogle from "./components/mapgoogle.vue";
import googleplace from "./components/googleplace.vue";

export default {
  name: "App",
  components: {
    //mapgoogle: () => import("./components/mapgoogle.vue"),
    mapgoogle,
    googleplace,
  },
  data() {
    return {
      asset_url: "",
      url_good: "",
      url_bad: "",
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
