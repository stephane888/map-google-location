import { Loader } from "@googlemaps/js-api-loader";
export default {
  apiKey: "AIzaSyDurloZ0-xj8CNrQwkeSc53A-_n35Xji2Y",
  GoogleObejct: null,
  /**
   * On charge la map
   */
  createGoogleObject() {
    const loader = new Loader({
      apiKey: this.apiKey,
      version: "weekly",
      libraries: ["places", "geometry"],
    });
    return new Promise((resolv) => {
      loader
        .load()
        .then((google) => {
          this.GoogleObejct = google;
          resolv(google);
        })
        .catch((e) => {
          console.log("Erreur initialisation de la MAP : ", e);
        });
    });
  },
  extractPathForPolygon(geoString) {
    const geojson = JSON.parse(geoString);
    const points = [];
    if (
      geojson.features &&
      geojson.features[0] &&
      geojson.features[0].geometry &&
      geojson.features[0].geometry.coordinates
    ) {
      for (const i in geojson.features[0].geometry.coordinates[0]) {
        const point = geojson.features[0].geometry.coordinates[0][i];
        points.push({ lat: point[1], lng: point[0] });
      }
    }
    return points;
  },
  /**
   * Permet de slpit and trim chaque elment;
   * @param {*} string
   */
  convertNewLineToArray(string, serach = "\n") {
    return string.split(serach).map((item) => item.trim());
  },
};
