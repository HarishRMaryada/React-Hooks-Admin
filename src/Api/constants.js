export default {
  // The URL we're connecting to

  //local
  hostname: "http://localhost:8031/api",

  //prod cdn image upload
  cdnHostname: "http://localhost:8032/api/upload/",

  errors: {
    // Defaults
    default: "Hmm, an unknown error occured",
    timeout: "Server Timed Out. Check your internet connection",
    invalidJson: "Response returned is not valid JSON",
    authFailed: "Unauthorized Access"
  },
  endpoints: new Map([
    ["auth", "/oauth/token"],
    ["users", "/users"],
    ["organizations", "/organizations"],
    ["enquires", "/enquires"],
    ["approveEnquiry", "/enquires/approveEnquiry"],
    ["products", "/products"],
    ["productTypes", "/productTypes"],
    ["brands", "/product/brands"],
    ["categories","/categories"]
  ]),
  tokenKey: "auth"
};
