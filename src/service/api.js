const BASE_URL = "";

export const api = async (url, method, body = null, headers = {}) => {
    //console.log("body:"+JSON.stringify(body));
    //console.log("header:"+JSON.stringify(headers));
    
    
    
    try {
      const endPoint = BASE_URL.concat(url);
      console.log("endPoint"+endPoint);
      const reqBody = body ? JSON.stringify(body) : null;
      console.log("reqBody"+reqBody);
      const fetchParams = {method, headers};
       //console.log("fetch"+JSON.stringify(fetchParams));
      if((method === "POST" || method === "PUT") && !reqBody) {
          throw new Error("Request body required");
      }

      if(reqBody) {
          //console.log(headers);
          fetchParams.headers["Content-type"] = "application/json";
          fetchParams.body = reqBody;
      }

      const fetchPromise = fetch(endPoint, fetchParams);
      const timeOutPromise = new Promise((resolve, reject) => {
          setTimeout(() => {
              reject("Request Timeout");
          }, 3000);
      });

      const response = await Promise.race([fetchPromise, timeOutPromise]);
    //   console.log("res"+response.body);
      return response;
    } catch (e) {
      return e;
    }
}

export const fetchApi = async (url, method,  statusCode, token = null, loader = false) => {
    try {
        const headers = {}
        const result = {
            token: null,
            success: false,
            responseBody: null
        };
        if(token) {
            headers["x-auth"] = token;
        }

        const response = await api(url, method, headers);

        //console.log("res"+response.body);
        // console.log("status"+response.status)
         console.log("out :"+response);
        if(response.status === statusCode) {
            console.log("in");
            result.success = true;

            if(response.headers.get("x-auth")) {
                result.token = response.headers.get("x-auth");
            }

            let responseBody;
            
            const responseText = await JSON.stringify(response.body);
            
            try {
                responseBody = JSON.parse(responseText);
            } catch (e) {
                responseBody = responseText;
            }

            result.responseBody = responseBody;
            return result;

        }

        let errorBody;
        const errorText = await JSON.stringify(response);

        try {
            errorBody = JSON.parse(errorText);
        } catch (e) {
            errorBody = errorText;
        }

        result.responseBody = errorBody;

        // console.log(result);

        throw result;
    } catch (error) {
        return error;
    }
}
