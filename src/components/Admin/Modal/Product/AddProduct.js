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
import { DeleteFilled, UploadOutlined } from "@ant-design/icons";
import { storage } from "../../../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { IconButton } from "@mui/material";
const AddProduct = (props) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const [name, setName] = useState("");
  const [allBrand, setAllBrand] = useState([]);
  const [imageTest, setImageTest] = useState({ path: [], url: [] });
  const [allCategory, setAllCategory] = useState([]);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [show, setShow] = useState(false);
  const [dis, setDis] = useState(false);
  const [allAge, setAllAge] = useState([]);
  const [age, setAge] = useState("");
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
        setAllAge([
          {
            value: "0-2",
            label: "0-2",
          },
          {
            value: "3-6",
            label: "3-6",
          },
          {
            value: "7-12",
            label: "7-12",
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    action();
  }, []);
  useEffect(() => {
    if (imageTest.url.length === 3) {
      setDis(true);
    }
    if (imageTest.url.length !== 3) {
      setDis(false);
    }
  }, [imageTest]);
  const changeHandlerCategory = (value) => {
    setCategory(value);
  };

  const changeHandlerAge = (value) => {
    setAge(value);
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
  const handleAddProduct = async () => {
    try {
      if (
        name === "" ||
        category === "" ||
        brand === "" ||
        price === 0 ||
        quantity === 0 ||
        description === "" ||
        age === "" ||
        imageTest.url.length !== 3
      ) {
        if (
          name !== "" &&
          category !== "" &&
          brand !== "" &&
          price !== 0 &&
          quantity !== 0 &&
          age !== "" &&
          description !== "" &&
          imageTest.url.length !== 3
        )
          Swal.fire({
            title: "Ảnh sản phẩm phải đủ 3 tấm!",
            icon: "warning",
            showConfirmButton: false,
            timer: 1000,
          });
      }
      if (
        name !== "" &&
        category !== "" &&
        brand !== "" &&
        age !== "" &&
        price !== 0 &&
        quantity !== 0 &&
        description !== "" &&
        imageTest.url.length === 3
      ) {
        const checkName = await productAPI.checkname({ productName: name });
        if (checkName.result === true) {
          Swal.fire({
            title: "Tên sản phẩm bị trùng!",
            icon: "warning",
            showConfirmButton: false,
            timer: 1000,
          });
        }
        if (checkName.result === false) {
          await productAPI.addproduct(
            {
              productName: name,
              image: imageTest.url,
              quantity: quantity,
              price: price,
              description: description,
              color: [],
              categoryID: category.value,
              brandID: brand.value,
              age: age.value,
            },
            loggedInUser.accessToken
          );
          Swal.fire({
            title: "Thêm thành công!",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          });
          setTimeout(() => {
            window.location.reload(false);
          }, 1300);
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
  const reload = () => {
    setName("");
    setShow(false);
    setImageTest({ path: [], url: [] });
  };
  const handleRemoveItem = (name, datau) => {
    setImageTest({
      path: imageTest.path.filter((item) => item !== name),
      url: imageTest.url.filter((item) => item !== datau),
    });
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
          Thêm sản phẩm
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ paddingLeft: "25%", paddingRight: "25%" }}>
          <Form.Item>
            <h5>Tên sản phẩm:</h5>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <h5>Độ tuổi:</h5>
            <Select
              options={allAge}
              value={age}
              onChange={changeHandlerAge}
              placeholder="Chọn độ tuổi"
            />
          </Form.Item>
          <Form.Item>
            <h5>Loại sản phẩm:</h5>
            <Select
              options={allCategory}
              value={category}
              onChange={changeHandlerCategory}
              placeholder="Chọn loại sản phẩm"
            />
          </Form.Item>
          <Form.Item>
            <h5>Thương hiệu sản phẩm:</h5>
            <Select
              options={allBrand}
              value={brand}
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
                  onChange={onChangePrice}
                />
              </div>
              <div style={{ width: "150px" }}>
                <h5>Số lượng:</h5>
                <InputNumber
                  min={1}
                  style={{ width: "150px" }}
                  onChange={onChangeQuantity}
                />
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            <h5>Ảnh sản phẩm:</h5>
            <Button
              disabled={dis}
              icon={<UploadOutlined />}
              onClick={handleAddImage}
            >
              Upload
            </Button>
            <input
              type="file"
              id="selectfile"
              onChange={fileSelected2}
              accept="image/*"
            />
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
                          handleRemoveItem(data, imageTest.url[index])
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
              value={description}
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
                onClick={handleAddProduct}
              >
                Thêm sản phẩm
              </Button>
            </div>
          </Form.Item>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddProduct;
