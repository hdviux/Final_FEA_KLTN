import React, { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import orderAPI from "../../../../api/orderAPI";
import "bootstrap/dist/css/bootstrap.min.css";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
const DashLeft = (props) => {
  const [totalMoney, setTotalMoney] = useState(0);
  const [countPurchase, setCountPurchase] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalProductPurchased, setTotalProductPurchased] = useState(0);
  const loggedInUser = useSelector((state) => state.user.current);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const action = async () => {
      try {
        const getAllOrder = await orderAPI.getallorder();
        let totalMoney = 0;
        let countPurchase = 0;
        let totalProductPurchased = [];
        for (let index = 0; index < getAllOrder.result.length; index++) {
          if (getAllOrder.result[index].orderStatus === "received") {
            totalMoney += getAllOrder.result[index].totalMoney;
            countPurchase += 1;
            const findDetail = await orderAPI.getallorderdetailbyorderid(
              {
                orderID: getAllOrder.result[index]._id,
              },
              loggedInUser.accessToken
            );
            for (let i = 0; i < findDetail.result.length; i++) {
              totalProductPurchased.push(findDetail.result[i]);
            }
          }
        }
        for (let index = 0; index < totalProductPurchased.length; index++) {
          setTotalProductPurchased(
            (pre) => pre + totalProductPurchased[index].quantity
          );
        }
        setTotalMoney(totalMoney);
        setTotalOrder(getAllOrder.result.length);
        setCountPurchase(countPurchase);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    action();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100px",
        flexWrap: "wrap",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          width: "45%",
          marginBottom: "25px",
          marginRight: "25px",
          background: `linear-gradient(${"#24d252"}, ${"#36bf33"})`,
          color: "white",
          alignItems: "center",
        }}
      >
        <MonetizationOnIcon sx={{ fontSize: "70px" }} />
        <div
          style={{
            display: "flex",
            flex: 1,
            height: "100%",
            flexDirection: "column",
            padding: "10px",
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          <div
            style={{
              height: "50%",
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
            }}
          >
            Tổng tiền
          </div>
          {loading === true ? (
            <div
              style={{
                height: "50%",
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
              <Spinner animation="border" />
            </div>
          ) : (
            <div
              style={{
                height: "50%",
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
              ₫{totalMoney}
            </div>
          )}
        </div>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          width: "45%",
          marginBottom: "25px",
          marginRight: "25px",
          background: `linear-gradient(${"#24d252"}, ${"#36bf33"})`,
          color: "white",
          alignItems: "center",
        }}
      >
        <AssignmentIcon sx={{ fontSize: "70px" }} />
        <div
          style={{
            display: "flex",
            flex: 1,
            height: "100%",
            flexDirection: "column",
            padding: "10px",
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          <div
            style={{
              height: "50%",
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
            }}
          >
            Tổng số hóa đơn
          </div>
          {loading === true ? (
            <div
              style={{
                height: "50%",
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
              <Spinner animation="border" />
            </div>
          ) : (
            <div
              style={{
                height: "50%",
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
              {totalOrder}
            </div>
          )}
        </div>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          width: "45%",
          marginBottom: "25px",
          marginRight: "25px",
          background: `linear-gradient(${"#24d252"}, ${"#36bf33"})`,
          color: "white",
          alignItems: "center",
        }}
      >
        <ArrowUpwardIcon sx={{ fontSize: "70px" }} />
        <div
          style={{
            display: "flex",
            flex: 1,
            height: "100%",
            flexDirection: "column",
            padding: "10px",
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          <div
            style={{
              height: "50%",
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
            }}
          >
            Số lượt bán
          </div>
          {loading === true ? (
            <div
              style={{
                height: "50%",
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
              <Spinner animation="border" />
            </div>
          ) : (
            <div
              style={{
                height: "50%",
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
              {countPurchase}
            </div>
          )}
        </div>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          width: "45%",
          marginBottom: "25px",
          marginRight: "25px",
          background: `linear-gradient(${"#24d252"}, ${"#36bf33"})`,
          color: "white",
          alignItems: "center",
        }}
      >
        <ShoppingCartIcon sx={{ fontSize: "70px" }} />
        <div
          style={{
            display: "flex",
            flex: 1,
            height: "100%",
            flexDirection: "column",
            padding: "10px",
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          <div
            style={{
              height: "50%",
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
            }}
          >
            Số sản phẩm đã bán
          </div>
          {loading === true ? (
            <div
              style={{
                height: "50%",
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
              <Spinner animation="border" />
            </div>
          ) : (
            <div
              style={{
                height: "50%",
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
              {totalProductPurchased}
            </div>
          )}
        </div>
      </Paper>
    </Box>
  );
};
export default DashLeft;
