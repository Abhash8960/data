import axios from "axios"

export function callRequest(method, url, auth, data = "") {
    try {
      if (auth) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `${localStorage.getItem("token")}`;
      }

      return new Promise((resolve, reject) => {
        axios({
          method: method,
          url: url,
          data: data,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {              
              reject(error);
          });
      });
    } catch (e) {
      console.log("Call Request Error:", e);
    }
  }