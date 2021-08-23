<template>
  <manageConfig> </manageConfig>
</template>

<script>
import store from "./store";
import manageConfig from "./components/admin/manage-config.vue";
export default {
  name: "AppManageApiGoogle",
  store,
  components: {
    manageConfig,
  },
};
</script>

<style lang="scss" scoped>
@import "./components/scss/micromodal.scss";
</style>
