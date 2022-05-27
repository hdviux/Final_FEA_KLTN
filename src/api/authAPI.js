import axiosClient from "../config/axiosClient";

const authAPI = {
  signinbyemail(data) {
    const url = "/auth/signinbyemail";
    return axiosClient.post(url, {
      email: data.email,
      password: data.password,
    });
  },
  signinbyphone(data) {
    const url = "/auth/signinbyphone";
    return axiosClient.post(url, {
      phone: data.phone,
      password: data.password,
    });
  },
  logout(data) {
    const url = "/auth/logout";
    return axiosClient.post(url, { refreshToken: data.refreshToken });
  },
  refreshtoken(data) {
    const url = "/auth/refreshToken";
    return axiosClient.post(url, { refreshToken: data.refreshToken });
  },
  checkphone(data) {
    const url = "/auth/checkphone";
    return axiosClient.post(url, { phone: data.phone });
  },
  checkemail(data) {
    const url = "/auth/checkemail";
    return axiosClient.post(url, { email: data.email });
  },
  sendotpphone(data) {
    const url = "/auth/sendotpphone";
    return axiosClient.post(url, { phone: data.phone });
  },
  verifyotpphone(data) {
    const url = "/auth/verifyotpphone";
    return axiosClient.post(url, { phone: data.phone, code: data.code });
  },
  sendverifyemail(data) {
    const url = "/auth/sendverifyemail";
    return axiosClient.post(url, { email: data.email });
  },
  signupbyphone(data) {
    const url = "/auth/signupbyphone";
    return axiosClient.post(url, {
      fullName: data.fullName,
      userName: data.userName,
      phone: data.phone,
      password: data.password,
    });
  },
  forgetpassword(data) {
    const url = "/auth/forgetpassword";
    return axiosClient.post(url, {
      emailPhone: data.emailPhone,
      newPassword: data.newPassword,
    });
  },
  checkverifyemail(data) {
    const url = "/auth/checkverifyemail";
    return axiosClient.post(url, { email: data.email, code: data.code });
  },
};

export default authAPI;
