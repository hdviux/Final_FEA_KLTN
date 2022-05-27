import React, { useState, useMemo, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import { Form, Input, Upload, Button } from "antd";
import Select from "react-select";
import countryList from "react-select-country-list";
import { UploadOutlined } from "@ant-design/icons";
import { async } from "@firebase/util";
import brandAPI from "../../../../api/brandAPI";
import { useSelector } from "react-redux";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { storage } from "../../../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const AddBrand = (props) => {
  const options = useMemo(() => countryList().getData(), []);
  const loggedInUser = useSelector((state) => state.user.current);
  const [name, setName] = useState("");
  const [nation, setNation] = useState("");
  const [image, setImage] = useState([]);
  const [seeImage, setSeeImage] = useState();
  const [show, setShow] = useState(false);
  const changeHandler = (value) => {
    setNation(value);
  };

  const handleAddBrand = async (e) => {
    e.preventDefault();
    try {
      if (name === "" || nation.label === "" || image.length === 0) {
        Swal.fire({
          title: "Chưa điền đầy đủ thông tin!",
          icon: "warning",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      if (name !== "" && nation.label !== "" && image.length !== 0) {
        const imageRef = ref(storage, `brand/${image.name}`);
        uploadBytes(imageRef, image)
          .then(() => {
            getDownloadURL(imageRef)
              .then(async (url) => {
                const addBrand = await brandAPI.addbrand(
                  {
                    brandName: name,
                    nation: nation.label,
                    image: url,
                  },
                  loggedInUser.accessToken
                );
                if (addBrand.result === null) {
                  setName("");
                  Swal.fire({
                    title: "Tên thương hiệu bị trùng!",
                    icon: "warning",
                    showConfirmButton: false,
                    timer: 1000,
                  });
                } else {
                  setName("");
                  setNation("");
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
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUploadImage = async () => {
    document.getElementById("selectfile").click();
  };
  const fileSelected2 = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    setSeeImage(URL.createObjectURL(e.target.files[0]));
    setShow(true);
  };
  const reload = () => {
    setImage([]);
    setSeeImage();
    setShow(false);
    setName("");
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      onExit={reload}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Thêm thương hiệu sản phẩm
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ paddingLeft: "25%", paddingRight: "25%" }}>
          <Form.Item>
            <h5>Tên thương hiệu:</h5>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <h5>Xuất xứ:</h5>
            <Select
              options={options}
              value={nation}
              onChange={changeHandler}
              placeholder="Chọn tên nước"
            />
          </Form.Item>
          <Form.Item>
            <h5>Ảnh thương hiệu:</h5>
            <Button onClick={handleUploadImage} icon={<UploadOutlined />}>
              Thêm ảnh
            </Button>
            <input
              type="file"
              id="selectfile"
              onChange={fileSelected2}
              accept="image/*"
            />
            {show && (
              <div style={{ width: "100%", marginTop: "25px" }}>
                <img style={{ width: "100%" }} src={seeImage} alt="" />
              </div>
            )}
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
                onClick={handleAddBrand}
              >
                Thêm thương hiệu
              </Button>
            </div>
          </Form.Item>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddBrand;
