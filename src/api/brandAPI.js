import axiosClient from "../config/axiosClient";

const brandAPI = {
  findbrandbyidproduct(data) {
    const url = "/brand/findbrandbyidproduct";
    return axiosClient.post(url, { brandID: data.brandID });
  },
  getallbrand() {
    const url = "/brand/getallbrand";
    return axiosClient.get(url);
  },
  addbrand(data, accessToken) {
    const url = "/brand/addbrand";
    return axiosClient.post(
      url,
      { brandName: data.brandName, nation: data.nation, image: data.image },
      { header: { Authorization: accessToken } }
    );
  },
  findbrandbynamechar(data, accessToken) {
    const url = "/brand/findbrandbynamechar";
    return axiosClient.post(
      url,
      { brandName: data.brandName },
      { header: { Authorization: accessToken } }
    );
  },
  updatebrand(data, accessToken) {
    const url = "/brand/updatebrand/" + data.brandID;
    return axiosClient.put(url, data, {
      header: { Authorization: accessToken },
    });
  },
  deletebrand(data, accessToken) {
    const url = "/brand/deletebrand/" + data.brandID;
    return axiosClient.delete(url, data, {
      header: { Authorization: accessToken },
    });
  },
};

export default brandAPI;
