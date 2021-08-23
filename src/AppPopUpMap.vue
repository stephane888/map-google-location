<template>
  <mapgoogle
    ref="mapgoogle"
    :configs="configs"
    :etape-checkout="etapeCheckout"
    :action-after="actionAfter"
    @update_location="update_location"
  >
  </mapgoogle>
</template>

<script>
import store from "./store";
import { mapState } from "vuex";
import mapgoogle from "./components/mapgoogle.vue";
export default {
  name: "AppPopUpMap",
  store,
  props: {
    etapeCheckout: {
      type: Boolean,
      required: true
    },
    actionAfter: {
      type: Boolean,
      required: true
    }
  },
  components: {
    mapgoogle
  },
  computed: {
    ...mapState(["configs"])
  },

  methods: {
    openModal() {
      this.$refs.mapgoogle.openPopupMap();
    },
    update_location(l) {
      this.$emit("update_location", l);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./components/scss/micromodal.scss";
</style>
