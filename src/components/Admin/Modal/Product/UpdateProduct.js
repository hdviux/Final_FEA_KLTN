import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import { Button, Input, Form, InputNumber } from "antd";
import categoryAPI from "../../../../api/categoryAPI";
import { useSelector } from "react-redux";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Select from "react-select";
import brandAPI from "../../../../api/brandAPI";
import TextArea from "antd/lib/input/TextArea";
import productAPI from "../../../../api/productAPI";
import {
  DeleteFilled,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { storage } from "../../../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { async } from "@firebase/util";
const UpdateProduct = (props) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const [name, setName] = useState(props.dataProduct.productName);
  const [allBrand, setAllBrand] = useState([]);
  const [image, setImage] = useState(props.dataProduct.image);
  const [allCategory, setAllCategory] = useState([]);
  const [brand, setBrand] = useState({
    value: props.dataBrand._id,
    label: props.dataBrand.brandName,
  });
  const [category, setCategory] = useState({
    value: props.dataCategory._id,
    label: props.dataCategory.categoryName,
  });
  const [description, setDescription] = useState(props.dataProduct.description);
  const [quantity, setQuantity] = useState(Number(props.dataProduct.quantity));
  const [price, setPrice] = useState(Number(props.dataProduct.price));

  const [imageTest, setImageTest] = useState({ path: [], url: [] });
  const [show, setShow] = useState(false);
  useEffect(() => {
    const action = async () => {
      try {
        const arrBrand = [];
        const getAllBrand = await brandAPI.getallbrand();
        for (let index = 0; index < getAllBrand.result.length; index++) {
          arrBrand.push({
            value: getAllBrand.result[index]._id,
            label: getAllBrand.result[index].brandName,
          });
        }
        setAllBrand(arrBrand);
        const arrCategory = [];
        const getAllCategory = await categoryAPI.getallcategory();
        for (let index = 0; index < getAllCategory.result.length; index++) {
          arrCategory.push({
            value: getAllCategory.result[index]._id,
            label: getAllCategory.result[index].categoryName,
          });
        }
        setAllCategory(arrCategory);
      } catch (error) {
        console.log(error);
      }
    };
    action();
  }, []);
  const changeHandlerCategory = (value) => {
    setCategory(value);
  };

  const changeHandlerBrand = (value) => {
    setBrand(value);
  };
  const onChangePrice = (value) => {
    setPrice(value);
  };
  const onChangeQuantity = (value) => {
    setQuantity(value);
  };
  const updateP = async (params) => {
    await productAPI.updateproduct(
      {
        productID: props.dataProduct._id,
        productName: name,
        image: params,
        quantity: quantity,
        price: price,
        description: description,
        color: [],
        categoryID: category.value,
        brandID: brand.value,
      },
      loggedInUser.accessToken
    );
    Swal.fire({
      title: "Cập nhật thành công!",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
    setTimeout(() => {
      window.location.reload(false);
    }, 1300);
  };
  const handleUpdateProduct = async () => {
    try {
      if (
        name === "" ||
        category === "" ||
        brand === "" ||
        price === 0 ||
        quantity === 0 ||
        description === ""
      ) {
        Swal.fire({
          title: "Chưa nhập đầy đủ thông tin!",
          icon: "warning",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      if (image.length === 0 && imageTest.url.length === 0) {
        Swal.fire({
          title: "Chưa chọn chọn ảnh!",
          icon: "warning",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      if (image.length !== 0) {
        if (imageTest.url.length === 0) {
          updateP(image);
        }
        if (imageTest.url.length !== 0) {
          let arr = image;
          for (let index = 0; index < imageTest.url.length; index++) {
            arr.push(imageTest.url[index]);
          }
          updateP(arr);
        }
      }
      if (image.length === 0) {
        if (imageTest.url.length !== 0) {
          let arr = [];
          for (let index = 0; index < imageTest.url.length; index++) {
            arr.push(imageTest.url[index]);
          }
          updateP(arr);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddImage = (value) => {
    document.getElementById("selectfile").click();
  };
  const fileSelected2 = (e) => {
    const imageRef = ref(storage, `product/${e.target.files[0].name}`);
    uploadBytes(imageRef, e.target.files[0])
      .then(() => {
        getDownloadURL(imageRef)
          .then(async (url) => {
            const imakoso = { ...imageTest };
            imakoso.path.push(e.target.files[0]);
            imakoso.url.push(url);
            setImageTest(imakoso);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    setShow(true);
  };
  const handleRemoveItem = (name) => {
    setImage(image.filter((item) => item !== name));
  };
  const handleRemoveItem2 = (name, datau) => {
    setImageTest({
      path: imageTest.path.filter((item) => item !== name),
      url: imageTest.url.filter((item) => item !== datau),
    });
  };
  const reload = () => {
    setName(props.dataProduct.productName);
    setImage(props.dataProduct.image);
    setImageTest({ path: [], url: [] });
    setBrand({
      value: props.dataBrand._id,
      label: props.dataBrand.brandName,
    });
    setCategory({
      value: props.dataCategory._id,
      label: props.dataCategory.categoryName,
    });
    setDescription(props.dataProduct.description);
    setQuantity(Number(props.dataProduct.quantity));
    setPrice(Number(props.dataProduct.price));
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExit={reload}
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Cập nhật sản phẩm
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ paddingLeft: "25%", paddingRight: "25%" }}>
          <Form.Item>
            <h5>Tên sản phẩm:</h5>
            <Input
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <h5>Loại sản phẩm:</h5>
            <Select
              options={allCategory}
              defaultValue={{
                value: props.dataCategory._id,
                label: props.dataCategory.categoryName,
              }}
              onChange={changeHandlerCategory}
              placeholder="Chọn loại sản phẩm"
            />
          </Form.Item>
          <Form.Item>
            <h5>Thương hiệu sản phẩm:</h5>
            <Select
              options={allBrand}
              defaultValue={{
                value: props.dataBrand._id,
                label: props.dataBrand.brandName,
              }}
              onChange={changeHandlerBrand}
              placeholder="Chọn thương hiệu sản phẩm"
            />
          </Form.Item>
          <Form.Item>
            <div
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "150px" }}>
                <h5>Giá tiền:</h5>
                <InputNumber
                  min={1}
                  style={{ width: "150px" }}
                  defaultValue={price}
                  onChange={onChangePrice}
                />
              </div>
              <div style={{ width: "150px" }}>
                <h5>Số lượng:</h5>
                <InputNumber
                  min={1}
                  style={{ width: "150px" }}
                  defaultValue={quantity}
                  onChange={onChangeQuantity}
                />
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            <h5>Ảnh sản phẩm:</h5>
            <Button icon={<UploadOutlined />} onClick={handleAddImage}>
              Upload
            </Button>
            <input
              type="file"
              id="selectfile"
              onChange={fileSelected2}
              accept="image/*"
            />
            {image.map((data, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    width: "100%",
                    marginTop: "25px",
                    flexDirection: "row",
                  }}
                >
                  <div style={{ width: "30%" }}>
                    <img style={{ width: "100%" }} src={data} alt="" />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginLeft: "10px",
                    }}
                  >
                    <div></div>

                    <IconButton onClick={() => handleRemoveItem(data)}>
                      <DeleteFilled
                        style={{ fontSize: "20px", color: "#A9A9A9" }}
                      />
                    </IconButton>
                  </div>
                </div>
              );
            })}
            {show &&
              imageTest.path.map((data, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      width: "100%",
                      marginTop: "25px",
                      flexDirection: "row",
                    }}
                  >
                    <div style={{ width: "30%" }}>
                      <img
                        style={{ width: "100%" }}
                        src={URL.createObjectURL(data)}
                        alt=""
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginLeft: "10px",
                      }}
                    >
                      <div></div>

                      <IconButton
                        onClick={() =>
                          handleRemoveItem2(data, imageTest.url[index])
                        }
                      >
                        <DeleteFilled
                          style={{ fontSize: "20px", color: "#A9A9A9" }}
                        />
                      </IconButton>
                    </div>
                  </div>
                );
              })}
          </Form.Item>
          <Form.Item>
            <h5>Mô tả:</h5>
            <TextArea
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
              autoSize={{ minRows: 3, maxRows: 8 }}
            />
          </Form.Item>
          <Form.Item>
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <Button
                style={{ width: "100%", marginRight: "15px" }}
                type="default"
                onClick={props.onHide}
              >
                Hủy
              </Button>
              <Button
                style={{ width: "100%", marginLeft: "15px" }}
                type="primary"
                onClick={handleUpdateProduct}
              >
                Cập nhật
              </Button>
            </div>
          </Form.Item>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateProduct;
