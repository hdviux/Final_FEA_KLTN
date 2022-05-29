import React, { useState } from "react";
import { Menu, Form } from "antd";
import { useSelector } from "react-redux";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import CancelIcon from "@mui/icons-material/Cancel";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import orderAPI from "../../../../api/orderAPI";
import { Modal } from "react-bootstrap";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../Styles/Modal.scss";
const ItemButtonOrder = (props) => {
  const [show, setShow] = useState(false);
  const loggedInUser = useSelector((state) => state.user.current);
  const handleUpdateShipping = async () => {
    try {
      await orderAPI.updateorderstatus(
        {
          orderID: props.data.key,
          orderStatus: "shipping",
        },
        loggedInUser.accessToken
      );
      setShow(true);
      await orderAPI.sendemailorder(
        {
          orderID: props.data.key,
          pay: "Thanh toán trực tiếp",
        },
        loggedInUser.accessToken
      );
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateRefund = async () => {
    try {
      await orderAPI.updateorderstatus(
        {
          orderID: props.data.key,
          orderStatus: "refund",
        },
        loggedInUser.accessToken
      );
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateReceived = async () => {
    try {
      await orderAPI.updateorderstatus(
        {
          orderID: props.data.key,
          orderStatus: "received",
        },
        loggedInUser.accessToken
      );
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Menu
        style={{
          border: "1px solid rgba(218, 218, 218, 0.5)",
          marginTop: "10px",
        }}
        items={
          props.data.orderStatus === "shipping"
            ? [
                {
                  label: (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "10px",
                      }}
                      onClick={handleUpdateReceived}
                    >
                      <CallReceivedIcon
                        sx={{
                          fontSize: "20px",
                          marginRight: "15px",
                          marginTop: "2px",
                        }}
                      />
                      <h6 className="mt-2">Đã giao hàng</h6>
                    </div>
                  ),
                },
              ]
            : [
                {
                  label: (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "10px",
                      }}
                      onClick={handleUpdateShipping}
                    >
                      <AirportShuttleIcon
                        sx={{
                          fontSize: "20px",
                          marginRight: "15px",
                          marginTop: "2px",
                        }}
                      />
                      <h6 className="mt-2">Giao đơn hàng</h6>
                    </div>
                  ),
                },
                {
                  type: "divider",
                },
                {
                  label: (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "10px",
                      }}
                      onClick={handleUpdateRefund}
                    >
                      <CancelIcon
                        sx={{
                          fontSize: "20px",
                          marginRight: "15px",
                          marginTop: "2px",
                        }}
                      />
                      <h6 className="mt-2">Hủy đơn hàng</h6>
                    </div>
                  ),
                },
              ]
        }
      />
      <Modal show={show} centered dialogClassName="my-modal2" backdrop="static">
        <Modal.Body>
          <div
            style={{
              display: "flex",

              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 35,
                  }}
                  spin
                />
              }
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default ItemButtonOrder;
