import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Modal,
  Button,
  Form,
  Overlay,
  Popover,
  Spinner,
} from "react-bootstrap";
import validator from "validator";
import authAPI from "../../../api/authAPI";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import userAPI from "../../../api/userAPI";
import { useSelector } from "react-redux";
const ModalUpdatePhone = (props) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const [newPhone, setNewPhone] = useState("");
  const [code, setCode] = useState("");
  const [time, setTime] = useState(0);
  const [messErrorPhone, setMessErrorPhone] = useState("");
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);

  const [messErrorCode, setMessErrorCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [targetCode, setTargetCode] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    localStorage.setItem("newphonemail", JSON.stringify(newPhone));
  }, [newPhone]);

  const reload = () => {
    setNewPhone("");
    setShowCode(false);
    setShow(false);
  };
  const getCode = async (event) => {
    setLoading(true);
    try {
      if (newPhone === "") {
        setLoading(false);
        setMessErrorPhone("Chưa nhập số điện thoại");
        setTarget(event.target);
        setShow(true);
      }
      if (newPhone !== "") {
        if (validator.isMobilePhone(newPhone) === false) {
          setLoading(false);
          setMessErrorPhone("Số điện thoại không hợp lệ");
          setTarget(event.target);
          setShow(true);
        }
        if (validator.isMobilePhone(newPhone) === true) {
          const result = await authAPI.checkphone({
            phone: newPhone,
          });
          if (result === 200) {
            setLoading(false);
            setMessErrorPhone("Số điện thoại đã tồn tại!");
            setTarget(event.target);
            setShow(true);
          }
          if (result === 403) {
            const resultsendotp = await authAPI.sendotpphone({
              phone: newPhone,
            });
            console.log(resultsendotp);
            if (resultsendotp.status === 200) {
              setMessErrorPhone("");
              setTarget(event.target);
              setShow(false);
              Swal.fire({
                title: "Gửi mã thành công!",
                icon: "success",
                showConfirmButton: false,
                timer: 1000,
              });
              setLoading(false);
              setTime(15);
            }
            if (resultsendotp.status === 400) {
              setLoading(false);
              setMessErrorPhone("Số điện thoại không hợp lệ!");
              setTarget(event.target);
              setShow(true);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [time]);

  const handleVerify = async (event) => {
    try {
      if (code === "") {
        setMessErrorCode("Chưa nhập mã xác nhận!");
        setTargetCode(event.target);
        setShowCode(true);
      }
      if (code !== "") {
        const result = await authAPI.verifyotpphone({
          phone: newPhone,
          code: code,
        });
        if (result.status === 200) {
          const updateUser = await userAPI.updateuser(
            {
              phone: newPhone,
            },
            loggedInUser.accessToken
          );
          if (updateUser.success === true) {
            setMessErrorCode("");
            setTargetCode(event.target);
            setShowCode(false);
            localStorage.setItem("user", JSON.stringify(updateUser.result));
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
        if (result.status === 400) {
          setMessErrorCode("Mã xác nhận chưa chính xác!");
          setTargetCode(event.target);
          setShowCode(true);
        }
        if (result.status === 401) {
          setMessErrorCode("Mã xác nhận chưa được lấy!");
          setTargetCode(event.target);
          setShowCode(true);
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
          Cập nhật số điện thoại
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="d-flex flex-column align-items-center"
          style={{ height: "300px" }}
        >
          <div
            className="w-50 mb-4 mt-4 d-flex"
            style={{ flexDirection: "row", justifyContent: "flex-start" }}
          >
            <Form.Control
              type="text"
              className="flex-1"
              placeholder="Nhập số điện thoại mới"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
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
                  <span style={{ color: "red" }}>{messErrorPhone}</span>
                </Popover.Body>
              </Popover>
            </Overlay>
            <Button
              variant="outline-secondary"
              disabled={time !== 0 ? true : false}
              style={{ width: "30%" }}
              onClick={getCode}
            >
              {time !== 0 ? (
                <div>{time}s</div>
              ) : loading === true ? (
                <div>
                  <Spinner animation="border" size="sm" />
                </div>
              ) : (
                <div>Lấy mã</div>
              )}
            </Button>
          </div>
          <div className="w-50">
            <Form.Control
              type="text"
              placeholder="Nhập mã xác nhận"
              value={code}
              onChange={(e) => setCode(e.target.value)}
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
              onClick={handleVerify}
            >
              Hoàn tất
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalUpdatePhone;
