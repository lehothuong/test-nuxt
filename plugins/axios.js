import https from "https";

export default function({ $axios, store, app, $auth }) {
  $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
  $axios.defaults.headers.patch["Content-Type"] = "application/json";
}
