import axiosClient from "../config/axiosClient";

const categoryAPI = {
  getallcategory() {
    const url = "/category/getallcategory";
    return axiosClient.get(url);
  },
  findcategorybyname(data) {
    const url = "/category/findcategorybyname";
    return axiosClient.post(url, { categoryName: data.categoryName });
  },
  findcategorybyid(data) {
    const url = "/category/findcategorybyid";
    return axiosClient.post(url, { categoryID: data.categoryID });
  },
  addcategory(data, accessToken) {
    const url = "/category/addcategory";
    return axiosClient.post(
      url,
      { categoryName: data.categoryName },
      { header: { Authorization: accessToken } }
    );
  },
  updatecategory(data, accessToken) {
    const url = "/category/updatecategory/" + data.categoryID;
    return axiosClient.put(url, data, {
      header: { Authorization: accessToken },
    });
  },
  deletecategory(data, accessToken) {
    const url = "/category/deletecategory/" + data.categoryID;
    return axiosClient.delete(url, {
      header: { Authorization: accessToken },
    });
  },

  findcategorybynamechar(data, accessToken) {
    const url = "/category/findcategorybynamechar";
    return axiosClient.post(
      url,
      { categoryName: data.categoryName },
      {
        header: { Authorization: accessToken },
      }
    );
  },

  chartcategory(accessToken) {
    const url = "/category/chartcategory";
    return axiosClient.post(url, {
      header: { Authorization: accessToken },
    });
  },
};

export default categoryAPI;
