import axiosClient from "../config/axiosClient";

const evaluateAPI = {
    findevaluatebyproductid(data) {
        const url = "/evaluate/findevaluatebyproductid";
        return axiosClient.post(url, { productID: data.productID });
    },
    checkisevaluated(data, accessToken) {
        const url = "/evaluate/checkisevaluated";
        return axiosClient.post(url, { evaluateID: data.evaluateID }, { 'header': { 'Authorization': accessToken } });
    },
    changestart(data, accessToken) {
        const url = "/evaluate/changestart/" + data.evaluateID;
        return axiosClient.put(url, { oneStar: data.oneStar, twoStar: data.twoStar, threeStar: data.threeStar, fourStar: data.fourStar, fiveStar: data.fiveStar }, { 'header': { 'Authorization': accessToken } });
    },
};

export default evaluateAPI;