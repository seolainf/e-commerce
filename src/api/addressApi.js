import axiosClient from "./axiosClient";

const addressApi = {
  getCities: (params) => {
    const url = "?depth=2";
    return axiosClient.get(url, { params });
  },

  getDistricts: (code) => {
    const url = `/p/${code}?depth=2`;
    return axiosClient.get(url);
  },
  getCommunes: (code) => {
    const url = `/d/${code}?depth=2`;
    return axiosClient.get(url);
  },
};
export default addressApi;
