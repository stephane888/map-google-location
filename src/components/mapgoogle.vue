<!--
    S'ouvre par defaut dans une popup.
-->
<template>
  <div>
    <!-- https://micromodal.vercel.app/ -->
    <section class="modal micromodal-slide" id="map-popup-wbu">
      <div class="modal__overlay">
        <div
          class="modal__container"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-1-title"
        >
          <header class="modal__header">
            <h2 class="modal__title" id="modal-1-title">
              {{ titre_popup }}
            </h2>
            <a
              href="#"
              class="modal__close"
              rel="modal:close"
              @click="micromodal.close('map-popup-wbu')"
            ></a>
          </header>
          <main class="modal__content" id="modal-1-content">
            <div class="m-0 p-0 container-map">
              <div id="map-display-wbu"></div>
              <div class="text-over-lay">
                <input
                  class="form-control"
                  type="text"
                  v-model="current_address"
                  :placeholder="placeholder"
                  id="map-input-over"
                />
              </div>
              <div class="center-marker"></div>
              <div class="address-confirm">
                <button
                  class="btn btn-lg bg-cl1"
                  @click="save_localisation_cookie"
                >
                  Confirmer l'adresse
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const villes = [];
const list_box = [];
import config from "./config.js";
//import modalLite from "modal-lite";
import micromodal from "micromodal";

//import axios from "axios";
export default {
  name: "mapgoogle",
  props: {
    datas: [Object, Array, String, Number],
    display_marker: { type: Boolean, default: true },
    image: { type: String, default: "/localisation/img/marker.png" },
    url_good: { type: String, default: "/cart" },
    url_bad: { type: String, default: "/pages/map-error" },
  },
  data() {
    return {
      id_html: "map-google-field",
      villes: villes,
      list_box: list_box,
      micromodal: micromodal,
      map: null,
      lat: 45.7941459,
      lon: 4.68941940000002,
      point_in_polygon: false,
      point_in_ville: false,
      point_in_box: false,
      titre_popup: "Merci de confirmer votre adresse",
      current_address: "",
      valide_text: "Commander maintenant",
      placeholder: "Entrez votre adresse",
    };
  },
  mounted() {
    this.point_in_box = false;
    this.point_in_polygon = false;
    this.point_in_ville = false;
    this.createGoogleObject();
  },
  methods: {
    openPopupMap() {
      this.micromodal.show("map-popup-wbu");
    },
    closePopupMap() {
      this.micromodal.close("map-popup-wbu");
    },
    /**
     * On charge la map
     */
    createGoogleObject() {
      config.createGoogleObject().then((google) => {
        this.GoogleObejct = google;
        this.getPlace();
        this.initMap();
        this.geocoder = new this.GoogleObejct.maps.Geocoder();
      });
    },
    /**
     * Permet d'ajouter la recherche de ville sur le champs qui est rattaché.
     */
    getPlace() {
      var self = this;
      /**
       * Pour obtenir les coordonnées
       * https://www.mapcoordinates.net/fr
       */
      var input = document.querySelector("#map-input-over");
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

          if (place && place.formatted_address) {
            self.current_address = place.formatted_address;
            self.city_on_map = place.vicinity;
            self.updateMap(place);
            self.openPopupMap();
          }
        }
      );
    },
    initMap() {
      var self = this;
      var lat = this.lat;
      var lon = this.lon;
      // CrÃ©er l'objet "map" et l'insÃ¨rer dans l'Ã©lÃ©ment HTML qui a l'ID "map"
      this.map = new this.GoogleObejct.maps.Map(
        document.getElementById("map-display-wbu"),
        {
          // Nous plaÃ§ons le centre de la carte avec les coordonnÃ©es ci-dessus
          center: new this.GoogleObejct.maps.LatLng(lat, lon),
          // Nous dÃ©finissons le zoom par dÃ©faut
          zoom: 17,
          // Nous dÃ©finissons le type de carte (ici carte routiÃ¨re)
          mapTypeId: this.GoogleObejct.maps.MapTypeId.ROADMAP,
          // Nous activons les options de contrÃ´le de la carte (plan, satellite...)
          mapTypeControl: false,
          // Nous dÃ©sactivons la roulette de souris
          scrollwheel: false,

          mapTypeControlOptions: {
            // Cette option sert Ã  dÃ©finir comment les options se placent
            style: this.GoogleObejct.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          },

          // Activation des options de navigation dans la carte (zoom...)
          navigationControl: false,
          panControl: false,
          zoomControl: true,
          streetViewControl: false,
          fullscreenControl: false,

          navigationControlOptions: {
            // Comment ces options doivent-elles s'afficher
            style: this.GoogleObejct.maps.NavigationControlStyle.ZOOM_PAN,
          },
          styles: [
            //desactive les localisations.
            /*
          	{
              featureType: 'poi',
              elementType: 'labels.icon',
              stylers: [
                {visibility: 'off'}
              ]
            },
            */
            // couleur du texte.
            /*
          	{
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [
              	{color: '#ffffff'}
              ]
            },
            */
            {
              featureType: "poi",
              elementType: "labels.text.stroke",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "landscape.natural",
              elementType: "geometry",
              stylers: [{ color: "#b8cb92" }],
            },
            {
              featureType: "landscape.man_made",
              elementType: "geometry",
              stylers: [{ color: "#ece2d9" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        }
      );
      this.setMarker();
      this.map.addListener("dragend", function () {
        window.setTimeout(function () {
          var centerPosition = self.map.getCenter();
          if (centerPosition) {
            self.lat = centerPosition.lat();
            self.lon = centerPosition.lng();
            self.city_on_map = "";

            self.obtenir_address_proche();
          }
        }, 1000);
      });
      this.buildpolygon();
      this.valide_selection();
    },
    updateMap: function (place) {
      if (place.geometry) {
        this.map.panTo(place.geometry.location);
        this.lat = place.geometry.location.lat();
        this.lon = place.geometry.location.lng();
        this.setMarker();
        this.valide_selection();
      }
    },
    valide_selection() {
      this.check_if_new_adress_in_polygon();
      this.check_if_new_adress_in_villes();
      this.check_if_new_adress_in_box();
    },
    obtenir_address_proche() {
      var self = this;
      var latlng = new this.GoogleObejct.maps.LatLng(this.lat, this.lon);
      this.geocoder.geocode({ location: latlng }, function (results, status) {
        if (status == "OK") {
          self.current_address = results[0].formatted_address;
          self.updateMap(results[0]);
          self.getNameVilleFromPlace(results[0]);
        }
      });
    },
    setMarker() {
      if (!this.display_marker) {
        return false;
      }
      var self = this;
      var lat = this.lat;
      var lon = this.lon;
      // Nous ajoutons un marqueur
      this.marker = new this.GoogleObejct.maps.Marker({
        position: { lat: lat, lng: lon },
        map: self.map,
        icon: this.image,
      });
    },
    save_localisation_cookie() {
      if (this.current_address == "") {
        localStorage.removeItem("wbu_localisation_map");
        alert("Vous devez definir une adresse");
        return false;
      }
      if (this.point_in_polygon && this.point_in_ville && this.point_in_box) {
        localStorage.setItem(
          "wbu_localisation_map",
          JSON.stringify(this.current_address)
        );
        localStorage.setItem(
          "wbu_localisation_city",
          JSON.stringify(this.city_on_map)
        );
        localStorage.setItem("wbu_locality", this.locality);
        localStorage.setItem("wbu_route", this.route);
        // IMPORTANT;
        //$(document).trigger("adresseUpdate");
        alert("trigger adresseUpdate 1 ");
        if (!this.etape_checkout) {
          window.location.href = this.url_good;
        } else {
          document.querySelector(".modal__close").click();
          if (!this.no_action_after) {
            document.querySelector(".button.cart-checkout-custom").click();
          }
        }
      } else {
        localStorage.removeItem("wbu_localisation_map");
        localStorage.removeItem("wbu_localisation_city");
        // IMPORANT;
        //$(document).trigger("adresseUpdate");
        alert("trigger adresseUpdate 2 ");
        window.location.href = this.url_bad;
      }
    },
    buildpolygon() {
      this.polygon = new this.GoogleObejct.maps.Polygon({
        path: config.points,
        geodesic: true,
        strokeColor: "#48a0d9",
        strokeOpacity: 0.4,
        strokeWeight: 4,
        fillColor: "#48a0d9",
        fillOpacity: 0.03,
      });
      this.polygon.setMap(this.map);
    },
    check_if_new_adress_in_polygon() {
      var latLng = new this.GoogleObejct.maps.LatLng(this.lat, this.lon);
      if (
        this.GoogleObejct.maps.geometry.poly.containsLocation(
          latLng,
          this.polygon
        )
      ) {
        this.point_in_polygon = true;
      } else {
        this.point_in_polygon = false;
      }
    },
    check_if_new_adress_in_villes() {
      const ville_in_name = () => {
        var view = false;
        if (this.current_address && this.current_address.length > 0) {
          var ar_ville = this.current_address.split(",");
          if (ar_ville[1].length > 0) {
            this.villes.forEach((ville) => {
              if (ar_ville[1].indexOf(ville) >= 0) {
                view = true;
              }
            });
          }
        }
        return view;
      };
      //Check if is valide
      if (this.type_limitation != "polygon_ville") {
        this.point_in_ville = true;
        return false;
      }
      if (this.villes.indexOf(this.city_on_map) >= 0) {
        this.point_in_ville = true;
        return true;
      } else if (ville_in_name()) {
        this.point_in_ville = true;
        return true;
      } else {
        this.point_in_ville = false;
      }
    },
    /**
     * -
     */
    check_if_new_adress_in_box() {
      const ville_in_box = () => {
        var view = false;
        if (this.current_address && this.current_address.length > 0) {
          if (this.current_address) {
            this.list_box.forEach((box) => {
              if (this.current_address.indexOf(box) >= 0) {
                view = true;
              }
            });
          }
        }
        return view;
      };
      if (this.type_limitation != "polygon_box") {
        this.point_in_box = true;
        return false;
      }
      if (ville_in_box()) {
        this.point_in_box = true;
        return true;
      } else {
        this.point_in_box = false;
        return true;
      }
    },
    /**
     * -
     */
    getNameVilleFromPlace: function (place) {
      var route = "";
      var locality = "";
      if (place.address_components) {
        for (const i in place.address_components) {
          var components = place.address_components[i];
          if (
            components.types &&
            components.types.includes("locality") &&
            locality == ""
          ) {
            locality = components.long_name;
          }
          if (
            components.types &&
            components.types.includes("route") &&
            route == ""
          ) {
            route = components.long_name;
          }
        }
        this.route = route;
        this.locality = locality;
      }
    },
  },
};
</script>
