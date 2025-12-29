// import axios from "axios";

// export const commonAPI = async (httpRequest, url, reqBody) => {
//     const reqConfig = {
//         method: httpRequest,
//         url,
//         data: reqBody
//     };

//     try {
//         const response = await axios(reqConfig);
//         return response;
//     } catch (err) {
//         throw err;   
//     }
// };


import axios from "axios";

export const commonAPI = async (method, url, data = null, headers = {}) => {
  try {
    const response = await axios({
      method,
      url,
      data,      
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    return response;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error; 
  }
};
