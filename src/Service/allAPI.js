

import { commonAPI } from "./commonAPI";
// import { serverURL } from "./serverURL";
import serverURL from "./serverURL";


// Helper to get token header
const authHeader = () => {
  const token = sessionStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};


// -------------------- AUTH APIS --------------------
export const registerAPI = async (reqBody) => {
  return commonAPI("POST", `${serverURL}/register`, reqBody);
};

export const loginAPI = async (reqBody) => {
  return commonAPI("POST", `${serverURL}/login`, reqBody);
};


// -------------------- PICKUP APIS --------------------
const BASE_URL = `${serverURL}/api/pickup`;

// Schedule pickup
export const schedulePickupAPI = async (reqBody) => {
  return await commonAPI(
    "POST",
    `${BASE_URL}/schedule`,
    reqBody,
    authHeader()
  );
};

//  Get LATEST scheduled pickup
export const getPickupAPI = async (userId) => {
  return await commonAPI(
    "GET",
    `${BASE_URL}/latest/${userId}`,
    "",
    authHeader()
  );
};

// Cancel pickup
export const cancelPickupAPI = async (userId) => {
  return await commonAPI(
    "DELETE",
    `${BASE_URL}/cancel/${userId}`,
    "",
    authHeader()
  );
};

// Reschedule pickup
export const reschedulePickupAPI = async (body) => {
  return await commonAPI(
    "PATCH",
    `${BASE_URL}/reschedule`,
    body,
    authHeader()
  );
};

// Pickup History
export const pickupHistoryAPI = async (userId) => {
  return await commonAPI(
    "GET",
    `${BASE_URL}/history/${userId}`,
    "",
    authHeader()
  );
};


//-----Admin ---------------------

export const getAllPickupsAPI = async () => {
  return commonAPI("GET", `${serverURL}/pickup/all`);
};
