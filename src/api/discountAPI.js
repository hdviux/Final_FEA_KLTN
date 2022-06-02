import axiosClient from "../config/axiosClient";

const discountAPI = {
  creatediscount(data, accessToken) {
    const url = "/discount/creatediscount";
    console.log(123, data);
    return axiosClient.post(
      url,
      {
        productID: data.productID,
        endDate: data.endDate,
        percent: data.percent,
      },
      { header: { Authorization: accessToken } }
    );
  },
  checkdiscount(data) {
    const url = "/discount/checkdiscount";
    return axiosClient.post(url, {
      productID: data.productID,
    });
  },
  updatediscount(data) {
    const url = "/discount/updatediscount";
    return axiosClient.put(url, data);
  },
  deletediscount(data) {
    console.log(123, data);
    const url = "/discount/deletediscount";
    return axiosClient.post(url, {
      productID: data.productID,
    });
  },
  finddiscount(data) {
    const url = "/discount/finddiscount";
    return axiosClient.post(url, {
      productID: data.productID,
    });
  },
};

export default discountAPI;
