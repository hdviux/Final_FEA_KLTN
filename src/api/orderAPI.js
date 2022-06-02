import axiosClient from "../config/axiosClient";

const orderAPI = {
  addorder(accessToken) {
    const url = "/order/addorder";
    return axiosClient.post(url, { header: { Authorization: accessToken } });
  },
  addorderdetail(data, accessToken) {
    const url = "/orderdetail/addorderdetail";
    return axiosClient.post(
      url,
      {
        quantity: data.quantity,
        cartID: data.cartID,
        productID: data.productID,
        orderID: data.orderID,
      },
      { header: { Authorization: accessToken } }
    );
  },
  sendemailorder(data, accessToken) {
    const url = "/order/sendemailorder";
    return axiosClient.post(
      url,
      { orderID: data.orderID, pay: data.pay },
      { header: { Authorization: accessToken } }
    );
  },
  getallorderbyuserid(accessToken) {
    const url = "/order/getallorderbyuserid";
    return axiosClient.post(url, { header: { Authorization: accessToken } });
  },
  getallorderdetailbyorderid(data, accessToken) {
    const url = "/orderdetail/getallorderdetailbyorderid";
    return axiosClient.post(
      url,
      { orderID: data.orderID },
      { header: { Authorization: accessToken } }
    );
  },
  getallorderbystatus(data, accessToken) {
    const url = "/order/getallorderbystatus";
    return axiosClient.post(
      url,
      { orderStatus: data.orderStatus },
      { header: { Authorization: accessToken } }
    );
  },
  updateorderstatus(data, accessToken) {
    const url = "/order/updateorderstatus/" + data.orderID;
    return axiosClient.put(
      url,
      { orderStatus: data.orderStatus },
      { header: { Authorization: accessToken } }
    );
  },
  getcountproductpurchsed(data) {
    const url = "/orderdetail/getcountproductpurchsed";
    return axiosClient.post(url, { productID: data.productID });
  },
  getcountorderproduct(data) {
    const url = "/orderdetail/getcountorderproduct";
    return axiosClient.post(url, { productID: data.productID });
  },
  getallorder() {
    const url = "/order/getallorder";
    return axiosClient.get(url);
  },
  deleteorderdetail(data, accessToken) {
    const url = "/orderdetail/deleteorderdetail/" + data.orderDetailID;
    return axiosClient.delete(url, { header: { Authorization: accessToken } });
  },
  getcosteachuser(accessToken) {
    const url = "/order/getcosteachuser";
    return axiosClient.post(url, { header: { Authorization: accessToken } });
  },
  getorderbystatus(data) {
    const url = "/order/getorderbystatus";
    return axiosClient.post(url, { orderStatus: data.orderStatus });
  },
  getchart(data) {
    console.log(data);
    const url = "/order/getchart";
    return axiosClient.post(url, { month: data.month, year: data.year });
  },
};

export default orderAPI;
