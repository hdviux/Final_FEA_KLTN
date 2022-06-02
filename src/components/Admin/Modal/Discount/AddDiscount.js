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
import { InputNumber } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form2 from "react-bootstrap/Form";
import discountAPI from "../../../../api/discountAPI";
import moment from "moment";
const AddDiscount = (props) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const [startDate, setStartDate] = useState(new Date());
  const [percent, setPercent] = useState(0);

  const handleAddDiscount = async () => {
    try {
      await discountAPI.creatediscount(
        {
          productID: props.data.key,
          endDate: moment(startDate).format("YYYY-MM-DD"),
          percent: percent,
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
    } catch (error) {
      console.log(error);
    }
  };

  const reload = () => {
    setPercent(0);
    setStartDate(new Date());
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
          Thêm khuyến mãi
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ paddingLeft: "25%", paddingRight: "25%" }}>
          <Form.Item>
            <h5>Ngày kết thúc:</h5>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              customInput={<Form2.Control type="text" />}
            />
          </Form.Item>
          <Form.Item>
            <h5>Phần trăm khuyến mãi:</h5>
            <InputNumber
              min={0}
              max={100}
              value={percent}
              onChange={(e) => setPercent(e)}
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
                onClick={handleAddDiscount}
              >
                Thêm khuyến mãi
              </Button>
            </div>
          </Form.Item>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddDiscount;
