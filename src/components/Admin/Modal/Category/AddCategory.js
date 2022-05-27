import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import { Button, Input, Form } from "antd";
import categoryAPI from "../../../../api/categoryAPI";
import { useSelector } from "react-redux";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const AddCategory = (props) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const [name, setName] = useState("");
  const handleAddCategory = async () => {
    try {
      if (name === "") {
        Swal.fire({
          title: "Chưa nhập đầy đủ thông tin!",
          icon: "warning",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        const addCategory = await categoryAPI.addcategory(
          {
            categoryName: name,
          },
          loggedInUser.accessToken
        );
        if (addCategory.result === null) {
          setName("");
          Swal.fire({
            title: "Tên loại sản phẩm bị trùng!",
            icon: "warning",
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          setName("");
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
  const reload = () => {
    setName("");
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
          Thêm loại sản phẩm
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ paddingLeft: "25%", paddingRight: "25%" }}>
          <Form.Item>
            <h5>Tên loại sản phẩm:</h5>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
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
                onClick={handleAddCategory}
              >
                Thêm loại sản phẩm
              </Button>
            </div>
          </Form.Item>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddCategory;
