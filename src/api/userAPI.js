import axiosClient from "../config/axiosClient";

const userAPI = {
  finduserbyid(accessToken) {
    const url = "/user/finduserbyid";
    return axiosClient.post(url, { header: { Authorization: accessToken } });
  },
  updateuser(data, accessToken) {
    const url = "/user/updateuser";
    return axiosClient.put(url, data, {
      header: { Authorization: accessToken },
    });
  },
  changepassword(data, accessToken) {
    const url = "/user/changepassword";
    return axiosClient.post(
      url,
      { oldPassword: data.oldPassword, newPassword: data.newPassword },
      { header: { Authorization: accessToken } }
    );
  },
  finduserbyidincomment(data) {
    const url = "/user/finduserbyidincomment";
    return axiosClient.post(url, { userID: data.userID });
  },
  getalluser() {
    const url = "/user/getalluser";
    return axiosClient.get(url);
  },
  updateuserrole(data, accessToken) {
    const url = "/user/updateuserrole";
    return axiosClient.put(
      url,
      { userID: data.userID, role: data.role },
      { header: { Authorization: accessToken } }
    );
  },
  adminupdateuserpassword(data, accessToken) {
    const url = "/user/adminupdateuserpassword";
    return axiosClient.post(
      url,
      { userID: data.userID, newPassword: data.newPassword },
      { header: { Authorization: accessToken } }
    );
  },
  finduserbynamechar(data, accessToken) {
    const url = "/user/finduserbynamechar";
    return axiosClient.post(
      url,
      { userName: data.userName },
      { header: { Authorization: accessToken } }
    );
  },
};

export default userAPI;
