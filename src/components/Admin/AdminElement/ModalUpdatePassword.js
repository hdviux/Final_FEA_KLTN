import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, Overlay, Popover } from "react-bootstrap";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import userAPI from "../../../api/userAPI";
import { useSelector } from "react-redux";
const ModalUpdatePassword = (props) => {
  const loggedInUser = useSelector((state) => state.user.current);

  const [oldP, setOldP] = useState("");
  const [newP, setNewP] = useState("");
  const [messErrorEmail, setMessErrorEmail] = useState("");
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);

  const [messErrorCode, setMessErrorCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [targetCode, setTargetCode] = useState(null);

  const reload = () => {
    setOldP("");
    setShowCode(false);
    setShow(false);
  };

  const handleChangePassword = async (event) => {
    try {
      setTargetCode(event.targetCode);
      setShowCode(false);
      setTarget(event.target);
      setShow(false);
      if (oldP.length === 0) {
        setMessErrorEmail("Chưa nhập mật khẩu cũ!");
        setTarget(event.target);
        setShow(true);
      }
      if (oldP.length < 6 && oldP.length !== 0) {
        setMessErrorEmail("Mật khẩu phải lớn hơn 6 kí tự!");
        setTarget(event.target);
        setShow(true);
      }
      if (newP.length === 0) {
        setMessErrorCode("Chưa nhập mật khẩu!");
        setTargetCode(event.target);
        setShowCode(true);
      }
      if (newP.length < 6 && newP.length !== 0) {
        setMessErrorCode("Mật khẩu phải lớn hơn 6 kí tự!");
        setTargetCode(event.target);
        setShowCode(true);
      }
      if (oldP === newP && newP.length !== 0 && oldP.length !== 0) {
        setMessErrorCode("Không được trùng với mật khẩu cũ!");
        setTargetCode(event.target);
        setShowCode(true);
      }
      if (
        oldP !== "" &&
        newP !== "" &&
        newP.length >= 6 &&
        oldP.length >= 6 &&
        oldP !== newP
      ) {
        const change = await userAPI.changepassword(
          {
            oldPassword: oldP,
            newPassword: newP,
          },
          loggedInUser.accessToken
        );
        console.log(change.status);
        if (change.status === 200) {
          localStorage.setItem("user", JSON.stringify(change.result));
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
        if (change.status === 400) {
          setMessErrorEmail("Mật khẩu cũ chưa chính xác!");
          setTarget(event.target);
          setShow(true);
          setTimeout(() => {
            setShow(false);
            setShowCode(false);
          }, 6000);
        }
      }
    } catch (error) {
      console.log(error);
    }
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
          Cập nhật mật khẩu
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="d-flex flex-column align-items-center"
          style={{ height: "300px" }}
        >
          <div className="w-50 mb-4 mt-4">
            <Form.Control
              type="password"
              className="flex-1"
              placeholder="Nhập mật khẩu cũ"
              value={oldP}
              id="mkc"
              onChange={(e) => setOldP(e.target.value)}
              ref={target}
            />
            <Overlay
              show={show}
              target={target}
              placement="left"
              containerPadding={20}
            >
              <Popover id="popover-contained">
                <Popover.Body>
                  <span style={{ color: "red" }}>{messErrorEmail}</span>
                </Popover.Body>
              </Popover>
            </Overlay>
          </div>
          <div className="w-50">
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={newP}
              id="mkm"
              onChange={(e) => setNewP(e.target.value)}
              ref={targetCode}
            />
            <Overlay
              show={showCode}
              target={targetCode}
              placement="left"
              containerPadding={20}
            >
              <Popover id="popover-contained">
                <Popover.Body>
                  <span style={{ color: "red" }}>{messErrorCode}</span>
                </Popover.Body>
              </Popover>
            </Overlay>
          </div>

          <div className="d-flex flex-row align-items-center mt-4">
            <Button
              variant="secondary"
              className="me-2"
              style={{ width: "120px" }}
              onClick={props.onHide}
            >
              Hủy
            </Button>
            <Button
              variant="primary"
              className="ms-2"
              style={{ width: "120px" }}
              onClick={handleChangePassword}
            >
              Hoàn tất
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalUpdatePassword;
