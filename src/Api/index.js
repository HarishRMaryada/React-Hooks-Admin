import APIConfig from "./constants";
import store from "../Store/store";

const ErrorMessages = APIConfig.errors;
const ENDPOINTS = APIConfig.endpoints;
const HOSTNAME = APIConfig.hostname;

//error handler
function handleError(err) {
  let error = "";
  if (typeof err === "string") error = err;
  else if (err && err.message) error = err.message;

  if (!error) error = ErrorMessages.default;
  return error;
}

/* Create the API Export ==================================================================== */
/**
 * Build services from Endpoints
 * - So we can call AppAPI.recipes.get() for example
 */

const AppAPI = {
  handleError
};

ENDPOINTS.forEach((endpoint, key) => {
  AppAPI[key] = {
    get: (params, payload) => fetcher("GET", endpoint, params, payload),
    post: (params, payload) => fetcher("POST", endpoint, params, payload),
    patch: (params, payload) => fetcher("PATCH", endpoint, params, payload),
    put: (params, payload) => fetcher("PUT", endpoint, params, payload),
    delete: (params, payload) => fetcher("DELETE", endpoint, params, payload)
  };
});

// Number each API request (used for debugging)
let requestCounter = 0;
let USER_AGENT;
try {
  // Build user agent string
  //TODO: Replace which actual device information
  USER_AGENT = "user_agent";
} catch (e) {
  USER_AGENT = `${APIConfig.appName}`;
}

const DEBUG_MODE = APIConfig.DEV;

/*===================================================================================================== */
/*====================================Fetcher Method()====== ========================================== */
/*===================================================================================================== */

function fetcher(method, inputEndpoint, inputParams, body) {
  let endpoint = inputEndpoint;
  const params = inputParams;

  return new Promise(async (resolve, reject) => {
    requestCounter += 1;
    const requestNum = requestCounter;

    // After x seconds, let's call it a day!
    const timeoutAfter = 7;
    const apiTimedOut = setTimeout(
      () => reject(ErrorMessages.timeout),
      timeoutAfter * 1000
    );

    if (!method || !endpoint) return reject("Missing params (AppAPI.fetcher).");

    // Build request
    const req = {
      method: method.toUpperCase(),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": USER_AGENT
      }
    };

    if (endpoint !== APIConfig.endpoints.get(APIConfig.tokenKey)) {
      let accessToken = store.getState().auth.tokenValue;
      if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    console.log(req);

    let urlParams = "";
    if (params) {
      // Object - eg. /recipes?title=this&cat=2
      if (typeof params === "object") {
        // Replace matching params in API routes eg. /recipes/{param}/foo
        Object.keys(params).forEach(param => {
          if (endpoint.includes(`{${param}}`)) {
            endpoint = endpoint.split(`{${param}}`).join(params[param]);
            delete params[param];
          }
        });

        // Check if there's still an 'id' prop, /{id}?
        if (params.id !== undefined) {
          if (typeof params.id === "string" || typeof params.id === "number") {
            urlParams = `/${params.id}`;
            delete params.id;
          }
        }

        // Add the rest of the params as a query string
        urlParams = `?${serialize(params)}`;

        // String or Number - eg. /recipes/23
      } else if (typeof params === "string" || typeof params === "number") {
        urlParams = `/${params}`;

        // Something else? Just log an error
      } else {
        debug(
          "You provided params, but it wasn't an object!",
          HOSTNAME + endpoint + urlParams
        );
      }
    }

    // Add Body
    if (body) {
      req.body = JSON.stringify(body);
      console.log("body:", req.body);
    }

    const thisUrl = HOSTNAME + endpoint + urlParams;
    debug("", `API Request #${requestNum} to ${thisUrl}`);

    // Make the request
    return fetch(thisUrl, req)
      .then(async rawRes => {
        console.log(rawRes);
        clearTimeout(apiTimedOut);

        let jsonRes = {};

        try {
          jsonRes = await rawRes.json();
        } catch (error) {
          let ErrorMessagesObj = { message: ErrorMessages.invalidJson };
          throw ErrorMessagesObj;
        }
        // Only continue if the header is successful
        if (rawRes && rawRes.status === 200) {
          return jsonRes;
        }
        throw jsonRes;
      })
      .then(res => {
        clearTimeout(apiTimedOut);
        debug(res, `API Response #${requestNum} from ${thisUrl}`);
        if (res.success) {
          console.log(res);
          return resolve(res.data);
        } else {
          let error = res.error ? res.error.message : "Internal Server Error";
          return reject(new Error(error));
        }
      })
      .catch(err => {
        clearTimeout(apiTimedOut);
        debug(err, HOSTNAME + endpoint + urlParams);
        return reject(err);
      });
  });
}
/*===================================================================================================== */
/*====================================Fetcher Method()====== ========================================== */
/*===================================================================================================== */

/**
 * Convert param object into query string
 * eg.
 *   {foo: 'hi there', bar: { blah: 123, quux: [1, 2, 3] }}
 *   foo=hi there&bar[blah]=123&bar[quux][0]=1&bar[quux][1]=2&bar[quux][2]=3
 */
function serialize(obj, prefix) {
  const str = [];

  Object.keys(obj).forEach(p => {
    const k = prefix ? `${prefix}[${p}]` : p;
    const v = obj[p];

    str.push(
      v !== null && typeof v === "object"
        ? serialize(v, k)
        : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
    );
  });

  return str.join("&");
}

//debug

function debug(str, title) {
  if (DEBUG_MODE && (title || str)) {
    if (title) {
      console.log(`=== DEBUG: ${title} ===========================`);
    }
    if (str) {
      console.log(str);
      console.log("%c ...", "color: #CCC");
    }
  }
}

export default AppAPI;
