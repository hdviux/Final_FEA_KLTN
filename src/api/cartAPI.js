import axiosClient from "../config/axiosClient";

const cartAPI = {
    findcartbyuserid(accessToken) {
        const url = "/cart/findcartbyuserid";
        return axiosClient.post(url, { 'header': { 'Authorization': accessToken } });
    },
    findcartbyproductname(data, accessToken) {
        const url = "/cart/findcartbyproductname";
        return axiosClient.post(url, { productName: data.productName }, { 'header': { 'Authorization': accessToken } });
    },
    deletecart(data, accessToken) {
        const url = "/cart/deletecart/" + data.cartID;
        console.log(url);
        return axiosClient.delete(url, { 'header': { 'Authorization': accessToken } });
    },
    findcartbyid(data, accessToken) {
        const url = "/cart/findcartbyid";
        return axiosClient.post(url, { cartID: data.cartID }, { 'header': { 'Authorization': accessToken } });
    },
    findcartbyproductid(data) {
        const url = "/cart/findcartbyproductid";
        return axiosClient.post(url, { productID: data.productID, userID: data.userID });
    },
    addcart(data, accessToken) {
        const url = "/cart/addcart";
        return axiosClient.post(url, { productID: data.productID, quantity: data.quantity }, { 'header': { 'Authorization': accessToken } });
    },
    updatecart(data, accessToken) {
        const url = "/cart/updatecart/" + data._id;
        return axiosClient.put(url, data, { 'header': { 'Authorization': accessToken } });
    },
    addquantity(data, accessToken) {
        const url = "/cart/addquantity/" + data._id;
        return axiosClient.put(url, data, { 'header': { 'Authorization': accessToken } });
    },
    removequantity(data, accessToken) {
        const url = "/cart/removequantity/" + data._id;
        return axiosClient.put(url, data, { 'header': { 'Authorization': accessToken } });
    },
};

export default cartAPI;
