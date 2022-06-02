import axiosClient from "../config/axiosClient";

const productAPI = {
  getallproduct() {
    const url = "/product/getallproduct";
    return axiosClient.get(url);
  },
  findproductbyid(data) {
    const url = "/product/findproductbyid";
    return axiosClient.post(url, { productID: data.productID });
  },
  findproductbyname(data) {
    const url = "/product/findproductbyname";
    return axiosClient.post(url, { productName: data.productName });
  },
  findproductbycategoryid(data) {
    const url = "/product/findproductbycategoryid";
    return axiosClient.post(url, { categoryID: data.categoryID });
  },
  advancesearchproduct(data) {
    const url = "/product/advancesearchproduct";
    return axiosClient.post(url, {
      productName: data.productName,
      categoryID: data.categoryID,
      brandID: data.brandID,
    });
  },
  checkname(data) {
    const url = "/product/checkname";
    return axiosClient.post(url, { productName: data.productName });
  },
  addproduct(data, accessToken) {
    const url = "/product/addproduct";
    console.log(data);
    return axiosClient.post(
      url,
      {
        productName: data.productName,
        image: data.image,
        quantity: data.quantity,
        price: data.price,
        description: data.description,
        color: [],
        categoryID: data.categoryID,
        brandID: data.brandID,
        age: data.age,
      },
      {
        header: { Authorization: accessToken },
      }
    );
  },
  deleteproduct(data, accessToken) {
    const url = "/product/deleteproduct/" + data.productID;
    return axiosClient.delete(url, {
      header: { Authorization: accessToken },
    });
  },
  updateproduct(data, accessToken) {
    const url = "/product/updateproduct/" + data.productID;
    return axiosClient.put(url, data, {
      header: { Authorization: accessToken },
    });
  },
  findproductbynameandcategoryid(data) {
    const url = "/product/findproductbynameandcategoryid";
    return axiosClient.post(url, {
      productName: data.productName,
      categoryID: data.categoryID,
    });
  },
};

export default productAPI;
