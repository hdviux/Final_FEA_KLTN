import axiosClient from "../config/axiosClient";

const commentAPI = {
  addcomment(data, accessToken) {
    const url = "/comment/addcomment";
    return axiosClient.post(
      url,
      { content: data.content, productID: data.productID, star: data.star },
      { header: { Authorization: accessToken } }
    );
  },
  getallcommentproduct(data) {
    const url = "/comment/getallcommentproduct";
    return axiosClient.post(url, { productID: data.productID });
  },
  changevote(data, accessToken) {
    const url = "/comment/changevote/" + data.commentID;
    console.log(1222, url);
    return axiosClient.put(url, { header: { Authorization: accessToken } });
  },
  findcommentbyid(data) {
    const url = "/comment/findcommentbyid";
    return axiosClient.post(url, { commentID: data.commentID });
  },
  deletecomment(data, accessToken) {
    const url = "/comment/deletecomment/" + data.commentID;
    return axiosClient.delete(url, { header: { Authorization: accessToken } });
  },

  findcommentbyusername(data, accessToken) {
    const url = "/comment/findcommentbyusername";
    return axiosClient.post(
      url,
      { userName: data.userName },
      { header: { Authorization: accessToken } }
    );
  },
};

export default commentAPI;
