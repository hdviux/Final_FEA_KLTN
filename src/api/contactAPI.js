import axiosClient from "../config/axiosClient";

const contactAPI = {
  addnewcontact(data) {
    const url = "/contact/addnewcontact";
    return axiosClient.post(url, {
      name: data.name,
      email: data.email,
      content: data.content,
    });
  },
  getallcontact() {
    const url = "/contact/getallcontact";
    return axiosClient.get(url);
  },
  adminsendmail(data) {
    const url = "/contact/adminsendmail";
    return axiosClient.post(url, {
      email: data.email,
      content: data.content,
    });
  },
};

export default contactAPI;
