import { UploadOutlined } from "@ant-design/icons";
import { Link } from "@mui/material";
import { Form, Input, Space, Tag, Button, Popconfirm } from "antd";
import React, { useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import Select from "react-select";
import countryList from "react-select-country-list";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import brandAPI from "../../../../api/brandAPI";
import { storage } from "../../../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const ItemButton = (props) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const [name, setName] = useState(props.data.brandName);
  const [nation, setNation] = useState({
    value: true,
    label: props.data.nation,
  });
  const [image, setImage] = useState([]);
  const [seeImage, setSeeImage] = useState(props.data.image);
  const options = useMemo(() => countryList().getData(), []);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const handleUploadImage = async () => {
    const fileSelect = document.getElementById("selectfile").click();
    console.log(fileSelect);
  };
  const changeHandler = (value) => {
    setNation(value);
  };
  const fileSelected2 = (e) => {
    setImage(e.target.files[0]);
    setSeeImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleUpdateBrand = async (e) => {
    e.preventDefault();
    try {
      if (name === "" || nation.label === "") {
        Swal.fire({
          title: "Chưa điền đầy đủ thông tin!",
          icon: "warning",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      if (name !== "" && nation.label !== "") {
        if (image.length === 0) {
          const addBrand = await brandAPI.updatebrand(
            {
              brandID: props.data.key,
              brandName: name,
              nation: nation.label,
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
              title: "Cập nhật thành công!",
              icon: "success",
              showConfirmButton: false,
              timer: 1000,
            });
            setTimeout(() => {
              window.location.reload(false);
            }, 1300);
          }
        }
        if (image.length !== 0) {
          const imageRef = ref(storage, `brand/${image.name}`);
          uploadBytes(imageRef, image)
            .then(() => {
              getDownloadURL(imageRef)
                .then(async (url) => {
                  const addBrand = await brandAPI.updatebrand(
                    {
                      brandID: props.data.key,
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
                      title: "Cập nhật thành công!",
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBrand = async (e) => {
    try {
      await brandAPI.deletebrand(
        {
          brandID: props.data.key,
        },
        loggedInUser.accessToken
      );
      Swal.fire({
        title: "Xóa thành công!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
      setTimeout(() => {
        window.location.reload(false);
      }, 1300);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Space size="middle">
      <Modal
        show={showModalUpdate}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Chỉnh sửa thương hiệu sản phẩm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ paddingLeft: "25%", paddingRight: "25%" }}>
            <Form.Item>
              <h5>Tên thương hiệu:</h5>
              <Input
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <h5>Xuất xứ:</h5>
              <Select
                options={options}
                defaultValue={nation}
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
              <div style={{ width: "100%", marginTop: "25px" }}>
                <img style={{ width: "100%" }} src={seeImage} alt="" />
              </div>
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
                  onClick={() => setShowModalUpdate(false)}
                >
                  Hủy
                </Button>
                <Button
                  style={{ width: "100%", marginLeft: "15px" }}
                  type="primary"
                  onClick={handleUpdateBrand}
                >
                  Hoàn tất
                </Button>
              </div>
            </Form.Item>
          </div>
        </Modal.Body>
      </Modal>
      <Link
        onClick={() => {
          setShowModalUpdate(true);
        }}
      >
        <Tag
          color={"blue"}
          style={{
            width: "100px",
            textAlign: "center",
            alignItems: "center",
            fontSize: "16px",
          }}
        >
          Chỉnh sửa
        </Tag>
      </Link>
      <Popconfirm
        placement="topRight"
        title="Bạn có muốn xóa thương hiệu này không?"
        onConfirm={handleDeleteBrand}
        okText="Có"
        cancelText="Không"
      >
        <Link>
          <Tag
            color={"error"}
            style={{
              width: "100px",
              textAlign: "center",
              alignItems: "center",
              fontSize: "16px",
            }}
          >
            Xóa
          </Tag>
        </Link>
      </Popconfirm>
    </Space>
  );
};
export default ItemButton;
