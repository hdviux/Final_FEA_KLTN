import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import { Button, Input, Form } from "antd";
import categoryAPI from "../../../../api/categoryAPI";
import { useSelector } from "react-redux";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { IconButton } from "@mui/material";
import { MessageFilled, SettingFilled } from "@ant-design/icons";
import contactAPI from "../../../../api/contactAPI";
const ItemButtonContact = (props) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const [content, setContent] = useState("");
  const [show, setShow] = useState(false);
  const reload = () => {
    setContent("");
  };
  const sendMail = async () => {
    try {
      if (content === "") {
        Swal.fire({
          title: "Chưa nhập đầy đủ thông tin!",
          icon: "warning",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      if (content !== "") {
        await contactAPI.adminsendmail({
          email: props.data.email,
          content: content,
        });
        Swal.fire({
          title: "Gửi phản hồi thành công!",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        window.location.reload(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <IconButton onClick={() => setShow(true)}>
        <MessageFilled style={{ fontSize: "25px", color: "#A9A9A9" }} />
      </IconButton>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onExit={reload}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Gửi phản hồi
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ paddingLeft: "25%", paddingRight: "25%" }}>
            <Form.Item>
              <h5>Người nhận:</h5>
              <Input defaultValue={props.data.email} disabled />
            </Form.Item>
            <Form.Item>
              <h5>Nội dung:</h5>
              <Input.TextArea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                  display: "flex",
                  flex: 1,
                  height: "150px",
                  resize: "none",
                }}
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
                  onClick={() => setShow(false)}
                >
                  Hủy
                </Button>
                <Button
                  style={{ width: "100%", marginLeft: "15px" }}
                  type="primary"
                  onClick={sendMail}
                >
                  Gửi phản hồi
                </Button>
              </div>
            </Form.Item>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ItemButtonContact;
