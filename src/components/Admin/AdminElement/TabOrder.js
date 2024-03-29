import React, { useEffect, useState } from "react";
import LeftNav from "./LeftNav";
import TopNav from "./TopNav";
import { Dropdown, Input, Menu, Spin } from "antd";
import { Table, Space, Button } from "antd";
import { LoadingOutlined, SyncOutlined } from "@ant-design/icons";
import orderAPI from "../../../api/orderAPI";
import OrderDetail from "../Modal/Order/OrderDetail";
import moment from "moment";
import { DatePicker } from "antd";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Backdrop, IconButton } from "@mui/material";
import ItemButtonOrder from "../Modal/Order/ItemButtonOrder";
import { Empty } from "antd";
import { useSelector } from "react-redux";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import CancelIcon from "@mui/icons-material/Cancel";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import PendingIcon from "@mui/icons-material/Pending";
const TabOrder = (props) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const { RangePicker } = DatePicker;
  const [allOrder, setAllOrder] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const handleChangeDebut = (range) => {
    const valueOfInput1 = range[0].format();
    const valueOfInput2 = range[1].format();
    setStartDate(new Date(valueOfInput1));
    setEndDate(new Date(valueOfInput2));
  };
  const [loading, setLoading] = useState(true);
  const onSearch = async () => {
    setLoading(true);
    if (startDate === "" || endDate === "") {
      Swal.fire({
        title: "Chưa chọn ngày!",
        icon: "warning",
        showConfirmButton: false,
        timer: 1000,
      });
    }

    if (startDate !== "" || endDate !== "") {
      const arr = [];
      for (let index = 0; index < allOrder.length; index++) {
        const timeSend = new Date(allOrder[index].dateCreated);
        if (
          timeSend.getTime() <= endDate.getTime() &&
          timeSend.getTime() >= startDate.getTime()
        ) {
          arr.push({
            key: allOrder[index].key,
            userName: allOrder[index].userName,
            userPhone: allOrder[index].userPhone,
            userAddress: allOrder[index].userAddress,
            dateCreated: allOrder[index].dateCreated,
            totalMoney: allOrder[index].totalMoney,
            orderStatus: allOrder[index].orderStatus,
            userID: allOrder[index].userID,
            description: <OrderDetail data={allOrder[index]} />,
          });
        }
      }
      setAllOrder(arr);
    }
    setLoading(false);
  };
  useEffect(() => {
    const action = async () => {
      try {
        const getAllOrder = await orderAPI.getorderbystatus({
          orderStatus: "pending",
        });
        const arr = [];
        for (let index = 0; index < getAllOrder.result.length; index++) {
          arr.push({
            key: getAllOrder.result[index]._id,
            userName: getAllOrder.result[index].userName,
            userPhone: getAllOrder.result[index].userPhone,
            userAddress: getAllOrder.result[index].userAddress,
            dateCreated: getAllOrder.result[index].dateCreated,
            totalMoney: getAllOrder.result[index].totalMoney,
            orderStatus: getAllOrder.result[index].orderStatus,
            userID: getAllOrder.result[index].userID,
            description: <OrderDetail data={getAllOrder.result[index]} />,
          });
        }
        setAllOrder(arr);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    action();
  }, []);

  const action = async (data) => {
    try {
      const getAllOrder = await orderAPI.getorderbystatus({
        orderStatus: data,
      });
      const arr = [];
      for (let index = 0; index < getAllOrder.result.length; index++) {
        arr.push({
          key: getAllOrder.result[index]._id,
          userName: getAllOrder.result[index].userName,
          userPhone: getAllOrder.result[index].userPhone,
          userAddress: getAllOrder.result[index].userAddress,
          dateCreated: getAllOrder.result[index].dateCreated,
          totalMoney: getAllOrder.result[index].totalMoney,
          orderStatus: getAllOrder.result[index].orderStatus,
          userID: getAllOrder.result[index].userID,
          description: <OrderDetail data={getAllOrder.result[index]} />,
        });
      }
      setAllOrder(arr);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    Table.EXPAND_COLUMN,
    {
      title: "Tên khách hàng",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "userPhone",
      key: "userPhone",
    },
    {
      title: "Trạng thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (text, rowKey) =>
        text === "pending" ? (
          <Dropdown overlay={<ItemButtonOrder data={rowKey} />}>
            <IconButton>
              <div
                style={{
                  fontSize: "15px",
                  color: "#FFD700",
                }}
              >
                <div>Chờ xử lý</div>
              </div>
            </IconButton>
          </Dropdown>
        ) : text === "shipping" ? (
          <Dropdown overlay={<ItemButtonOrder data={rowKey} />}>
            <IconButton>
              <div
                style={{
                  fontSize: "15px",
                  color: "#4169E1",
                }}
              >
                <div>Đang giao</div>
              </div>
            </IconButton>
          </Dropdown>
        ) : (
          <IconButton>
            <div
              style={{
                fontSize: "15px",
                color:
                  text === "received"
                    ? "#008000"
                    : text === "pending"
                    ? "#FFD700"
                    : text === "refund"
                    ? "#FF4500"
                    : "",
              }}
            >
              {text === "received" ? (
                <div>Đã nhận</div>
              ) : text === "pending" ? (
                <div>Chờ xử lý</div>
              ) : text === "refund" ? (
                <div>Đã hoàn trả</div>
              ) : null}
            </div>
          </IconButton>
        ),
    },
    {
      title: "Ngày gửi",
      dataIndex: "dateCreated",
      key: "dateCreated",
      render: (text) => <div> {moment(text).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalMoney",
      key: "totalMoney",
    },
  ];
  const resetData = async () => {
    try {
      setLoading(true);
      setStartDate("");
      setEndDate("");
      action("pending");
    } catch (error) {
      console.log(error);
    }
  };
  const menu = (
    <Menu
      items={[
        {
          label: (
            <div
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => {
                action("pending");
              }}
            >
              <PendingIcon style={{ fontSize: 20, marginRight: 15 }} />
              <h6 className="mt-2">Đang chờ xử lý</h6>
            </div>
          ),
        },
        {
          type: "divider",
        },
        {
          label: (
            <div
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => {
                action("shipping");
              }}
            >
              <AirportShuttleIcon style={{ fontSize: 20, marginRight: 15 }} />
              <h6 className="mt-2">Đang giao</h6>
            </div>
          ),
        },
        {
          type: "divider",
        },
        {
          label: (
            <div
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => {
                action("received");
              }}
            >
              <CallReceivedIcon style={{ fontSize: 20, marginRight: 15 }} />
              <h6 className="mt-1">Đã nhận</h6>
            </div>
          ),
        },
        {
          type: "divider",
        },
        {
          label: (
            <div
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => {
                action("refund");
              }}
            >
              <CancelIcon style={{ fontSize: 20, marginRight: 15 }} />
              <h6 className="mt-1">Đã hủy</h6>
            </div>
          ),
        },
      ]}
    />
  );
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        padding: "20px",
        height: "720px",
      }}
    >
      <LeftNav />
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <TopNav />
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            paddingLeft: "50px",
            paddingTop: "50px",
            paddingRight: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              height: "150px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Dropdown overlay={menu} placement="bottom" arrow>
                <Button type="primary" size="large">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      flexDirection: "row",
                    }}
                  >
                    Trạng thái
                  </div>
                </Button>
              </Dropdown>
            </div>
            <RangePicker
              onChange={handleChangeDebut}
              placeholder={["Từ ngày", "Đến ngày"]}
              format="DD-MM-YYYY"
              clearIcon={<SyncOutlined onMouseDown={resetData} />}
            />
            <Button
              type="primary"
              style={{ marginLeft: "20px" }}
              onClick={onSearch}
            >
              Tìm kiếm
            </Button>
          </div>
          {loading === true ? (
            <div
              style={{
                display: "flex",
                flex: 1,
                height: 200,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 55,
                    }}
                    spin
                  />
                }
              />
            </div>
          ) : (
            <Table
              columns={columns}
              pagination={{ pageSize: 5 }}
              expandable={{
                expandedRowRender: (record) => (
                  <p style={{ margin: 0 }}>{record.description}</p>
                ),
              }}
              dataSource={allOrder}
              locale={{
                emptyText: <Empty description={false} />,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TabOrder;
