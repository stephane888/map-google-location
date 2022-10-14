<template>
  <div>
    <div class="google-place">
      <div class="input-group mb-2">
        <input
          :id="id_html"
          class="form-control"
          type="text"
          :placeholder="configs.input_placeholder.value"
          v-model="current_address"
        />
        <div class="input-group-prepend">
          <button
            class="input-group-text ui-datepicker-trigger"
            @click="trigger_action_map"
          >
            {{ configs.input_text_button.value }}
          </button>
        </div>
      </div>
    </div>
    <div>
      <mapgoogle ref="mapgoogle" :configs="configs"> </mapgoogle>
    </div>
  </div>
</template>

<script>
import config from "./config.js";
import mapgoogle from "./mapgoogle.vue";

export default {
  name: "Googleplace",
  props: {
    configs: {
      type: Object,
      required: true,
    },
  },
  components: {
    mapgoogle,
  },
  data: function () {
    return {
      id_html: "id_googleplace",
      current_address: "",
      valide_text: "Je commande !",
      placeholder: "Entrez votre adresse",
      ville: "Toulouse",
      GoogleObejct: null,
    };
  },
  mounted: function () {
    this.createGoogleObject();
  },
  methods: {
    /**
     * On charge la map
     */
    createGoogleObject() {
      config.createGoogleObject().then((google) => {
        this.GoogleObejct = google;
        this.getPlace();
      });
    },
    trigger_action_map() {
      this.$refs.mapgoogle.openPopupMap();
    },
    getPlace() {
      var self = this;
      /**
       * pour obtenir les coordonnÃ©es
       * https://www.mapcoordinates.net/fr
       */
      var input = document.querySelector("#" + this.id_html);
      this.options = {
        componentRestrictions: { country: ["fr"] },
        types: ["address"],
        strictBounds: true,
      };
      const autocomplete = new this.GoogleObejct.maps.places.Autocomplete(
        input,
        this.options
      );
      this.GoogleObejct.maps.event.addListener(
        autocomplete,
        "place_changed",
        function () {
          var place = autocomplete.getPlace();
          if (place.geometry) {
            self.current_address = place.formatted_address;
            self.ville = place.vicinity;
            self.$refs.mapgoogle.current_address = place.formatted_address;
            self.$refs.mapgoogle.lat = place.geometry.location.lat();
            self.$refs.mapgoogle.lon = place.geometry.location.lng();
            //ouverure du popup;
            self.$refs.mapgoogle.openPopupMap();
            //mise à jour de la map.
            self.$refs.mapgoogle.updateMap(place);
          }
        }
      );
    },
  },
};
</script>
