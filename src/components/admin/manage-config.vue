<template>
  <div>
    <section class="border p-4 my-5">
      <h1 class="titre">Configuration de la map</h1>
      <b-form-group label="Selectionner le type de filtre">
        <b-form-radio-group
          v-model="configs.type_filtre.value"
          :options="configs.type_filtre.options"
          stacked
        ></b-form-radio-group>
      </b-form-group>
      <b-form-group label="placeholder">
        <b-form-input v-model="configs.input_placeholder.value"></b-form-input>
      </b-form-group>
      <b-form-group label="Text bouton">
        <b-form-input v-model="configs.input_text_button.value"></b-form-input>
      </b-form-group>
      <b-form-group label="Titre du bloc">
        <b-form-input v-model="configs.titre_map.value"></b-form-input>
      </b-form-group>
      <b-form-group label="Url de la page apres une adresse valide">
        <b-form-input v-model="configs.redirect_true.value"></b-form-input>
      </b-form-group>
      <b-form-group label="Url de la page apres une adresse non valide">
        <b-form-input v-model="configs.redirect_false.value"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Zone valide"
        description="Creer la zone sur http://geojson.io/ et copier coller son contenu JSON, NB: le typde doit etre 'Polygon'"
      >
        <b-form-textarea
          rows="8"
          v-model="configs.zone_valide.value"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group
        label="Villes"
        description="Ajouter les villes separées par des points vigule (;)"
      >
        <b-form-textarea
          rows="8"
          v-model="configs.villes.value"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group
        label="Liste de BP"
        description="Ajouter les BP, un element par ligne"
      >
        <b-form-textarea rows="8" v-model="configs.bps.value"></b-form-textarea>
      </b-form-group>
      <!-- -->
      <pre class="d-none">
          {{ configs }}
      </pre>
    </section>
  </div>
</template>
<script>
import Vue from "vue";
import { mapState } from "vuex";
import {
  FormPlugin,
  FormInputPlugin,
  FormGroupPlugin,
  FormSelectPlugin,
  FormRadioPlugin,
  FormTextareaPlugin,
} from "bootstrap-vue";
Vue.use(FormPlugin);
Vue.use(FormInputPlugin);
Vue.use(FormGroupPlugin);
Vue.use(FormSelectPlugin);
Vue.use(FormRadioPlugin);
Vue.use(FormTextareaPlugin);
export default {
  name: "manage-config",
  data() {
    return {};
  },
  mounted() {},
  watch: {},
  computed: {
    ...mapState(["configs"]),
  },
};
</script>
<style lang="scss" scoped>
@use "./style.scss";
</style>
