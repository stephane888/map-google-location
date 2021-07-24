import { Loader } from "@googlemaps/js-api-loader";
//console.log('no window');
var geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [2.316741943359375, 48.98832818524669],
            [2.2103118896484375, 48.96985075314792],
            [2.0743560791015625, 48.86290791986464],
            [2.09564208984375, 48.766599348667675],
            [2.204132080078125, 48.69730575091258],
            [2.4121856689453125, 48.65604661485727],
            [2.5419616699218746, 48.733549609837404],
            [2.6126861572265625, 48.83670138083755],
            [2.5577545166015625, 48.95271921169069],
            [2.4272918701171875, 48.99959155051177],
            [2.316741943359375, 48.98832818524669],
          ],
        ],
      },
    },
  ],
};

var points = [];
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

export default {
  points: points,
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
